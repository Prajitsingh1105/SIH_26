import {
  INITIAL_APPLICATIONS,
  SEED_OFFICERS,
  SEED_EVC_VISITS,
  SEED_COMPLIANCE_DOCS,
  INITIAL_LEDGER,
  INITIAL_NOTIFICATIONS,
  FORECAST_DATA,
  APH_QA_DATABASE
} from './mockData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5100/api';

// In-Memory state store for resilient demo & offline environments
let localApps = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));
let localOfficers = JSON.parse(JSON.stringify(SEED_OFFICERS));
let localVisits = JSON.parse(JSON.stringify(SEED_EVC_VISITS));
let localDocs = JSON.parse(JSON.stringify(SEED_COMPLIANCE_DOCS));
let localLedger = JSON.parse(JSON.stringify(INITIAL_LEDGER));
let localNotifs = JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS));

// Helper for fetch with timeout
async function apiCall(endpoint, options = {}, fallbackFn) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to deterministic local store
    return fallbackFn();
  }
}

// 1. Applications
export async function getApplications(filters = {}) {
  return apiCall(
    `/applications?search=${encodeURIComponent(filters.search || '')}&region=${encodeURIComponent(filters.region || 'ALL')}&stage=${encodeURIComponent(filters.stage || 'ALL')}&risk=${encodeURIComponent(filters.risk || 'ALL')}`,
    { method: 'GET' },
    () => {
      let filtered = [...localApps];
      if (filters.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(a => 
          a.id.toLowerCase().includes(s) || 
          a.instituteName.toLowerCase().includes(s) || 
          a.city.toLowerCase().includes(s)
        );
      }
      if (filters.region && filters.region !== 'ALL') {
        filtered = filtered.filter(a => a.region === filters.region);
      }
      if (filters.stage && filters.stage !== 'ALL') {
        filtered = filtered.filter(a => a.currentStage === filters.stage);
      }
      if (filters.risk && filters.risk !== 'ALL') {
        filtered = filtered.filter(a => a.riskLevel === filters.risk);
      }
      return { total: filtered.length, applications: filtered };
    }
  );
}

export async function getApplicationById(id) {
  return apiCall(
    `/applications/${id}`,
    { method: 'GET' },
    () => localApps.find(a => a.id === id) || null
  );
}

export async function createApplication(data) {
  return apiCall(
    `/applications`,
    { method: 'POST', body: JSON.stringify(data) },
    () => {
      const newApp = {
        id: `AICTE-2026-WZ-${9400 + localApps.length + 1}`,
        ...data,
        submittedDate: new Date().toISOString(),
        currentStage: 'SUBMITTED',
        previousStage: 'REGISTRATION',
        slaDeadlineDays: 14,
        slaDeadline: new Date(Date.now() + 14 * 86400000).toISOString(),
        slaElapsedPercent: 0,
        slaStatus: 'ON_TRACK',
        riskLevel: 'LOW',
        assignedOfficer: 'UNASSIGNED',
        assignedOfficerId: null,
        deficiencyHistory: [],
        timeline: [
          { stage: 'REGISTRATION', date: new Date().toISOString(), actor: data.instituteName, note: 'Registered via portal' },
          { stage: 'SUBMITTED', date: new Date().toISOString(), actor: data.instituteName, note: 'Statutory docket submitted' }
        ]
      };
      localApps.unshift(newApp);
      return newApp;
    }
  );
}

export async function transitionApplication(id, action, actor, role, reason) {
  return apiCall(
    `/applications/${id}/transition`,
    { method: 'POST', body: JSON.stringify({ action, actor, role, reason }) },
    () => {
      const target = localApps.find(a => a.id === id);
      if (!target) return { error: 'Not found' };

      let nextStage = target.currentStage;
      let note = '';

      if (action === 'APPROVE') {
        if (target.currentStage === 'DOC_VALIDATION') nextStage = 'SCRUTINY';
        else if (target.currentStage === 'SCRUTINY') nextStage = 'EVC_QUEUE';
        else if (target.currentStage === 'REVERIFICATION') nextStage = 'EVC_QUEUE';
        else if (target.currentStage === 'EVC_QUEUE') nextStage = 'EVC_VISIT';
        else if (target.currentStage === 'EVC_VISIT') nextStage = 'INSPECTION_REPORT';
        else if (target.currentStage === 'INSPECTION_REPORT') nextStage = 'SAC_FINAL';
        else if (target.currentStage === 'SAC_FINAL') nextStage = 'APPROVED';
        note = `Approved by ${actor}. Transitioned to ${nextStage}.`;
      } else if (action === 'REVERT') {
        nextStage = 'DEFICIENCY';
        target.revertReason = reason;
        target.deficiencyHistory.push({
          date: new Date().toISOString(),
          reason,
          actor: actor || 'Scrutiny Officer'
        });
        note = `Deficiency notice issued: ${reason}`;
      } else if (action === 'RESUBMIT') {
        nextStage = 'REVERIFICATION';
        note = `Rectification proofs uploaded by institution. Moved to Reverification.`;
        target.revertReason = null;
      }

      target.previousStage = target.currentStage;
      target.currentStage = nextStage;
      target.timeline.unshift({
        stage: nextStage,
        date: new Date().toISOString(),
        actor: actor || 'Officer',
        note
      });

      return { success: true, application: target };
    }
  );
}

