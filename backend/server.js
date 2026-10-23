import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Helper function to generate cryptographic SHA-256
function calculateHash(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

// ---------------------------------------------------------
// Initial Seed Data: AICTE Applications
// ---------------------------------------------------------
let applications = [
  {
    id: "AICTE-2026-WZ-9401",
    instituteName: "Maharashtra Institute of Technology & AI",
    instituteCode: "1-354928101",
    region: "Western Region (Mumbai)",
    applicationType: "Increase in Intake (AI & Data Science)",
    submittedDate: "2026-09-15",
    currentStage: "SCRUTINY", // SCRUTINY, EVC_QUEUE, SAC_FINAL, APPROVED, REVERTED
    previousStage: null,
    slaDeadlineDays: 14,
    slaDeadline: new Date(Date.now() + 14 * 86400000).toISOString(),
    slaStatus: "ON_TRACK", // ON_TRACK, WARNING, BREACHED
    landLeaseExpiry: new Date(Date.now() + 18 * 86400000).toISOString(), // expires within 30 days
    fireNocExpiry: new Date(Date.now() + 90 * 86400000).toISOString(),
    cadreRatio: "1:20 (Compliant)",
    builtUpAreaSqM: 14200,
    requiredAreaSqM: 12000,
    riskScore: "LOW",
    assignedOfficer: "Dr. R.K. Srivastav (RO-Western)",
    evcCluster: "Pune Hub Alpha",
    latitude: 18.5204,
    longitude: 73.8567,
    revertReason: null,
    documents: [
      { name: "Registered Land Lease Deed", status: "VERIFIED", hash: "9a7f3e82...b10a" },
      { name: "National Board of Accreditation (NBA) Certificate", status: "VERIFIED", hash: "4c11b09e...99fa" },
      { name: "Fire Safety NOC (Form-5)", status: "VERIFIED", hash: "0ef18dca...3312" },
      { name: "Faculty Cadre & Bio-metric Roster", status: "PENDING_SCRUTINY", hash: "6b3891af...8d01" }
    ]
  },
  {
    id: "AICTE-2026-NZ-7720",
    instituteName: "Delhi NCR Technical Campus",
    instituteCode: "1-992104812",
    region: "Northern Region (New Delhi)",
    applicationType: "New Technical Campus Approval",
    submittedDate: "2026-08-28",
    currentStage: "EVC_QUEUE",
    previousStage: "SCRUTINY",
    slaDeadlineDays: 8,
    slaDeadline: new Date(Date.now() + 8 * 86400000).toISOString(),
    slaStatus: "WARNING",
    landLeaseExpiry: new Date(Date.now() + 22 * 86400000).toISOString(), // expires in 22 days!
    fireNocExpiry: new Date(Date.now() + 15 * 86400000).toISOString(),
    cadreRatio: "1:24 (Deficient)",
    builtUpAreaSqM: 18500,
    requiredAreaSqM: 19000,
    riskScore: "HIGH",
    assignedOfficer: "Dr. Arvind Joshi (RO-Northern)",
    evcCluster: "NCR Gurugram Cluster",
    latitude: 28.4595,
    longitude: 77.0266,
    revertReason: null,
    documents: [
      { name: "Master Plan & Land Conversion Order", status: "VERIFIED", hash: "7b4412ef...d82a" },
      { name: "Occupancy Certificate (Form-B)", status: "VERIFIED", hash: "1a8843ce...2120" },
      { name: "Barrier-Free Built Environment Affidavit", status: "FLAGGED", hash: "90ca741e...14eb" }
    ]
  },
  {
    id: "AICTE-2026-SZ-8831",
    instituteName: "Bengaluru College of Engineering & Research",
    instituteCode: "1-449102831",
    region: "Southern Region (Bengaluru)",
    applicationType: "Extension of Approval (EoA 2026-27)",
    submittedDate: "2026-09-02",
    currentStage: "SAC_FINAL",
    previousStage: "EVC_QUEUE",
    slaDeadlineDays: 20,
    slaDeadline: new Date(Date.now() + 20 * 86400000).toISOString(),
    slaStatus: "ON_TRACK",
    landLeaseExpiry: new Date(Date.now() + 450 * 86400000).toISOString(),
    fireNocExpiry: new Date(Date.now() + 240 * 86400000).toISOString(),
    cadreRatio: "1:19 (Compliant)",
    builtUpAreaSqM: 25000,
    requiredAreaSqM: 22000,
    riskScore: "LOW",
    assignedOfficer: "Dr. S. Ramanathan (RO-Southern)",
    evcCluster: "Bengaluru South Corridor",
    latitude: 12.9716,
    longitude: 77.5946,
    revertReason: null,
    documents: [
      { name: "Audited Financial Statements (Last 3 Years)", status: "VERIFIED", hash: "3e00b84c...55d1" },
      { name: "Anti-Ragging Undertaking (Clause 1.4)", status: "VERIFIED", hash: "9e51241f...88a2" },
      { name: "EVC Physical Inspection Report (Pass)", status: "VERIFIED", hash: "5d2217c0...bb04" }
    ]
  },
  {
    id: "AICTE-2026-CZ-5109",
    instituteName: "Central India Polytechnic Institute",
    instituteCode: "1-229401773",
    region: "Central Region (Bhopal)",
    applicationType: "Introduction of Integrated BCA/MCA",
    submittedDate: "2026-09-10",
    currentStage: "SCRUTINY",
    previousStage: null,
    slaDeadlineDays: 5,
    slaDeadline: new Date(Date.now() + 5 * 86400000).toISOString(),
    slaStatus: "WARNING",
    landLeaseExpiry: new Date(Date.now() + 25 * 86400000).toISOString(), // expires within 30 days!
    fireNocExpiry: new Date(Date.now() + 180 * 86400000).toISOString(),
    cadreRatio: "1:21 (Marginal)",
    builtUpAreaSqM: 9800,
    requiredAreaSqM: 9500,
    riskScore: "MEDIUM",
    assignedOfficer: "Dr. M.P. Verma (RO-Central)",
    evcCluster: "Bhopal Metro Zone",
    latitude: 23.2599,
    longitude: 77.4126,
    revertReason: null,
    documents: [
      { name: "Affiliation Letter from State Technical Board", status: "VERIFIED", hash: "2a9918bc...12de" },
      { name: "AICTE Portal Fee Payment Receipt", status: "VERIFIED", hash: "8f1244ab...cc59" }
    ]
  },
  {
    id: "AICTE-2026-NW-3304",
    instituteName: "Chandigarh Institute of Advanced Robotics",
    instituteCode: "1-778901234",
    region: "North-Western Region (Chandigarh)",
    applicationType: "New Faculty & Supernumerary Seats (FN/OCI)",
    submittedDate: "2026-09-01",
    currentStage: "EVC_QUEUE",
    previousStage: "SCRUTINY",
    slaDeadlineDays: 16,
    slaDeadline: new Date(Date.now() + 16 * 86400000).toISOString(),
    slaStatus: "ON_TRACK",
    landLeaseExpiry: new Date(Date.now() + 320 * 86400000).toISOString(),
    fireNocExpiry: new Date(Date.now() + 200 * 86400000).toISOString(),
    cadreRatio: "1:20 (Compliant)",
    builtUpAreaSqM: 16200,
    requiredAreaSqM: 15000,
    riskScore: "LOW",
    assignedOfficer: "Dr. Gurpreet Singh (RO-NW)",
    evcCluster: "Chandigarh Tri-City Hub",
    latitude: 30.7333,
    longitude: 76.7794,
    revertReason: null,
    documents: [
      { name: "Robotics & IoT Lab Infrastructure Survey", status: "VERIFIED", hash: "0d3a9871...ff99" },
      { name: "AICTE Endowment Fund FDR", status: "VERIFIED", hash: "7c19bb32...44e1" }
    ]
  }
];

// ---------------------------------------------------------
// Initial Seed Data: Cryptographic Audit Ledger (Blockchain)
// ---------------------------------------------------------
let auditLedger = [];

function createBlock(applicationId, action, actor, details) {
  const previousBlock = auditLedger.length > 0 ? auditLedger[auditLedger.length - 1] : null;
  const previousHash = previousBlock ? previousBlock.currentHash : "0000000000000000000000000000000000000000000000000000000000000000";
  const blockIndex = auditLedger.length + 1;
  const timestamp = new Date().toISOString();

  const blockPayload = {
    blockIndex,
    timestamp,
    applicationId,
    action,
    actor,
    details,
    previousHash
  };

  const currentHash = calculateHash(blockPayload);

  const block = {
    ...blockPayload,
    currentHash,
    truncatedHash: `${currentHash.substring(0, 10)}...${currentHash.substring(currentHash.length - 8)}`,
    verified: true
  };

  auditLedger.push(block);
  return block;
}

// Seed genesis and initial ledger history
createBlock("SYSTEM", "GENESIS_BLOCK_INITIALIZED", "SYSTEM_ROOT", "AICTE Sovereign Audit Trail Engine v4.2 Started");
createBlock("AICTE-2026-WZ-9401", "APPLICATION_SUBMITTED", "COLLEGE_ADMIN (MIT-AI)", "Application for Increase in Intake submitted with 4 documents");
createBlock("AICTE-2026-NZ-7720", "SCRUTINY_PASSED_MOVED_TO_EVC", "RO_OFFICER_ARVIND", "Initial document checks verified. Scheduled for Expert Visiting Committee inspection");
createBlock("AICTE-2026-SZ-8831", "EVC_INSPECTION_COMPLETED", "EVC_CHAIRMAN_DESHMUKH", "Physical inspection completed with 98% compliance score. Forwarded to SAC");
createBlock("AICTE-2026-CZ-5109", "ASSIGNED_SCRUTINY_OFFICER", "RO_CENTRAL_DESK", "Application assigned to Dr. M.P. Verma for regulatory compliance validation");

// ---------------------------------------------------------
// Simulation State
// ---------------------------------------------------------
let simulationState = {
  isSimulated: false,
  daysForwarded: 0,
  simulatedAt: null,
  activeAlerts: [],
  escalations: []
};

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------

// 1. GET /api/applications - List all applications
app.get('/api/applications', (req, res) => {
  res.json({
    success: true,
    data: applications,
    simulation: simulationState
  });
});

// 2. GET /api/applications/:id - Single application
app.get('/api/applications/:id', (req, res) => {
  const appItem = applications.find(a => a.id === req.params.id);
  if (!appItem) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }
  res.json({ success: true, data: appItem });
});

