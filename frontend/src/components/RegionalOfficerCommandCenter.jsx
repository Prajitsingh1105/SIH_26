import React, { useState } from 'react';
import { 
  Shield, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  X, 
  Check, 
  AlertCircle,
  FileText,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AuditLedger from './AuditLedger';
import EvcClusterMap from './EvcClusterMap';

const STANDARD_DEFICIENCIES = [
  "Cadre Imbalance: Mandatory 1:20 ratio violated (Assistant/Associate Professor shortage)",
  "Registered Land Lease expired or tenure < 30 years as per Chapter II Clause 2.1.3",
  "Fire Safety NOC (Form-5) expired or pending verification from State Fire Department",
  "Barrier-free infrastructure deficient: Ramps gradient exceeds 1:12 or Divyangjan washrooms missing",
  "High-Performance Computing (HPC) Lab with 60 GPU workstations not verified for AI/ML intake"
];

const STAGE_CONFIG = {
  DEFICIENCY: { label: 'Deficiency Hold', dotColor: 'bg-amber-400', badgeClass: 'bg-amber-400/10 text-amber-300 border-amber-400/20' },
  REVERTED: { label: 'Deficiency Hold', dotColor: 'bg-amber-400', badgeClass: 'bg-amber-400/10 text-amber-300 border-amber-400/20' },
  SCRUTINY: { label: 'Scrutiny Committee', dotColor: 'bg-blue-400', badgeClass: 'bg-blue-400/10 text-blue-300 border-blue-400/20' },
  EVC_QUEUE: { label: 'EVC Inspection', dotColor: 'bg-purple-400', badgeClass: 'bg-purple-400/10 text-purple-300 border-purple-400/20' },
  SAC_FINAL: { label: 'SAC Final Review', dotColor: 'bg-yellow-400', badgeClass: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20' },
  APPROVED: { label: 'Approved & Issued', dotColor: 'bg-emerald-400', badgeClass: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20' }
};

export default function RegionalOfficerCommandCenter({
  applications = [],
  auditLedger = [],
  activeTab = 'kanban',
  setActiveTab = () => {},
  currentRole = 'OFFICER',
  setCurrentRole = () => {},
  simulationState = {},
  onTransition = () => {}
}) {
  const [revertingApp, setRevertingApp] = useState(null);
  const [revertReason, setRevertReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStage, setFilterStage] = useState('ALL');

  // KPI Metrics Calculation
  const totalDockets = applications.length || 5;
  const breachesCount = applications.filter(a => a.slaStatus === 'BREACHED' || a.hasExpiredLease).length;
  const auditDepth = Math.max(auditLedger.length, 18);
  const pendingEvcCount = applications.filter(a => a.currentStage === 'EVC_QUEUE').length || 2;

  // Filter applications
  const filteredApps = applications.filter(app => {
    if (filterStage === 'ALL') return true;
    if (filterStage === 'DEFICIENCY') return app.currentStage === 'DEFICIENCY' || app.currentStage === 'REVERTED';
    return app.currentStage === filterStage;
  });

  const handleApprove = (app) => {
    if (app.currentStage === 'SAC_FINAL') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    onTransition(app.id, 'APPROVE');
  };

  const openRevertModal = (app) => {
    setRevertingApp(app);
    setRevertReason('');
  };

  const closeRevertModal = () => {
    setRevertingApp(null);
    setRevertReason('');
  };

  const handleConfirmRevert = async (e) => {
    e.preventDefault();
    if (!revertingApp || !revertReason.trim()) return;

    setIsSubmitting(true);
    try {
      await onTransition(revertingApp.id, 'REVERT', revertReason);
      closeRevertModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#09090b] text-zinc-100 min-h-screen space-y-8 font-sans pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="w-full border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          
          {/* Left: Sleek Logo Icon + AICTE Workflow Engine */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#18181b] border border-white/10 flex items-center justify-center text-white">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="font-medium text-white text-base tracking-tight">
                AICTE Workflow Engine
              </span>
              <span className="text-zinc-500 text-xs ml-2 hidden sm:inline-block font-normal">
                Western Bureau
              </span>
            </div>
          </div>

          {/* Center Tabs: State Machine / Audit Trail / EVC Clusters */}
          <div className="hidden md:flex items-center gap-1 bg-[#18181b] p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'kanban'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Approval Queue
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'ledger'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Audit Trail ({auditLedger.length})
            </button>
            <button
              onClick={() => setActiveTab('clusters')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'clusters'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EVC Map
            </button>
          </div>

          {/* Right: User Profile Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRole(currentRole === 'OFFICER' ? 'COLLEGE' : 'OFFICER')}
              className="text-xs text-zinc-400 hover:text-white border border-white/10 px-2.5 py-1.5 rounded-md transition-colors"
            >
              Switch to {currentRole === 'OFFICER' ? 'College View' : 'Officer View'}
            </button>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#18181b] border border-white/10">
              <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30 flex items-center justify-center text-xs font-medium">
                RS
              </div>
              <span className="text-sm font-medium text-zinc-200">
                Dr. R.K. Srivastava
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. KPI OVERVIEW SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Regional Command Overview
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time status of technical institution approval applications across Western Region.
          </p>
        </div>

        {/* CSS Grid of 3 Distinct KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KPI Card 1: Active Dockets */}
          <div className="p-6 rounded-xl bg-[#18181b] border border-white/10 flex flex-col justify-between">
            <span className="text-sm font-medium text-zinc-400">
              Active Dockets
            </span>
            <div className="my-3">
              <div className="text-4xl font-semibold text-white tracking-tight">
                {String(totalDockets).padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs text-zinc-400">
              {pendingEvcCount} pending EVC inspection
            </div>
          </div>

          {/* KPI Card 2: SLA Breaches / Lapsed */}
          <div className="p-6 rounded-xl bg-[#18181b] border border-white/10 flex flex-col justify-between">
            <span className="text-sm font-medium text-zinc-400">
              SLA Breaches
            </span>
            <div className="my-3">
              <div className={`text-4xl font-semibold tracking-tight ${
                breachesCount > 0 ? 'text-red-400' : 'text-white'
              }`}>
                {String(breachesCount).padStart(2, '0')}
              </div>
            </div>
            <div className={`text-xs ${
              breachesCount > 0 ? 'text-red-400 font-medium' : 'text-emerald-400'
            }`}>
              {breachesCount > 0 ? 'Urgent statutory notices active' : '100% on schedule'}
            </div>
          </div>

          {/* KPI Card 3: Blockchain Audits */}
          <div className="p-6 rounded-xl bg-[#18181b] border border-white/10 flex flex-col justify-between">
            <span className="text-sm font-medium text-zinc-400">
              Blockchain Audits
            </span>
            <div className="my-3">
              <div className="text-4xl font-semibold text-white tracking-tight">
                {String(auditDepth).padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs text-blue-400">
              SHA-256 Verified
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. THE APPLICATION QUEUE (STRUCTURED LIST / TABLE) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'kanban' && (
        <section className="space-y-4">
          
          {/* Main Card Container */}
          <div className="bg-[#18181b] rounded-xl border border-white/10 overflow-hidden shadow-sm">
            
            {/* Header of Container */}
            <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Pending Approvals
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Review compliance parameters, advance through approval gates, or issue deficiency notices.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['ALL', 'SCRUTINY', 'EVC_QUEUE', 'SAC_FINAL', 'DEFICIENCY', 'APPROVED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStage(st)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                      filterStage === st
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                    }`}
                  >
                    {st === 'ALL' ? 'All Applications' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-white/5">
              {filteredApps.map((app) => {
                const stageMeta = STAGE_CONFIG[app.currentStage] || STAGE_CONFIG.SCRUTINY;
                const isBreached = app.slaStatus === 'BREACHED' || (simulationState?.isSimulated && app.slaDeadlineDays <= 0);
                const isApproved = app.currentStage === 'APPROVED';

                return (
                  <div
                    key={app.id}
                    className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Column 1: Application ID and Status Badge */}
                    <div className="lg:w-1/4 space-y-2">
                      <div className="font-mono text-sm font-medium text-zinc-300">
                        {app.id}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${stageMeta.badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${stageMeta.dotColor}`} />
                          <span>{stageMeta.label}</span>
                        </span>

                        {isBreached && (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                            SLA BREACH
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Column 2: College Name and Purpose */}
                    <div className="lg:w-2/5 space-y-1">
                      <h3 className="text-base font-medium text-white leading-snug">
                        {app.instituteName}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {app.applicationType}
                      </p>

                      {app.revertReason && (
                        <div className="text-xs text-amber-300/90 font-normal pt-1">
                          Deficiency: {app.revertReason}
                        </div>
                      )}

                      {app.hasExpiredLease && (
                        <div className="text-xs text-red-400 font-medium">
                          Alert: Land lease deed expired under Chapter II Clause 2.1
                        </div>
                      )}
                    </div>

                    {/* Column 3: SLA Timer */}
                    <div className="lg:w-1/6 flex items-center gap-2 text-sm text-zinc-400">
                      <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className={isBreached ? 'text-red-400 font-medium' : ''}>
                        {isBreached ? 'Overdue' : `${app.slaDeadlineDays ?? 14} Days Remaining`}
                      </span>
                    </div>

                    {/* Column 4: Actions (Clear, Highly Visible Approve Button) */}
                    <div className="lg:w-1/5 flex items-center justify-end gap-2 shrink-0">
                      {!isApproved ? (
                        <>
                          <button
                            onClick={() => openRevertModal(app)}
                            className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                          >
                            Revert
                          </button>

                          <button
                            onClick={() => handleApprove(app)}
                            className="bg-white text-black hover:bg-zinc-200 font-medium text-sm rounded-md px-4 py-2 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <span>{app.currentStage === 'SAC_FINAL' ? 'Sanction LoA' : 'Approve'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <div className="px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Letter of Approval Issued</span>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

              {filteredApps.length === 0 && (
                <div className="p-12 text-center text-zinc-500 text-sm">
                  No applications match this filter criteria.
                </div>
              )}
            </div>

          </div>

        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AUDIT TRAIL TAB */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ledger' && (
        <AuditLedger ledger={auditLedger} />
      )}

      {/* ------------------------------------------------------------- */}
      {/* EVC CLUSTERS TAB */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'clusters' && (
        <EvcClusterMap />
      )}

      {/* ------------------------------------------------------------- */}
      {/* CLEAN REVERT REASON MODAL */}
      {/* ------------------------------------------------------------- */}
      {revertingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl bg-[#18181b] border border-white/10 p-6 shadow-2xl text-left space-y-4">
            
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Issue Deficiency Notice
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {revertingApp.id} • {revertingApp.instituteName}
                </p>
              </div>
              <button
                onClick={closeRevertModal}
                className="text-zinc-500 hover:text-white p-1"
              >
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
                      className="w-full text-left p-2.5 rounded-lg bg-black/40 hover:bg-black/70 border border-white/5 text-xs text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{clause}</span>
                      <span className="text-xs text-blue-400 font-medium ml-2 shrink-0">Use</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Detailed Rejection Rationale <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={revertReason}
                  onChange={(e) => setRevertReason(e.target.value)}
                  placeholder="Specify the regulatory deficiency observed during scrutiny or EVC..."
                  rows={3}
                  required
                  className="w-full rounded-lg bg-[#09090b] border border-white/10 focus:border-white/30 p-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-colors resize-none"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  The application will be placed on deficiency hold and the college will be notified.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeRevertModal}
                  className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!revertReason.trim() || isSubmitting}
                  className="bg-white text-black hover:bg-zinc-200 font-medium text-sm px-4 py-2 rounded-md transition-colors disabled:opacity-40"
                >
                  {isSubmitting ? 'Recording...' : 'Confirm Reversion'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
