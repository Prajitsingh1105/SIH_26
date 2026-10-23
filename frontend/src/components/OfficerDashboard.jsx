import React from 'react';
import { 
  FileStack, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Kanban as KanbanIcon, 
  FileText, 
  Compass
} from 'lucide-react';
import StateMachineKanban from './StateMachineKanban';
import AuditLedger from './AuditLedger';
import EvcClusterMap from './EvcClusterMap';

export default function OfficerDashboard({
  applications,
  auditLedger,
  activeTab,
  setActiveTab,
  simulationState,
  onTransition,
  onOpenRevertModal
}) {
  const total = applications.length;
  const pending = applications.filter(a => a.currentStage !== 'APPROVED' && a.currentStage !== 'REVERTED').length;
  const breaches = applications.filter(a => a.slaStatus === 'BREACHED' || a.hasExpiredLease).length;
  const approved = applications.filter(a => a.currentStage === 'APPROVED').length;

  return (
    <div className="space-y-6">
      
      {/* Officer Summary Header & Metric Strip */}
      <div className="space-y-4">
        
        {/* Officer Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-[#121215] border border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-white">
                Regional Officer Command Center
              </h1>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded border border-white/5">
                Western Bureau
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Review dockets, ratify EVC inspection clusters, and execute state machine approvals.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'kanban' 
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/5' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <KanbanIcon className="w-3.5 h-3.5" />
              State Machine
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'ledger' 
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/5' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Audit Trail ({auditLedger.length})
            </button>
            <button
              onClick={() => setActiveTab('clusters')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'clusters' 
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/5' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              EVC Map
            </button>
          </div>
        </div>

        {/* 4 Restrained Stripe-style Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.08]">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
              <span>Assigned Dockets</span>
              <FileStack className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-zinc-100">{total}</span>
              <span className="text-[11px] text-zinc-500 font-mono">active</span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              {pending} in-flight across stages
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all ${
            breaches > 0
              ? 'bg-red-950/20 border-red-500/30'
              : 'bg-[#121215] border-white/[0.08]'
          }`}>
            <div className="flex items-center justify-between text-xs font-medium">
              <span className={breaches > 0 ? 'text-red-300' : 'text-zinc-500'}>
                SLA Breaches / Lapsed
              </span>
              <AlertCircle className={`w-3.5 h-3.5 ${breaches > 0 ? 'text-red-400' : 'text-zinc-600'}`} />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-xl font-bold font-mono ${breaches > 0 ? 'text-red-400' : 'text-zinc-100'}`}>
                {breaches}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">critical</span>
            </div>
            <div className={`mt-1 text-[11px] ${breaches > 0 ? 'text-red-400 font-medium' : 'text-zinc-500'}`}>
              {breaches > 0 ? 'Automated escalation active' : '100% on schedule'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.08]">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
              <span>Sanctioned Approvals</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-emerald-400">{approved}</span>
              <span className="text-[11px] text-zinc-500 font-mono">LoA issued</span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              Avg 14.2 days turnaround
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.08]">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
              <span>Audit Chain Depth</span>
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-zinc-100">{auditLedger.length}</span>
              <span className="text-[11px] text-zinc-500 font-mono">blocks</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-500/90 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Immutable & Verified</span>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded Tab Views */}
      <div>
        {activeTab === 'kanban' && (
          <StateMachineKanban
            applications={applications}
            onTransition={onTransition}
            onOpenRevertModal={onOpenRevertModal}
            simulationState={simulationState}
          />
        )}

        {activeTab === 'ledger' && (
          <AuditLedger ledger={auditLedger} />
        )}

        {activeTab === 'clusters' && (
          <EvcClusterMap />
        )}
      </div>

    </div>
  );
}