// 3. POST /api/applications/:id/transition - State Machine Transition
app.post('/api/applications/:id/transition', (req, res) => {
  const { id } = req.params;
  const { action, actorId, reason } = req.body;
  // action: 'APPROVE', 'REVERT'
  // actorId: e.g. 'RO-Officer-702'
  
  const appIndex = applications.findIndex(a => a.id === id);
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const currentApp = applications[appIndex];
  const oldStage = currentApp.currentStage;
  let newStage = oldStage;
  let ledgerAction = '';
  let details = '';

  if (action === 'APPROVE') {
    if (oldStage === 'SCRUTINY') {
      newStage = 'EVC_QUEUE';
      ledgerAction = 'MOVED_TO_EVC_QUEUE';
      details = 'Scrutiny requirements satisfied. Transferred to Expert Visiting Committee Queue';
    } else if (oldStage === 'EVC_QUEUE') {
      newStage = 'SAC_FINAL';
      ledgerAction = 'MOVED_TO_SAC_FINAL';
      details = 'EVC evaluation satisfied. Elevated to Standing Appellate Committee for final sanction';
    } else if (oldStage === 'SAC_FINAL') {
      newStage = 'APPROVED';
      ledgerAction = 'FINAL_APPROVAL_SANCTIONED';
      details = 'Standing Appellate Committee ratified approval. AICTE Letter of Approval (LoA) generated';
    } else if (oldStage === 'REVERTED') {
      // Re-scrutiny after compliance fix
      newStage = 'SCRUTINY';
      ledgerAction = 'RE_SUBMISSION_TO_SCRUTINY';
      details = 'Compliance rectification accepted. Re-entered Scrutiny phase';
    }
    currentApp.revertReason = null;
  } else if (action === 'REVERT') {
    if (!reason || reason.trim() === '') {
      return res.status(400).json({ success: false, message: 'Reason for rejection is mandatory when reverting' });
    }
    newStage = 'REVERTED';
    ledgerAction = `DEFICIENCY_REVERTED_FROM_${oldStage}`;
    details = `Application reverted to College Admin. Mandatory reason: ${reason}`;
    currentApp.revertReason = reason;
  } else {
    return res.status(400).json({ success: false, message: 'Invalid action specified' });
  }

  currentApp.previousStage = oldStage;
  currentApp.currentStage = newStage;

  // Record into tamper-proof cryptographic audit ledger
  const block = createBlock(id, ledgerAction, actorId || 'AICTE-RO-WEST', details);

  res.json({
    success: true,
    message: `Application ${id} transitioned from ${oldStage} to ${newStage}`,
    data: currentApp,
    block
  });
});

