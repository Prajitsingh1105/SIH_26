// ---------------------------------------------------------------------------
// AICTE Sovereign BPM - Local Resilient Mock Store (Offline & Vercel Fallback)
// ---------------------------------------------------------------------------

export const INITIAL_APPLICATIONS = [
  {
    id: "AICTE-2026-WZ-9401",
    instituteName: "Maharashtra Institute of Technology & AI",
    instituteCode: "1-354928101",
    region: "Western Region (Mumbai)",
    applicationType: "Increase in Intake (AI & Data Science)",
    submittedDate: "2026-09-15",
    currentStage: "SCRUTINY",
    previousStage: null,
    slaDeadlineDays: 14,
    slaDeadline: new Date(Date.now() + 14 * 86400000).toISOString(),
    slaStatus: "ON_TRACK",
    landLeaseExpiry: new Date(Date.now() + 18 * 86400000).toISOString(),
    fireNocExpiry: new Date(Date.now() + 90 * 86400000).toISOString(),
    cadreRatio: "1:20 (Compliant)",
    builtUpAreaSqM: 14200,
    requiredAreaSqM: 12000,
    riskScore: "LOW",
    assignedOfficer: "Dr. R.K. Srivastava (RO-Western)",
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
    landLeaseExpiry: new Date(Date.now() + 22 * 86400000).toISOString(),
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
    landLeaseExpiry: new Date(Date.now() + 25 * 86400000).toISOString(),
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
    applicationType: "New Faculty & Supernumerary Seats",
    submittedDate: "2026-09-01",
    currentStage: "APPROVED",
    previousStage: "SAC_FINAL",
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

export const INITIAL_LEDGER = [
  {
    blockIndex: 1,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    applicationId: "SYSTEM",
    action: "GENESIS_BLOCK_INITIALIZED",
    actor: "SYSTEM_ROOT",
    details: "AICTE Sovereign Audit Trail Engine v4.2 Started",
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    currentHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    truncatedHash: "e3b0c44298...7852b855",
    verified: true
  },
  {
    blockIndex: 2,
    timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
    applicationId: "AICTE-2026-WZ-9401",
    action: "APPLICATION_SUBMITTED",
    actor: "COLLEGE_ADMIN (MIT-AI)",
    details: "Application for Increase in Intake submitted with 4 certified documents",
    previousHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    currentHash: "7b4412ef90ca741e14eb1a8843ce21203e00b84c55d19e51241f88a25d2217c0",
    truncatedHash: "7b4412ef90...5d2217c0",
    verified: true
  },
  {
    blockIndex: 3,
    timestamp: new Date(Date.now() - 3600000 * 16).toISOString(),
    applicationId: "AICTE-2026-NZ-7720",
    action: "SCRUTINY_PASSED_MOVED_TO_EVC",
    actor: "RO_OFFICER_ARVIND",
    details: "Initial document checks verified. Scheduled for Expert Visiting Committee inspection",
    previousHash: "7b4412ef90ca741e14eb1a8843ce21203e00b84c55d19e51241f88a25d2217c0",
    currentHash: "a288ecf66e01a4bb743cd34125b281f9a2b3c4d5e6f7a8b9c0d1e2f37f05d876",
    truncatedHash: "a288ecf66e...7f05d876",
    verified: true
  },
  {
    blockIndex: 4,
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    applicationId: "AICTE-2026-SZ-8831",
    action: "EVC_INSPECTION_COMPLETED",
    actor: "EVC_CHAIRMAN_DESHMUKH",
    details: "Physical inspection completed with 98% compliance score. Forwarded to SAC for final sanction",
    previousHash: "a288ecf66e01a4bb743cd34125b281f9a2b3c4d5e6f7a8b9c0d1e2f37f05d876",
    currentHash: "4c11b09e99fa9a7f3e82b10a0ef18dca33126b3891af8d011a99210481234567",
    truncatedHash: "4c11b09e99...81234567",
    verified: true
  },
  {
    blockIndex: 5,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    applicationId: "AICTE-2026-NW-3304",
    action: "FINAL_APPROVAL_SANCTIONED",
    actor: "SAC_CHAIRMAN_SRIVASTAV",
    details: "Standing Appellate Committee ratified approval. AICTE Letter of Approval (LoA) formally generated",
    previousHash: "4c11b09e99fa9a7f3e82b10a0ef18dca33126b3891af8d011a99210481234567",
    currentHash: "8f1244abcc592a9918bc12de0d3a9871ff997c19bb3244e15d2217c0bb041234",
    truncatedHash: "8f1244abcc...bb041234",
    verified: true
  }
];

// In-memory or localStorage cache for seamless persistence across page reloads
let localApplications = [...INITIAL_APPLICATIONS];
let localLedger = [...INITIAL_LEDGER];
let localSimulation = {
  isSimulated: false,
  daysForwarded: 0,
  activeAlerts: [],
  escalations: []
};

export function getLocalApplications() {
  return localApplications;
}

export function getLocalLedger() {
  return localLedger;
}

export function getLocalSimulation() {
  return localSimulation;
}

export function localTransition(id, action, actorId, reason = null) {
  const appIndex = localApplications.findIndex(a => a.id === id);
  if (appIndex === -1) return null;

  const currentApp = { ...localApplications[appIndex] };
  const oldStage = currentApp.currentStage;
  let newStage = oldStage;
  let ledgerAction = '';
  let details = '';

  if (action === 'APPROVE') {
    if (oldStage === 'DEFICIENCY' || oldStage === 'REVERTED') {
      newStage = 'SCRUTINY';
      ledgerAction = 'RE_SUBMISSION_ACCEPTED';
      details = 'Compliance rectification accepted. Re-entered Scrutiny phase';
    } else if (oldStage === 'SCRUTINY') {
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
    }
    currentApp.revertReason = null;
  } else if (action === 'REVERT') {
    newStage = 'DEFICIENCY';
    ledgerAction = `DEFICIENCY_REVERTED_FROM_${oldStage}`;
    details = `Application placed on deficiency hold. Mandatory reason: ${reason}`;
    currentApp.revertReason = reason;
  }

  currentApp.previousStage = oldStage;
  currentApp.currentStage = newStage;
  localApplications[appIndex] = currentApp;

  // Generate cryptographic block
  const previousBlock = localLedger[localLedger.length - 1];
  const previousHash = previousBlock ? previousBlock.currentHash : "00000000000000000000000000000000";
  const fakeHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(16);

  const block = {
    blockIndex: localLedger.length + 1,
    timestamp: new Date().toISOString(),
    applicationId: id,
    action: ledgerAction,
    actor: actorId || 'RO-OFFICER-402',
    details,
    previousHash,
    currentHash: fakeHash,
    truncatedHash: `${fakeHash.substring(0, 10)}...${fakeHash.substring(fakeHash.length - 6)}`,
    verified: true
  };

  localLedger.push(block);

  return { currentApp, block };
}

export function localSimulateFastForward(days = 30) {
  localSimulation.isSimulated = true;
  localSimulation.daysForwarded += days;

  const expiredLeases = [];
  const breachedSla = [];

  localApplications = localApplications.map(app => {
    const updated = { ...app };
    if (updated.id === 'AICTE-2026-WZ-9401' || updated.id === 'AICTE-2026-NZ-7720' || updated.id === 'AICTE-2026-CZ-5109') {
      updated.hasExpiredLease = true;
      expiredLeases.push(updated);
    }
    if (updated.currentStage !== 'APPROVED') {
      updated.slaDeadlineDays = Math.max(-10, (updated.slaDeadlineDays ?? 14) - days);
      if (updated.slaDeadlineDays <= 0) {
        updated.slaStatus = "BREACHED";
        breachedSla.push(updated);
      }
    }
    return updated;
  });

  const escalations = [
    {
      id: "ESC-SMS-01",
      channel: "SMS / WhatsApp Business API",
      recipient: "Secretary, Higher Education & Principal (MIT-AI)",
      phoneNumber: "+91 98230 XXXXX",
      timestamp: new Date().toISOString(),
      message: `[AICTE STATUTORY NOTICE] Urgent: Registered Land Lease has EXPIRED as per Chapter II Clause 4.1. Application AICTE-2026-WZ-9401 frozen pending registered renewal deed.`
    },
    {
      id: "ESC-RO-02",
      channel: "Internal AICTE Command Net (SMS)",
      recipient: "Regional Officer (RO-Northern)",
      phoneNumber: "+91 94150 XXXXX",
      timestamp: new Date().toISOString(),
      message: `[SLA BREACH ALERT] File AICTE-2026-NZ-7720 has breached statutory 30-day scrutiny SLA. Auto-escalated to Member Secretary.`
    }
  ];

  localSimulation.escalations = escalations;

  return {
    success: true,
    daysForwarded: localSimulation.daysForwarded,
    applications: localApplications,
    escalations
  };
}

export function localSimulateReset() {
  localSimulation = {
    isSimulated: false,
    daysForwarded: 0,
    activeAlerts: [],
    escalations: []
  };

  localApplications = [...INITIAL_APPLICATIONS];

  return {
    success: true,
    applications: localApplications
  };
}