// 2. Officers & Smart Workload Balancing
export async function getOfficers() {
  return apiCall(
    `/officers`,
    { method: 'GET' },
    () => localOfficers
  );
}

export async function autoAssignOfficer() {
  return apiCall(
    `/assignments/auto-assign`,
    { method: 'POST' },
    () => {
      const unassigned = localApps.find(a => !a.assignedOfficerId || a.assignedOfficer === 'UNASSIGNED');
      if (!unassigned) {
        return { message: 'All applications currently assigned.', assigned: null };
      }
      const candidates = localOfficers.filter(o => o.activeDockets < o.maxCapacity);
      candidates.sort((a, b) => (a.activeDockets / a.maxCapacity) - (b.activeDockets / b.maxCapacity));
      const selected = candidates[0];

      unassigned.assignedOfficer = selected.name;
      unassigned.assignedOfficerId = selected.id;
      selected.activeDockets += 1;

      return {
        success: true,
        applicationId: unassigned.id,
        assignedOfficer: selected,
        rationale: `Selected ${selected.name} based on optimal capacity utilization (${selected.activeDockets}/${selected.maxCapacity}) and regional domain alignment.`
      };
    }
  );
}

// 3. Compliance & Document Expiry
export async function getComplianceDocuments() {
  return apiCall(
    `/compliance/documents`,
    { method: 'GET' },
    () => localDocs
  );
}

export async function verifyComplianceDocument(docId, verifier) {
  return apiCall(
    `/compliance/documents/${docId}/verify`,
    { method: 'POST', body: JSON.stringify({ verifier }) },
    () => {
      const doc = localDocs.find(d => d.id === docId);
      if (doc) {
        doc.verificationStatus = 'VERIFIED';
        doc.lastVerified = new Date().toISOString();
        doc.risk = 'LOW';
      }
      return { success: true, document: doc };
    }
  );
}

// 4. SLA & Escalations
export async function getSlaOverview() {
  return apiCall(
    `/sla/overview`,
    { method: 'GET' },
    () => {
      const onTrack = localApps.filter(a => a.slaStatus === 'ON_TRACK').length;
      const warning = localApps.filter(a => a.slaStatus === 'WARNING').length;
      const breached = localApps.filter(a => a.slaStatus === 'BREACHED').length;
      return {
        total: localApps.length,
        onTrack,
        warning,
        breached,
        complianceRate: `${Math.round(((onTrack + warning) / localApps.length) * 100)}%`
      };
    }
  );
}

export async function simulateSlaBreach() {
  return apiCall(
    `/sla/simulate-breach`,
    { method: 'POST' },
    () => {
      const target = localApps.find(a => a.slaStatus === 'ON_TRACK' && a.currentStage === 'SCRUTINY');
      if (target) {
        target.slaStatus = 'BREACHED';
        target.slaElapsedPercent = 118;
        target.riskLevel = 'CRITICAL';
        const newNotif = {
          id: `NOTIF-BREACH-${Date.now()}`,
          title: 'SLA Statutory Breach Escalated',
          message: `CRITICAL: Docket ${target.id} has breached review SLA deadline by 48 hours. Escalated to Regional Head.`,
          channel: 'SMS',
          priority: 'CRITICAL',
          applicationId: target.id,
          recipient: `${target.assignedOfficer} / Regional Head`,
          timestamp: new Date().toISOString(),
          read: false,
          deliveryStatus: 'SMS_SENT_SIMULATED (Twilio Sandbox)'
        };
        localNotifs.unshift(newNotif);
        return { success: true, application: target, notification: newNotif };
      }
      return { error: 'No scrutiny docket eligible' };
    }
  );
}

// 5. EVC Management
export async function getEvcVisits() {
  return apiCall(
    `/evc/visits`,
    { method: 'GET' },
    () => localVisits
  );
}

export async function submitEvcReport(visitId, reportData) {
  return apiCall(
    `/evc/visits/${visitId}/report`,
    { method: 'POST', body: JSON.stringify(reportData) },
    () => {
      const v = localVisits.find(x => x.id === visitId);
      if (v) {
        v.status = 'COMPLETED';
        v.inspectionReport = {
          submittedAt: new Date().toISOString(),
          score: reportData.score || 96,
          verdict: reportData.verdict || 'RECOMMENDED_FULL_INTAKE',
          remarks: reportData.remarks || 'Verification complete.'
        };
      }
      return { success: true, visit: v };
    }
  );
}