// 4. GET /api/audit-ledger - Blockchain Ledger
app.get('/api/audit-ledger', (req, res) => {
  res.json({
    success: true,
    count: auditLedger.length,
    data: auditLedger
  });
});

// 5. POST /api/simulate/fast-forward - 30-Day Time Travel Simulation
app.post('/api/simulate/fast-forward', (req, res) => {
  const days = req.body.days || 30;
  simulationState.isSimulated = true;
  simulationState.daysForwarded += days;
  simulationState.simulatedAt = new Date().toISOString();

  const expiredLeases = [];
  const breachedSla = [];
  const simulatedEscalations = [];

  // Update applications based on time fast-forward
  applications.forEach(appItem => {
    // Check land lease expiration (now - 30 days)
    const leaseDate = new Date(appItem.landLeaseExpiry);
    const simulatedNow = new Date(Date.now() + simulationState.daysForwarded * 86400000);

    if (leaseDate < simulatedNow) {
      expiredLeases.push({
        id: appItem.id,
        institute: appItem.instituteName,
        leaseExpiry: appItem.landLeaseExpiry
      });
      appItem.hasExpiredLease = true;
    }

    // Check SLA breach
    if (appItem.currentStage !== 'APPROVED') {
      appItem.slaDeadlineDays = Math.max(-10, appItem.slaDeadlineDays - days);
      if (appItem.slaDeadlineDays <= 0) {
        appItem.slaStatus = "BREACHED";
        breachedSla.push({
          id: appItem.id,
          institute: appItem.instituteName,
          stage: appItem.currentStage,
          daysOverdue: Math.abs(appItem.slaDeadlineDays)
        });
      }
    }
  });

  // Generate simulated automated WhatsApp / SMS escalation alerts
  if (expiredLeases.length > 0) {
    simulatedEscalations.push({
      id: "ESC-SMS-01",
      channel: "SMS / WhatsApp Business API",
      recipient: "Secretary, Higher Education & Principal (MIT-AI)",
      phoneNumber: "+91 98230 XXXXX",
      timestamp: new Date().toISOString(),
      message: `[AICTE STATUTORY NOTICE] Urgent: Registered Land Lease for ${expiredLeases[0].institute} has EXPIRED as per Chapter II Clause 4.1. Application ${expiredLeases[0].id} frozen pending registered renewal deed.`
    });
  }

  if (breachedSla.length > 0) {
    simulatedEscalations.push({
      id: "ESC-RO-02",
      channel: "Internal AICTE Command Net (SMS)",
      recipient: "Regional Officer (RO-Northern)",
      phoneNumber: "+91 94150 XXXXX",
      timestamp: new Date().toISOString(),
      message: `[SLA BREACH ALERT] File ${breachedSla[0].id} has breached statutory 30-day scrutiny SLA by ${breachedSla[0].daysOverdue} days. File auto-escalated to Member Secretary (AICTE HQ, Nelson Mandela Marg).`
    });
  }

  simulationState.activeAlerts = [
    `CRITICAL: ${expiredLeases.length} Institutional Land Leases Expired`,
    `STATUTORY SLA BREACH: ${breachedSla.length} files exceeded deadline`,
    `Automated Escalation Dispatch: 2 High-Priority SMS/WhatsApp notices issued`
  ];
  simulationState.escalations = simulatedEscalations;

  // Add block to audit ledger for simulation event
  createBlock(
    "SYSTEM-SIMULATION",
    "TIME_TRAVEL_SIMULATION_EXECUTED",
    "DEV_TOOLS_ENGINE",
    `Fast-forwarded timeline by ${days} days. ${expiredLeases.length} leases expired. ${breachedSla.length} SLAs breached.`
  );

  res.json({
    success: true,
    daysForwarded: simulationState.daysForwarded,
    expiredLeases,
    breachedSla,
    escalations: simulatedEscalations,
    applications
  });
});

