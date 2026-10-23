import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Layers, 
  MapPin, 
  Building2, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  X, 
  Check, 
  Sparkles, 
  Send, 
  UploadCloud, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  SlidersHorizontal, 
  Terminal, 
  Compass, 
  Copy,
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
  Zap,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_LEDGER 
} from './services/mockData';

// ---------------------------------------------------------------------------
// Standard AICTE APH Deficiency Clauses
// ---------------------------------------------------------------------------
const STANDARD_DEFICIENCIES = [
  "Cadre Imbalance: Mandatory 1:20 ratio violated (Assistant/Associate Professor shortage)",
  "Registered Land Lease expired or tenure < 30 years as per Chapter II Clause 2.1.3",
  "Fire Safety NOC (Form-5) expired or pending verification from State Fire Department",
  "Barrier-free infrastructure deficient: Ramps gradient exceeds 1:12 or Divyangjan washrooms missing",
  "High-Performance Computing (HPC) Lab with 60 GPU workstations not verified for AI/ML intake"
];

const EVC_LOCATIONS = [
  { id: 'LOC-1', name: 'MIT & AI Campus', city: 'Pune Hub', x: 26, y: 58, stop: 1 },
  { id: 'LOC-2', name: 'KJ Somaiya Tech', city: 'Mumbai Central', x: 22, y: 44, stop: 2 },
  { id: 'LOC-3', name: 'Nashik Engineering College', city: 'Nashik Corridor', x: 34, y: 36, stop: 3 },
  { id: 'LOC-4', name: 'Vidarbha Technical Institute', city: 'Nagpur Zone', x: 68, y: 42, stop: 4 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'audit' | 'evc' | 'college'
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [auditLedger, setAuditLedger] = useState(INITIAL_LEDGER);
  const [filterStage, setFilterStage] = useState('ALL');
  const [revertingApp, setRevertingApp] = useState(null);
  const [revertReason, setRevertReason] = useState('');
  const [isSubmittingRevert, setIsSubmittingRevert] = useState(false);
  const [copiedHash, setCopiedHash] = useState(null);

  // Simulation State (DevTools)
  const [simulationState, setSimulationState] = useState({
    isSimulated: false,
    daysForwarded: 0,
    escalations: []
  });
  const [isSimPanelOpen, setIsSimPanelOpen] = useState(false);

  // AI Assistant Chat Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: "Greetings Officer. I am your **AI-Powered APH Assistant (Gemini)**.\n\nAsk me any regulatory question regarding the AICTE Approval Process Handbook (2024–27), such as Faculty-Student Cadre Ratios, Land Tenure Norms, or EVC video geotagging protocols.",
      citation: "APH 2024–27 Chapter III Clause 3.4"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // College Portal Document Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(null);

  // EVC Route Optimization State
  const [isRouteOptimized, setIsRouteOptimized] = useState(false);
  const [routeToast, setRouteToast] = useState(null);

  // KPI Calculations
  const activeDocketsCount = applications.length;
  const breachesCount = applications.filter(a => a.slaStatus === 'BREACHED' || a.hasExpiredLease).length;
  const auditDepth = auditLedger.length;

  // Filtered Applications for Queue
  const filteredApps = applications.filter(app => {
    if (filterStage === 'ALL') return true;
    if (filterStage === 'DEFICIENCY') return app.currentStage === 'DEFICIENCY' || app.currentStage === 'REVERTED';
    return app.currentStage === filterStage;
  });

  // State Machine Advance (Approve)
  const handleApprove = (app) => {
    let nextStage = 'APPROVED';
    let actionLabel = 'APPROVAL_SANCTIONED';
    let details = 'Standing Appellate Committee ratified approval. LoA formally generated.';

    if (app.currentStage === 'SCRUTINY') {
      nextStage = 'EVC_QUEUE';
      actionLabel = 'MOVED_TO_EVC_QUEUE';
      details = 'Scrutiny requirements verified. Dispatched to Expert Visiting Committee inspection queue.';
    } else if (app.currentStage === 'EVC_QUEUE') {
      nextStage = 'SAC_FINAL';
      actionLabel = 'MOVED_TO_SAC_FINAL';
      details = 'Physical inspection completed with 98% compliance score. Forwarded to SAC for final sanction.';
    } else if (app.currentStage === 'SAC_FINAL') {
      nextStage = 'APPROVED';
      actionLabel = 'FINAL_APPROVAL_SANCTIONED';
      details = 'Standing Appellate Committee ratified approval. AICTE Letter of Approval (LoA) generated.';
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (app.currentStage === 'DEFICIENCY' || app.currentStage === 'REVERTED') {
      nextStage = 'SCRUTINY';
      actionLabel = 'RE_SUBMISSION_ACCEPTED';
      details = 'Compliance rectification accepted. Re-entered Scrutiny phase.';
    }

    // Update Application
    setApplications(prev => prev.map(item => {
      if (item.id === app.id) {
        return {
          ...item,
          previousStage: item.currentStage,
          currentStage: nextStage,
          revertReason: null
        };
      }
      return item;
    }));

    // Append to Blockchain Audit Ledger
    const previousBlock = auditLedger[auditLedger.length - 1];
    const prevHash = previousBlock ? previousBlock.currentHash : '00000000000000000000000000000000';
    const fakeHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(16);

    const newBlock = {
      blockIndex: auditLedger.length + 1,
      timestamp: new Date().toISOString(),
      applicationId: app.id,
      action: actionLabel,
      actor: 'RO_OFFICER_SRIVASTAV',
      details,
      previousHash: prevHash,
      currentHash: fakeHash,
      truncatedHash: `${fakeHash.substring(0, 10)}...${fakeHash.substring(fakeHash.length - 6)}`,
      verified: true
    };

    setAuditLedger(prev => [...prev, newBlock]);
  };

  // State Machine Revert
  const openRevertModal = (app) => {
    setRevertingApp(app);
    setRevertReason('');
  };

  const handleConfirmRevert = (e) => {
    e.preventDefault();
    if (!revertingApp || !revertReason.trim()) return;

    setIsSubmittingRevert(true);
    setTimeout(() => {
      setApplications(prev => prev.map(item => {
        if (item.id === revertingApp.id) {
          return {
            ...item,
            previousStage: item.currentStage,
            currentStage: 'DEFICIENCY',
            revertReason: revertReason
          };
        }
        return item;
      }));

      const previousBlock = auditLedger[auditLedger.length - 1];
      const prevHash = previousBlock ? previousBlock.currentHash : '00000000000000000000000000000000';
      const fakeHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(16);

      const revertBlock = {
        blockIndex: auditLedger.length + 1,
        timestamp: new Date().toISOString(),
        applicationId: revertingApp.id,
        action: `DEFICIENCY_REVERTED_FROM_${revertingApp.currentStage}`,
        actor: 'RO_OFFICER_SRIVASTAV',
        details: `Application placed on statutory deficiency hold. Mandatory reason: ${revertReason}`,
        previousHash: prevHash,
        currentHash: fakeHash,
        truncatedHash: `${fakeHash.substring(0, 10)}...${fakeHash.substring(fakeHash.length - 6)}`,
        verified: true
      };

      setAuditLedger(prev => [...prev, revertBlock]);
      setIsSubmittingRevert(false);
      setRevertingApp(null);
    }, 400);
  };

  // Time Travel Simulation
  const handleFastForward = (days = 30) => {
    setSimulationState({
      isSimulated: true,
      daysForwarded: 30,
      escalations: [
        {
          id: "ESC-SMS-01",
          channel: "SMS / WhatsApp Business API",
          recipient: "Principal (MIT-AI)",
          message: "[AICTE STATUTORY NOTICE] Urgent: Registered Land Lease has EXPIRED as per Chapter II Clause 4.1. File AICTE-2026-WZ-9401 frozen pending registered renewal deed."
        },
        {
          id: "ESC-RO-02",
          channel: "AICTE Command Net (SMS)",
          recipient: "Regional Officer (RO-Northern)",
          message: "[SLA BREACH ALERT] File AICTE-2026-NZ-7720 has exceeded 30-day statutory scrutiny timeline. File escalated to Member Secretary."
        }
      ]
    });

    setApplications(prev => prev.map(app => {
      const updated = { ...app };
      if (app.id === 'AICTE-2026-WZ-9401' || app.id === 'AICTE-2026-NZ-7720') {
        updated.hasExpiredLease = true;
      }
      if (app.currentStage !== 'APPROVED') {
        updated.slaDeadlineDays = Math.max(-10, (app.slaDeadlineDays ?? 14) - days);
        if (updated.slaDeadlineDays <= 0) {
          updated.slaStatus = 'BREACHED';
        }
      }
      return updated;
    }));
  };

  const handleResetSimulation = () => {
    setSimulationState({ isSimulated: false, daysForwarded: 0, escalations: [] });
    setApplications(INITIAL_APPLICATIONS);
  };

  // AI Chatbot Query
  const handleSendChat = (queryText = null) => {
    const query = (queryText || chatInput).trim();
    if (!query || isChatLoading) return;

    const userMsg = { role: 'user', text: query };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    setTimeout(() => {
      let botResponse = "Under **AICTE Approval Process Handbook (APH 2024–27) Chapter III**:\n\nThe mandatory Faculty-to-Student Ratio (FSR) for UG Engineering degree programs is **1:20**. The cadre ratio must maintain 1 Professor : 2 Associate Professors : 6 Assistant Professors. Cadre deficiency exceeding 10% invites punitive seat reduction.";
      let citation = "APH 2024–27 Chapter III Clause 3.4.1";

      if (query.toLowerCase().includes('land') || query.toLowerCase().includes('lease')) {
        botResponse = "Under **APH 2024–27 Chapter II Clause 2.1.3**:\n\nLand for an AICTE approved technical institution must be continuous, unencumbered, and held under a registered Government lease for a minimum period of **30 years**. Any land lease expiring within 30 days triggers an automatic statutory freeze.";
        citation = "APH 2024–27 Chapter II Clause 2.1.3";
      } else if (query.toLowerCase().includes('evc') || query.toLowerCase().includes('inspect')) {
        botResponse = "Under **APH 2024–27 Chapter IV Clause 4.2.8**:\n\nAll physical and virtual EVC inspections mandate continuous **Geo-tagged, time-stamped video recording** across core laboratories, computing centers, barrier-free access ramps/lifts for Divyangjan, and fire safety systems.";
        citation = "APH 2024–27 Chapter IV Clause 4.2.8";
      }

      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: botResponse,
        citation
      }]);
      setIsChatLoading(false);
    }, 600);
  };

  // College Document Upload Simulation
  const handleSimulateUpload = (fileName = "Registered Land Lease Extension Deed 2026.pdf") => {
    setIsUploading(true);
    setUploadProgress(15);
    setTimeout(() => setUploadProgress(65), 300);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      setUploadSuccessToast(`Cryptographically sealed with SHA-256: ${fileName}`);
      setTimeout(() => setUploadSuccessToast(null), 4000);
    }, 700);
  };

  // Optimize EVC Route Simulation
  const handleOptimizeRoute = () => {
    setIsRouteOptimized(true);
    setRouteToast("TSP Route Solver: Sequential batching saved 180 km transit distance and reduced inspection SLA by 3.2 days.");
    setTimeout(() => setRouteToast(null), 5000);
  };

  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Primary college app for College Portal view
  const collegeApp = applications.find(a => a.id === "AICTE-2026-WZ-9401") || applications[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/20 selection:text-blue-300 relative overflow-x-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* RADIAL GLOWING BACKGROUND (Vercel / Linear Aesthetic) */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% -10%, rgba(59, 130, 246, 0.12), transparent 50%), radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.08), transparent 45%), radial-gradient(circle at 10% 70%, rgba(16, 185, 129, 0.05), transparent 40%)'
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. FLOATING NAVIGATION ISLAND (Centered Top Bar) */}
      {/* ------------------------------------------------------------- */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-4xl">
        <div className="bg-zinc-900/60 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl rounded-full px-3 py-2 flex items-center justify-between gap-3">
          
          {/* Logo & Bureau */}
          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-white/20">
              <Shield className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left leading-none">
              <div className="text-xs font-semibold text-white tracking-tight">AICTE</div>
              <div className="text-[10px] text-zinc-400 font-mono">BPM v4.2</div>
            </div>
          </div>

          {/* Nav Tabs with Animated Sliding Pill (layoutId) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-950/40 rounded-full border border-white/5">
            {[
              { id: 'queue', label: 'Approval Queue' },
              { id: 'audit', label: 'Audit Trail' },
              { id: 'evc', label: 'EVC Map' },
              { id: 'college', label: 'College Portal' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIslandTab"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pr-1">
            <div className="hidden md:flex flex-col text-right leading-none">
              <span className="text-xs font-medium text-zinc-200">Dr. R.K. Srivastava</span>
              <span className="text-[10px] text-zinc-500 font-mono mt-0.5">RO-Western Bureau</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-medium text-zinc-200 ring-1 ring-white/10">
              RS
            </div>
          </div>

        </div>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT CANVAS */}
      {/* ------------------------------------------------------------- */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* TAB 1: COMMAND OVERVIEW & APPROVAL QUEUE */}
          {/* ========================================================= */}
          {activeTab === 'queue' && (
            <motion.div
              key="queue-view"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Header Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-100 tracking-tight">
                  Regional Command Overview
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                  Manage incoming approval dockets, enforce regulatory SLAs, and ratify institutional inspections.
                </p>
              </div>

              {/* 3 Glassmorphic KPI Cards with SVG Sparklines */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* KPI Card 1: Active Dockets */}
                <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 relative overflow-hidden group hover:ring-white/20 transition-all">
                  <div className="relative z-10">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Active Dockets
                    </span>
                    <div className="mt-3 text-4xl font-semibold text-zinc-100 tracking-tight font-mono">
                      {String(activeDocketsCount).padStart(2, '0')}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      3 in-flight across scrutiny and inspection gates
                    </p>
                  </div>
                  {/* Subtle Sparkline Background */}
                  <svg className="absolute bottom-0 right-0 w-36 h-20 opacity-25 group-hover:opacity-40 transition-opacity" viewBox="0 0 140 60">
                    <path d="M0,45 Q30,10 60,35 T120,15 L140,25" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
                    <path d="M0,45 Q30,10 60,35 T120,15 L140,25 L140,60 L0,60 Z" fill="rgba(59, 130, 246, 0.1)" />
                  </svg>
                </div>

                {/* KPI Card 2: SLA Breaches */}
                <div className={`bg-zinc-900/40 backdrop-blur-md ring-1 rounded-2xl p-6 relative overflow-hidden group transition-all ${
                  breachesCount > 0 ? 'ring-red-500/40 bg-red-950/10' : 'ring-white/10 hover:ring-white/20'
                }`}>
                  <div className="relative z-10">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      SLA Breaches
                    </span>
                    <div className={`mt-3 text-4xl font-semibold tracking-tight font-mono ${
                      breachesCount > 0 ? 'text-red-400' : 'text-zinc-100'
                    }`}>
                      {String(breachesCount).padStart(2, '0')}
                    </div>
                    <p className={`text-xs mt-1 ${breachesCount > 0 ? 'text-red-400 font-medium' : 'text-emerald-400'}`}>
                      {breachesCount > 0 ? 'Statutory notice auto-dispatched' : '100% on schedule across bureau'}
                    </p>
                  </div>
                  {/* Subtle Sparkline Background */}
                  <svg className="absolute bottom-0 right-0 w-36 h-20 opacity-25 group-hover:opacity-40 transition-opacity" viewBox="0 0 140 60">
                    <path d="M0,50 L40,50 L70,48 L110,48 L140,48" fill="none" stroke="#10B981" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* KPI Card 3: Blockchain Audits */}
                <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 relative overflow-hidden group hover:ring-white/20 transition-all">
                  <div className="relative z-10">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Blockchain Audits
                    </span>
                    <div className="mt-3 text-4xl font-semibold text-zinc-100 tracking-tight font-mono">
                      {String(auditDepth).padStart(2, '0')}
                    </div>
                    <p className="text-xs text-blue-400 mt-1">
                      SHA-256 Merkle chain verified
                    </p>
                  </div>
                  {/* Subtle Sparkline Background */}
                  <svg className="absolute bottom-0 right-0 w-36 h-20 opacity-25 group-hover:opacity-40 transition-opacity" viewBox="0 0 140 60">
                    <path d="M0,40 L30,40 L30,25 L70,25 L70,15 L110,15 L140,5" fill="none" stroke="#8B5CF6" strokeWidth="2.5" />
                  </svg>
                </div>

              </div>

              {/* The Queue (List View) */}
              <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-xl">
                
                {/* Queue Header & Filters */}
                <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-100">
                      Pending Approvals Queue
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Review regulatory parameters, ratify inspection findings, or issue deficiency notices.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {['ALL', 'SCRUTINY', 'EVC_QUEUE', 'SAC_FINAL', 'DEFICIENCY', 'APPROVED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStage(st)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                          filterStage === st
                            ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                            : 'text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800'
                        }`}
                      >
                        {st === 'ALL' ? 'All Applications' : st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Queue Rows */}
                <div className="divide-y divide-white/5">
                  {filteredApps.map((app) => {
                    const isBreached = app.slaStatus === 'BREACHED' || (simulationState?.isSimulated && app.slaDeadlineDays <= 0);
                    const isApproved = app.currentStage === 'APPROVED';

                    // Stage status dot
                    let dotColor = 'bg-blue-400';
                    let stageLabel = 'Scrutiny Committee';
                    let badgeClass = 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20';

                    if (app.currentStage === 'EVC_QUEUE') {
                      dotColor = 'bg-purple-400';
                      stageLabel = 'EVC Inspection';
                      badgeClass = 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20';
                    } else if (app.currentStage === 'SAC_FINAL') {
                      dotColor = 'bg-amber-400';
                      stageLabel = 'SAC Final Review';
                      badgeClass = 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20';
                    } else if (app.currentStage === 'APPROVED') {
                      dotColor = 'bg-emerald-400';
                      stageLabel = 'Approved & Issued';
                      badgeClass = 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20';
                    } else if (app.currentStage === 'DEFICIENCY' || app.currentStage === 'REVERTED') {
                      dotColor = 'bg-red-400';
                      stageLabel = 'Deficiency Hold';
                      badgeClass = 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20';
                    }

                    return (
                      <div
                        key={app.id}
                        className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.03] transition-all group"
                      >
                        {/* ID & Status */}
                        <div className="lg:w-1/4 space-y-2">
                          <div className="font-mono text-sm font-semibold text-zinc-200">
                            {app.id}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${isBreached ? 'animate-ping' : ''}`} />
                              <span>{stageLabel}</span>
                            </span>

                            {isBreached && (
                              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-500/30">
                                SLA OVERDUE
                              </span>
                            )}
                          </div>
                        </div>

                        {/* College Name & Purpose */}
                        <div className="lg:w-2/5 space-y-1">
                          <h3 className="text-base font-medium text-zinc-100 leading-snug">
                            {app.instituteName}
                          </h3>
                          <p className="text-xs text-zinc-400">
                            {app.applicationType} • FSR: {app.cadreRatio.split(' ')[0]}
                          </p>
                          {app.revertReason && (
                            <div className="text-xs text-amber-400/90 font-mono mt-1">
                              Notice: {app.revertReason}
                            </div>
                          )}
                          {app.hasExpiredLease && (
                            <div className="text-xs text-red-400 font-mono font-medium">
                              Critical: Land lease deed expired under Chapter II
                            </div>
                          )}
                        </div>

                        {/* SLA Countdown Timer */}
                        <div className="lg:w-1/6 flex items-center gap-2 text-sm text-zinc-400">
                          <Clock className="w-4 h-4 text-zinc-500" />
                          <span className={isBreached ? 'text-red-400 font-semibold' : ''}>
                            {isBreached ? 'Breached' : `${app.slaDeadlineDays ?? 14} Days Remaining`}
                          </span>
                        </div>

                        {/* Hover Revealed Action Buttons */}
                        <div className="lg:w-1/5 flex items-center justify-end gap-2.5 shrink-0">
                          {!isApproved ? (
                            <div className="opacity-90 lg:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                              <button
                                onClick={() => openRevertModal(app)}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                              >
                                Revert
                              </button>

                              <button
                                onClick={() => handleApprove(app)}
                                className="bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold px-4 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                              >
                                <span>{app.currentStage === 'SAC_FINAL' ? 'Sanction LoA' : 'Approve'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              <span>Letter of Approval Issued</span>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

            </motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CRYPTOGRAPHIC AUDIT TRAIL (TERMINAL BLOCK EXPLORER) */}
          {/* ========================================================= */}
          {activeTab === 'audit' && (
            <motion.div
              key="audit-view"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Explorer Top Banner */}
              <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                      <Terminal className="w-4 h-4" />
                    </span>
                    <h2 className="text-xl font-semibold text-zinc-100">
                      AICTE Sovereign Merkle Explorer
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    SHA-256 state transition ledger • Immutable regulatory cryptographic receipts
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <div className="px-3 py-1.5 rounded-lg bg-zinc-950/80 ring-1 ring-white/10 text-zinc-300">
                    Total Blocks: <strong className="text-white">{auditLedger.length}</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 font-semibold">
                    ✓ Integrity 100%
                  </div>
                </div>
              </div>

              {/* Connected Terminal Timeline Layout */}
              <div className="relative pl-6 space-y-4">
                {/* Connecting Vertical Hash Line */}
                <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 opacity-30" />

                {auditLedger.map((block, idx) => (
                  <div
                    key={block.blockIndex || idx}
                    className="relative flex items-start gap-4 group"
                  >
                    {/* Node Anchor */}
                    <div className="w-6 h-6 rounded-full bg-zinc-950 ring-2 ring-emerald-500/50 text-emerald-400 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-3 z-10 shadow-lg">
                      {block.blockIndex || idx + 1}
                    </div>

                    {/* Terminal Block Card */}
                    <div className="flex-1 bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-5 hover:ring-white/20 transition-all shadow-md">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-zinc-200 bg-zinc-800/80 px-2.5 py-0.5 rounded-md border border-white/5">
                            {block.action}
                          </span>
                          <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                            {block.applicationId}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-zinc-500">
                          {new Date(block.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 py-3 leading-relaxed">
                        {block.details}
                      </p>

                      {/* Cryptographic Hash Bar */}
                      <div className="pt-3 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                        <div className="text-zinc-500 font-mono text-[11px]">
                          Actor: <strong className="text-zinc-300">{block.actor}</strong>
                        </div>

                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="text-zinc-600 text-[10px]">
                            Prev: {block.previousHash?.substring(0, 8)}...
                          </span>
                          <span className="text-zinc-600">→</span>

                          <span className="font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md text-xs border border-emerald-400/20 flex items-center gap-1.5 shadow-sm">
                            <span>{block.truncatedHash || `${block.currentHash?.substring(0, 10)}...${block.currentHash?.substring(block.currentHash?.length - 6)}`}</span>
                            <button
                              onClick={() => copyHash(block.currentHash)}
                              className="text-emerald-500 hover:text-emerald-300 p-0.5"
                              title="Copy Full SHA-256"
                            >
                              {copiedHash === block.currentHash ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: GEO-OPTIMIZED EVC MAP (SMART ROUTING MOCKUP) */}
          {/* ========================================================= */}
          {activeTab === 'evc' && (
            <motion.div
              key="evc-view"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header Banner */}
              <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
                      <Compass className="w-4 h-4" />
                    </span>
                    <h2 className="text-xl font-semibold text-zinc-100">
                      Geo-Optimized EVC Inspection Radar
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Spatial TSP algorithm batching institutions to reduce evaluator travel SLA under APH Chapter IV.
                  </p>
                </div>

                <button
                  onClick={handleOptimizeRoute}
                  className="bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Optimize Route (TSP)</span>
                </button>
              </div>

              {routeToast && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-medium flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{routeToast}</span>
                </div>
              )}

              {/* Map & Itinerary Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Dark Map Canvas Mockup (7 cols) */}
                <div className="lg:col-span-7 bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 min-h-[420px] relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between z-10 text-xs font-mono text-zinc-400">
                    <span>WESTERN REGION SECTOR RADAR</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Video Geotagging Enforced
                    </span>
                  </div>

                  {/* Faint Dotted Grid Pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="dotGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1.2" fill="#FFFFFF" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#dotGrid)" />
                    </svg>
                  </div>

                  {/* Dashed SVG Connecting Path (Route Simulation) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <path
                      d="M 180 240 L 150 180 L 240 150 L 480 170"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      className={isRouteOptimized ? "animate-pulse" : ""}
                    />
                  </svg>

                  {/* Plotted Glowing College Location Pins */}
                  <div className="relative w-full h-[280px] my-4 z-20">
                    {EVC_LOCATIONS.map((loc) => (
                      <div
                        key={loc.id}
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      >
                        {/* Glowing Ring */}
                        <span className="absolute -inset-2 rounded-full bg-purple-500/30 animate-ping" />
                        
                        {/* Pin */}
                        <div className="relative px-3 py-1.5 rounded-full bg-zinc-900 border border-purple-500/50 text-white flex items-center gap-1.5 shadow-xl hover:scale-110 transition-transform">
                          <MapPin className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-[11px] font-mono font-semibold">{loc.name.split(' ')[0]}</span>
                        </div>

                        {/* Tooltip on hover */}
                        <div className="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap p-2 rounded-lg bg-zinc-950 border border-white/10 text-xs text-zinc-200 z-30 shadow-2xl">
                          <div className="font-semibold text-white">{loc.name}</div>
                          <div className="text-zinc-400 font-mono text-[10px]">{loc.city} • Stop #{loc.stop}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between z-10 text-[10px] font-mono text-zinc-500">
                    <span>Coordinate System: WGS-84</span>
                    <span>Algorithm: Multi-Campus Clustering</span>
                  </div>
                </div>

                {/* Itinerary Side Panel (5 cols) */}
                <div className="lg:col-span-5 bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-semibold text-zinc-100">
                    Optimized Inspection Itinerary
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                      <span className="text-zinc-500">Transit Distance</span>
                      <div className="text-lg font-bold text-white mt-1">412 km</div>
                      <span className="text-emerald-400 text-[10px]">-180 km saved</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5">
                      <span className="text-zinc-500">Inspection SLA</span>
                      <div className="text-lg font-bold text-white mt-1">4.8 Days</div>
                      <span className="text-emerald-400 text-[10px]">-3.2d compressed</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {EVC_LOCATIONS.map((loc, idx) => (
                      <div
                        key={loc.id}
                        className="p-3 rounded-xl bg-zinc-950/40 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-medium text-white">{loc.name}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{loc.city}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          Scheduled
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: COLLEGE PORTAL (THE SUBMITTER'S VIEW) */}
          {/* ========================================================= */}
          {activeTab === 'college' && (
            <motion.div
              key="college-view"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Institution Hero Header */}
              <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20 font-semibold">
                      {collegeApp.id}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      PID: {collegeApp.instituteCode}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {collegeApp.instituteName}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    {collegeApp.applicationType} • Western Regional Office (Mumbai)
                  </p>
                </div>

                <div className="px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-right">
                  <div className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">
                    Current Workflow Phase
                  </div>
                  <div className="text-sm font-semibold text-blue-400 mt-0.5">
                    {collegeApp.currentStage.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Horizontal Step Progress Bar */}
              <div className="bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 sm:p-7 shadow-xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">
                  Approval Lifecycle Progression
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'SCRUTINY', label: '1. Scrutiny Committee', sub: 'Norms audit' },
                    { key: 'EVC_QUEUE', label: '2. EVC Inspection', sub: 'Physical audit' },
                    { key: 'SAC_FINAL', label: '3. SAC Final Review', sub: 'Appellate review' },
                    { key: 'APPROVED', label: '4. LoA Sanctioned', sub: 'Approval issued' }
                  ].map((step, idx) => {
                    const isCompleted = collegeApp.currentStage === 'APPROVED' || idx === 0;
                    const isActive = collegeApp.currentStage === step.key;

                    return (
                      <div
                        key={step.key}
                        className={`p-4 rounded-xl border transition-all ${
                          isCompleted
                            ? 'bg-blue-500/10 border-blue-500/30'
                            : isActive
                            ? 'bg-white/5 border-white/20'
                            : 'bg-zinc-950/40 border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                            isCompleted
                              ? 'bg-blue-500 text-white'
                              : isActive
                              ? 'bg-white text-zinc-950'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}>
                            {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <span className="text-[10px] font-mono uppercase text-zinc-500">
                            {isCompleted ? 'Verified' : isActive ? 'In Progress' : 'Queued'}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white">{step.label}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{step.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compliance Dossier Grid & Upload Zone */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Compliance Dossier (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-1">
                    Statutory Compliance Dossier
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 flex items-start justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Registered Land Lease Deed</div>
                        <div className="text-xs text-zinc-400 mt-0.5">Mandatory 30-year registered tenure</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                        Valid
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 flex items-start justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Fire Safety NOC (Form-5)</div>
                        <div className="text-xs text-zinc-400 mt-0.5">State Fire Department clearance</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                        90d Remaining
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 flex items-start justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Faculty Cadre Ratio (FSR)</div>
                        <div className="text-xs text-zinc-400 mt-0.5">1:20 UG Engineering standard</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                        1:20 Compliant
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 flex items-start justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">NBA Tier-1 Accreditation</div>
                        <div className="text-xs text-zinc-400 mt-0.5">CSE & AI eligible tier-1</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upload Zone (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 px-1">
                    Cryptographic Document Ingestion
                  </div>

                  {/* Dashed Drag & Drop Box */}
                  <div 
                    onClick={() => handleSimulateUpload("Registered Land Lease Deed 2026.pdf")}
                    className="border-dashed border-2 border-white/20 hover:border-white/40 bg-zinc-900/20 hover:bg-zinc-900/40 rounded-2xl p-8 transition-all text-center flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Drag and drop certified compliance documents (SHA-256 hashed on upload)
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                      Upload PDFs for Land Lease renewals, Fire NOC, or Cadre bio-metric attendance.
                    </p>

                    <button
                      type="button"
                      disabled={isUploading}
                      className="mt-4 px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold text-xs shadow-sm hover:bg-zinc-200 transition-all disabled:opacity-50"
                    >
                      {isUploading ? 'Calculating SHA-256 Signature...' : 'Select File to Upload'}
                    </button>

                    {isUploading && (
                      <div className="w-full max-w-xs mt-4">
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {uploadSuccessToast && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{uploadSuccessToast}</span>
                    </div>
                  )}

                  {/* Attached Documents List */}
                  <div className="p-4 rounded-xl bg-zinc-900/40 backdrop-blur-md ring-1 ring-white/10 space-y-2">
                    <div className="text-xs font-medium text-zinc-300 mb-2">
                      Attached Certified Documents
                    </div>
                    {collegeApp.documents?.map((doc, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-zinc-950/60 border border-white/5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-zinc-200">{doc.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded">
                          {doc.hash}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* 6. GLOBAL OVERLAYS: TIMELINE SIMULATOR & GEMINI CHATBOT */}
      {/* ------------------------------------------------------------- */}

      {/* Bottom Left: DevTools Timeline Simulation Panel */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsSimPanelOpen(!isSimPanelOpen)}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-medium shadow-2xl transition-all ${
            simulationState.isSimulated
              ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/50'
              : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 ring-1 ring-white/10 backdrop-blur-xl'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>DevTools: Timeline Simulation</span>
          {simulationState.isSimulated && (
            <span className="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 text-[10px] font-mono">
              +{simulationState.daysForwarded}d
            </span>
          )}
        </button>

        <AnimatePresence>
          {isSimPanelOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-12 left-0 w-80 rounded-2xl bg-zinc-900/95 backdrop-blur-2xl ring-1 ring-white/10 p-5 shadow-2xl space-y-3 text-left"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-semibold text-white">Timeline Simulator</span>
                <button onClick={() => setIsSimPanelOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Fast-forward timeline to trigger statutory lease expirations, simulate overdue SLA alerts, and dispatch SMS notices.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handleFastForward(30)}
                  className="w-full py-2 px-3 rounded-xl bg-white text-zinc-950 font-semibold text-xs shadow-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Fast Forward 30 Days</span>
                </button>

                <button
                  onClick={handleResetSimulation}
                  className="w-full py-1.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Real-Time</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulated SMS / WhatsApp Escalation Banner (when simulated) */}
      <AnimatePresence>
        {simulationState.escalations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 max-w-sm bg-zinc-900/95 backdrop-blur-2xl ring-1 ring-red-500/40 p-4 rounded-2xl shadow-2xl space-y-2 text-left"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-red-300">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400" />
                <span>Statutory Escalation Notice</span>
              </span>
              <button 
                onClick={() => setSimulationState(s => ({ ...s, escalations: [] }))}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-xs text-zinc-300 font-mono leading-relaxed bg-black/50 p-2.5 rounded-xl border border-white/5">
              {simulationState.escalations[0].message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Right: Floating Action Button (FAB) & Gemini APH Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xl ring-1 ring-white/20 flex items-center justify-center transition-all hover:scale-105"
        >
          {isChatOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute bottom-16 right-0 w-[92vw] sm:w-[400px] h-[520px] rounded-2xl bg-zinc-900/95 backdrop-blur-2xl ring-1 ring-white/10 shadow-2xl flex flex-col overflow-hidden text-left"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 bg-zinc-950/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">AI-Powered APH Assistant (Gemini)</h3>
                    <div className="text-[10px] text-zinc-400 font-mono">Trained on APH 2024–27 Rules</div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-sm'
                          : 'bg-zinc-800/80 text-zinc-200 ring-1 ring-white/5 rounded-tl-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                      {msg.citation && (
                        <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-blue-300">
                          Citation: {msg.citation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="text-xs text-zinc-500 font-mono animate-pulse">
                    Querying APH 2024–27 vector index...
                  </div>
                )}
              </div>

              {/* Suggested Prompts */}
              <div className="px-3 py-1.5 bg-zinc-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
                {[
                  "What is the Faculty-Student Cadre ratio?",
                  "What is the land lease requirement for rural campus?",
                  "What are the mandatory EVC inspection rules?"
                ].map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendChat(prompt)}
                    className="px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] whitespace-nowrap transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
                className="p-3 bg-zinc-950/80 border-t border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about APH approval rules, ratios..."
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-white/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Revert Modal */}
      <AnimatePresence>
        {revertingApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-zinc-900 ring-1 ring-white/10 p-6 shadow-2xl text-left space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-semibold text-white">Issue Deficiency Notice</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{revertingApp.id} • {revertingApp.instituteName}</p>
                </div>
                <button onClick={() => setRevertingApp(null)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmRevert} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-2">
                    Select Standard APH Deficiency Clause
                  </label>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {STANDARD_DEFICIENCIES.map((clause, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setRevertReason(clause)}
                        className="w-full text-left p-2.5 rounded-lg bg-zinc-950/60 hover:bg-zinc-800 border border-white/5 text-xs text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                      >
                        <span className="line-clamp-1">{clause}</span>
                        <span className="text-xs text-blue-400 font-medium ml-2 shrink-0">Use</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Deficiency Rationale <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={revertReason}
                    onChange={(e) => setRevertReason(e.target.value)}
                    placeholder="Specify the regulatory deficiency observed..."
                    rows={3}
                    required
                    className="w-full rounded-xl bg-zinc-950 border border-white/10 focus:border-white/20 p-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setRevertingApp(null)}
                    className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!revertReason.trim() || isSubmittingRevert}
                    className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs px-4 py-2 rounded-xl transition-colors disabled:opacity-40"
                  >
                    {isSubmittingRevert ? 'Recording...' : 'Confirm Reversion'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