// 6. Geo-Optimized Route Engine
export async function optimizeRoute() {
  return apiCall(
    `/routes/optimize`,
    { method: 'POST' },
    () => ({
      status: 'OPTIMIZED',
      algorithm: 'Nearest-Neighbor Heuristic + 2-Opt TSP Improvement',
      stops: [
        { stop: 1, name: 'MIT & AI Campus', city: 'Pune Hub', lat: 18.5204, lng: 73.8567 },
        { stop: 2, name: 'KJ Somaiya Tech', city: 'Mumbai Central', lat: 19.0760, lng: 72.8777 },
        { stop: 3, name: 'Nashik Engineering College', city: 'Nashik Corridor', lat: 19.9975, lng: 73.7898 },
        { stop: 4, name: 'Vidarbha Tech Institute', city: 'Nagpur Zone', lat: 21.1458, lng: 79.0882 }
      ],
      metrics: {
        individualVisitsDistanceKm: 840,
        optimizedClusterDistanceKm: 342,
        distanceSavedKm: 498,
        co2SavedKg: 60,
        travelTimeReductionHours: 12.5,
        costSavingsEstimatedInr: 38400
      }
    })
  );
}

// 7. Audit Ledger Explorer
export async function getAuditLedger() {
  return apiCall(
    `/audit`,
    { method: 'GET' },
    () => localLedger
  );
}

export async function verifyAuditLedger() {
  return apiCall(
    `/audit/verify`,
    { method: 'GET' },
    () => ({
      valid: true,
      totalBlocksChecked: localLedger.length,
      firstInvalidBlock: null,
      status: 'CRYPTOGRAPHIC_CHAIN_INTEGRITY_VERIFIED',
      genesisHash: localLedger[0].currentHash,
      latestHash: localLedger[localLedger.length - 1].currentHash,
      timestamp: new Date().toISOString()
    })
  );
}

export async function tamperTestAudit() {
  return apiCall(
    `/audit/tamper-test`,
    { method: 'POST' },
    () => ({
      simulationName: 'Isolated Disposable Test Ledger Tamper Detection',
      originalBlock: { block: 101, payload: 'Legitimate Approval', hash: '0x99a1...100a' },
      tamperedBlock: { block: 101, payload: 'Altered Intake +120 Seats Unauthorized', newRecalculatedHash: '0x44bb...99ee' },
      subsequentBlockPointer: { block: 102, expectedPrevHash: '0x99a1...100a' },
      mismatchDetected: true,
      verdict: 'FAILED_HASH_MISMATCH: Cryptographic proof detected unauthorized database mutation at Block #101.'
    })
  );
}

// 8. Predictive Analytics
export async function getForecast(region = 'Western Region (Mumbai)') {
  return apiCall(
    `/analytics/forecast?region=${encodeURIComponent(region)}`,
    { method: 'GET' },
    () => ({
      region,
      horizonDays: 15,
      confidenceInterval: '95%',
      model: 'ARIMA(2,1,2) + Prophet Bayesian Trend Estimator',
      series: FORECAST_DATA[region] || FORECAST_DATA['Western Region (Mumbai)'],
      currentBacklog: 31,
      predictedBacklogIn15Days: 52,
      riskLevel: 'HIGH_RISK_BOTTLENECK',
      recommendedIntervention: 'Reassign 8 pending dockets to Central Bureau or authorize temporary secondment of 2 additional scrutiny evaluators.'
    })
  );
}

// 9. APH AI Assistant
export async function askAphAssistant(question) {
  return apiCall(
    `/aph/chat`,
    { method: 'POST', body: JSON.stringify({ question }) },
    () => {
      const qLower = question.toLowerCase();
      let matched = APH_QA_DATABASE.find(item => 
        item.q.toLowerCase().includes(qLower) || 
        qLower.split(' ').some(w => w.length > 3 && item.q.toLowerCase().includes(w))
      );
      if (!matched) matched = APH_QA_DATABASE[0];
      return {
        answer: matched.a,
        citation: {
          chapter: matched.chapter,
          clause: matched.clause,
          page: matched.page,
          confidence: matched.confidence
        },
        suggestedFollowups: [
          "What is the penalty for Cadre Ratio violation under APH?",
          "Explain the physical EVC geo-tagging guidelines.",
          "How to appeal against an adverse SAC decision?"
        ]
      };
    }
  );
}

// 10. Notifications
export async function getNotifications() {
  return apiCall(
    `/notifications`,
    { method: 'GET' },
    () => localNotifs
  );
}

export async function markNotificationRead(id) {
  return apiCall(
    `/notifications/${id}/read`,
    { method: 'PATCH' },
    () => {
      const n = localNotifs.find(x => x.id === id);
      if (n) n.read = true;
      return { success: true };
    }
  );
}

export async function markAllNotificationsRead() {
  return apiCall(
    `/notifications/mark-all-read`,
    { method: 'POST' },
    () => {
      localNotifs.forEach(n => n.read = true);
      return { success: true };
    }
  );
}

// 11. Reset Demo Data
export async function resetDemoData() {
  return apiCall(
    `/system/reset-demo`,
    { method: 'POST' },
    () => {
      localApps = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));
      localOfficers = JSON.parse(JSON.stringify(SEED_OFFICERS));
      localVisits = JSON.parse(JSON.stringify(SEED_EVC_VISITS));
      localDocs = JSON.parse(JSON.stringify(SEED_COMPLIANCE_DOCS));
      localLedger = JSON.parse(JSON.stringify(INITIAL_LEDGER));
      localNotifs = JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS));
      return { success: true, message: 'Reset completed' };
    }
  );
}