// 6. POST /api/simulate/reset - Reset Simulation
app.post('/api/simulate/reset', (req, res) => {
  simulationState = {
    isSimulated: false,
    daysForwarded: 0,
    simulatedAt: null,
    activeAlerts: [],
    escalations: []
  };

  // Reset statuses
  applications.forEach(a => {
    delete a.hasExpiredLease;
    if (a.id === 'AICTE-2026-WZ-9401') {
      a.slaDeadlineDays = 14;
      a.slaStatus = "ON_TRACK";
    } else if (a.id === 'AICTE-2026-NZ-7720') {
      a.slaDeadlineDays = 8;
      a.slaStatus = "WARNING";
    } else if (a.id === 'AICTE-2026-SZ-8831') {
      a.slaDeadlineDays = 20;
      a.slaStatus = "ON_TRACK";
    } else if (a.id === 'AICTE-2026-CZ-5109') {
      a.slaDeadlineDays = 5;
      a.slaStatus = "WARNING";
    } else if (a.id === 'AICTE-2026-NW-3304') {
      a.slaDeadlineDays = 16;
      a.slaStatus = "ON_TRACK";
    }
  });

  createBlock("SYSTEM-SIMULATION", "SIMULATION_TIMELINE_RESET", "DEV_TOOLS_ENGINE", "Timeline restored to standard real-time anchor");

  res.json({
    success: true,
    message: "Simulation timeline reset to real-time",
    applications
  });
});

