import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Award, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function SmartWorkloadBalancing({ 
  officers = [], 
  applications = [], 
  onAutoAssign 
}) {
  const [assignmentResult, setAssignmentResult] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const unassignedApps = applications.filter(a => !a.assignedOfficerId || a.assignedOfficer === 'UNASSIGNED');

  const handleSimulateAssignment = async () => {
    setIsAssigning(true);
    const res = await onAutoAssign();
    setIsAssigning(false);
    if (res) {
      setAssignmentResult(res);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Smart Workload Balancing & Algorithmic Allocation</h2>
          <p className="text-xs text-slate-500">
            Intelligent assignment heuristic based on evaluator domain expertise, active docket capacity, and regional affinity.
          </p>
        </div>

        <button
          onClick={handleSimulateAssignment}
          disabled={isAssigning}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <Zap className={`w-3.5 h-3.5 text-cyan-accent ${isAssigning ? 'animate-bounce' : ''}`} />
          <span>Simulate Smart Assignment</span>
        </button>
      </div>

      {/* Assignment Explanation Card (if executed) */}
      {assignmentResult && (
        <div className="app-card p-4 bg-teal/10 border border-teal/30 rounded-xl space-y-2 text-xs animate-fade-in">
          <div className="flex items-center gap-2 text-teal font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Smart Workload Allocation Completed</span>
          </div>
          <div className="text-slate-800">
            Application <strong className="font-mono text-primary">{assignmentResult.applicationId}</strong> has been allocated to <strong className="text-slate-900">{assignmentResult.assignedOfficer?.name}</strong>.
          </div>
          <div className="p-2.5 rounded-lg bg-white/80 border border-teal/20 text-slate-700 text-[11px]">
            <strong>Algorithmic Rationale:</strong> {assignmentResult.rationale}
          </div>
        </div>
      )}

      {/* Unassigned Queue Banner */}
      <div className="app-card p-4 bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-800">Unassigned Application Pool: </span>
          <span className="font-semibold text-primary">{unassignedApps.length} Dockets Awaiting Evaluator</span>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Eligible for zero-bias automated heuristic allocation
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {unassignedApps.slice(0, 3).map(a => (
            <span key={a.id} className="font-mono text-[10px] bg-white border border-slate-300 px-2 py-0.5 rounded font-semibold text-slate-700">
              {a.id}
            </span>
          ))}
          {unassignedApps.length > 3 && (
            <span className="text-[10px] text-slate-400">+{unassignedApps.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Officer Workload Grid */}
      <div className="space-y-3">
        <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
          Scrutiny Evaluator Workload & Capacity Roster ({officers.length} Officers)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {officers.map(officer => {
            const utilization = Math.round((officer.activeDockets / officer.maxCapacity) * 100);
            const isOverloaded = utilization >= 90;
            const isWarning = utilization >= 75 && !isOverloaded;

            return (
              <div key={officer.id} className="app-card p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{officer.name}</div>
                    <div className="text-[11px] text-slate-500">{officer.region}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isOverloaded ? 'bg-red-100 text-red-700' :
                    isWarning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isOverloaded ? 'OVERLOADED' : isWarning ? 'WARNING' : 'AVAILABLE'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400">Expertise: </span>
                  <span className="font-medium text-slate-700">{officer.expertise}</span>
                </div>

                {/* Capacity Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Workload Capacity</span>
                    <span className="font-bold text-slate-800">
                      {officer.activeDockets} / {officer.maxCapacity} Dockets ({utilization}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isOverloaded ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
