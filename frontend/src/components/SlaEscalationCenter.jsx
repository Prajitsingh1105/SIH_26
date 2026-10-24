import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  BellRing, 
  RotateCcw,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function SlaEscalationCenter({ 
  applications = [], 
  onSimulateBreach,
  onSelectApplication 
}) {
  const [breachToast, setBreachToast] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const breachedApps = applications.filter(a => a.slaStatus === 'BREACHED');
  const warningApps = applications.filter(a => a.slaStatus === 'WARNING');
  const onTrackCount = applications.length - breachedApps.length - warningApps.length;
  const complianceRate = Math.round(((onTrackCount + warningApps.length) / applications.length) * 100);

  const handleBreach = async () => {
    setIsSimulating(true);
    const result = await onSimulateBreach();
    setIsSimulating(false);
    if (result && result.application) {
      setBreachToast(`Simulated breach triggered on Docket ${result.application.id}! Priority escalation SMS dispatched to Regional Head.`);
      setTimeout(() => setBreachToast(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Automated SLA Escalation Matrix & Breach Queue</h2>
          <p className="text-xs text-slate-500">
            Rule-based statutory deadline monitoring, BullMQ-delayed escalation triggers, and multi-tier authority alerts.
          </p>
        </div>

        <button
          onClick={handleBreach}
          disabled={isSimulating}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'animate-bounce' : ''}`} />
          <span>Simulate Instant SLA Breach</span>
        </button>
      </div>

      {breachToast && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-800 flex items-center gap-2 animate-fade-in">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
          <span>{breachToast}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="app-card p-4 border-l-4 border-l-emerald-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">SLA Compliance Rate</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{complianceRate}%</div>
          <div className="text-[10px] text-slate-400 mt-1">National Benchmark &gt;= 95%</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-blue-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">On Schedule</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{onTrackCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">0–74% SLA Duration</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-amber-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Warning Threshold</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{warningApps.length}</div>
          <div className="text-[10px] text-amber-600 mt-1">75%–99% SLA Duration</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-red-500 bg-red-50/20">
          <div className="text-[11px] font-semibold text-red-600 uppercase">Breached & Escalated</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{breachedApps.length}</div>
          <div className="text-[10px] text-red-500 font-medium mt-1">Requires Reassignment</div>
        </div>
      </div>

      {/* Statutory Escalation Policy Matrix */}
      <div className="app-card p-5 space-y-3">
        <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
          Configured Statutory Escalation Policy (APH 2024–27 Rules)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900">Tier 1: 75% Elapsed</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">Advisory</span>
            </div>
            <p className="text-blue-800 text-[11px]">
              Yellow indicator tagged to docket. In-app notification delivered to assigned Scrutiny Officer.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900">Tier 2: 90% Elapsed</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Urgent</span>
            </div>
            <p className="text-amber-800 text-[11px]">
              High-priority SMS & WhatsApp alert dispatched to Reviewer and Bureau Regional Head.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-900">Tier 3: 100% Breached</span>
              <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-bold">Critical</span>
            </div>
            <p className="text-red-800 text-[11px]">
              Statutory breach recorded to Cryptographic Audit Ledger. Escalated to AICTE Member Secretary for emergency file reassignment.
            </p>
          </div>
        </div>
      </div>

      {/* Active Escalation Queue */}
      <div className="app-card p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
            Active Escalation Queue ({breachedApps.length} Critical Files)
          </span>
          <span className="text-[10px] text-red-600 font-bold">Automatic Reassignment Candidate</span>
        </div>

        <div className="space-y-2">
          {breachedApps.map(app => (
            <div
              key={app.id}
              className="p-3.5 rounded-lg border border-red-200 bg-red-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-red-700">{app.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold">
                    BREACHED (Overdue)
                  </span>
                  <span className="text-[10px] text-slate-400">• {app.region}</span>
                </div>
                <div className="font-semibold text-slate-900 mt-1">{app.instituteName}</div>
                <div className="text-[11px] text-slate-500">
                  Assigned Reviewer: {app.assignedOfficer} • Stage: {app.currentStage}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectApplication(app)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 text-xs shadow-sm"
                >
                  Inspect Docket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
