import React, { useState } from 'react';
import { 
  GitBranch, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  FileText,
  Building2,
  ChevronRight
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../services/mockData';

export default function WorkflowMonitor({ 
  applications = [], 
  onSelectApplication 
}) {
  const [selectedStage, setSelectedStage] = useState('SCRUTINY');

  // Count apps in each stage
  const stageCounts = {};
  WORKFLOW_STAGES.forEach(s => {
    stageCounts[s.id] = applications.filter(a => a.currentStage === s.id).length;
  });

  const activeAppsInStage = applications.filter(a => a.currentStage === selectedStage);
  const selectedStageMeta = WORKFLOW_STAGES.find(s => s.id === selectedStage);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Workflow Monitor & State Engine (DAG)</h2>
        <p className="text-xs text-slate-500">
          Visual Directed Acyclic Graph tracking statutory progression, stage bottlenecks, and backward deficiency rectification loops.
        </p>
      </div>

      {/* Visual DAG Flow Chart */}
      <div className="app-card p-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            <span>Intake & Registry</span>
            <span>Technical Scrutiny</span>
            <span>Physical EVC Inspection</span>
            <span>Appellate & Sanction</span>
          </div>

          {/* Node Grid */}
          <div className="flex items-center justify-between gap-2 py-4">
            {WORKFLOW_STAGES.slice(0, 8).map((stage, idx) => {
              const isSelected = selectedStage === stage.id;
              const count = stageCounts[stage.id] || 0;
              const hasBreach = applications.some(a => a.currentStage === stage.id && a.slaStatus === 'BREACHED');

              return (
                <React.Fragment key={stage.id}>
                  <div
                    onClick={() => setSelectedStage(stage.id)}
                    className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md scale-105 z-10'
                        : hasBreach
                        ? 'bg-red-50/80 border-red-300 text-slate-800 hover:border-red-400'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        Stage {idx + 1}
                      </span>
                      {hasBreach && !isSelected && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      )}
                    </div>
                    <div className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {stage.label}
                    </div>
                    <div className={`text-xl font-extrabold mt-1 ${isSelected ? 'text-white' : 'text-primary'}`}>
                      {count}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                      SLA: {stage.slaDays}d
                    </div>
                  </div>

                  {idx < 7 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Special Loop Indicator: Deficiency Rectification */}
          <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs flex items-center justify-between text-amber-800">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-600" />
              <span>
                <strong>Deficiency Loop Protocol:</strong> Applications returned during Scrutiny open a 10-day rectification window (APH Clause 5.1.2) without losing priority timestamp.
              </span>
            </div>
            <button
              onClick={() => setSelectedStage('DEFICIENCY')}
              className="px-2.5 py-1 rounded bg-amber-600 text-white font-bold text-[11px] hover:bg-amber-700 transition-colors"
            >
              View Deficiency Queue ({stageCounts['DEFICIENCY'] || 0})
            </button>
          </div>
        </div>
      </div>

      {/* Applications in Selected Stage */}
      <div className="app-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-sm text-slate-800">
              Applications in stage: <span className="text-primary">{selectedStageMeta?.label}</span> ({activeAppsInStage.length})
            </h3>
            <p className="text-xs text-slate-400">Owner: {selectedStageMeta?.owner} • Statutory SLA: {selectedStageMeta?.slaDays} Days</p>
          </div>
        </div>

        {activeAppsInStage.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No dockets currently active in this stage.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeAppsInStage.map(app => (
              <div 
                key={app.id} 
                onClick={() => onSelectApplication(app)}
                className="p-3.5 rounded-lg border border-slate-200 hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all bg-white"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-primary">{app.id}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    app.slaStatus === 'BREACHED' ? 'bg-red-100 text-red-700' :
                    app.slaStatus === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {app.slaStatus}
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-800 truncate">{app.instituteName}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{app.applicationType}</div>
                
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Officer: {app.assignedOfficer.split(' ')[0]} {app.assignedOfficer.split(' ')[1] || ''}</span>
                  <span className="text-primary font-medium hover:underline flex items-center gap-0.5">
                    View <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