// 7. GET /api/kpis - Dashboard KPIs
app.get('/api/kpis', (req, res) => {
  const total = applications.length;
  const pending = applications.filter(a => a.currentStage !== 'APPROVED' && a.currentStage !== 'REVERTED').length;
  const breaches = applications.filter(a => a.slaStatus === 'BREACHED').length;
  const scrutinyCount = applications.filter(a => a.currentStage === 'SCRUTINY').length;
  const evcCount = applications.filter(a => a.currentStage === 'EVC_QUEUE').length;
  const sacCount = applications.filter(a => a.currentStage === 'SAC_FINAL').length;
  const approvedCount = applications.filter(a => a.currentStage === 'APPROVED').length;

  res.json({
    success: true,
    data: {
      total,
      pending,
      breaches,
      stages: {
        scrutiny: scrutinyCount,
        evc: evcCount,
        sac: sacCount,
        approved: approvedCount
      },
      averageTurnaroundDays: 14.2,
      complianceRate: "94.6%"
    }
  });
});

// 8. POST /api/upload-document - Simulate Document Upload & AI Checksum
app.post('/api/upload-document', (req, res) => {
  const { applicationId, documentName } = req.body;
  const mockChecksum = crypto.createHash('sha256').update(`${documentName}-${Date.now()}`).digest('hex');
  
  createBlock(
    applicationId || "AICTE-2026-WZ-9401",
    "DOCUMENT_INTEGRITY_VERIFIED",
    "COLLEGE_PORTAL_GATEWAY",
    `Uploaded [${documentName}] with verified SHA-256 seal: ${mockChecksum.substring(0, 16)}...`
  );

  res.json({
    success: true,
    documentName,
    checksum: mockChecksum,
    message: "Document cryptographically sealed and attached to application file."
  });
});

app.listen(PORT, () => {
  console.log(`AICTE Approval Workflow Engine running on http://localhost:${PORT}`);
});
