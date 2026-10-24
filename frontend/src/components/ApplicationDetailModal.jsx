import React from 'react';
import { 
  X, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw,
  MapPin,
  Calendar
} from 'lucide-react';

export default function ApplicationDetailModal({ 
  application, 
  onClose,
  onApprove,
  onRevert
}) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-modal max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-sm text-primary">{application.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                application.currentStage === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                application.currentStage === 'DEFICIENCY' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {application.currentStage}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                application.slaStatus === 'BREACHED' ? 'bg-red-100 text-red-800' :
                application.slaStatus === 'WARNING' ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                SLA: {application.slaStatus}
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-900">{application.instituteName}</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">{application.applicationType}</p>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          {/* Institution & Evaluator Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Region & Hub</div>
              <div className="font-bold text-slate-800 mt-0.5 truncate">{application.city}, {application.region?.split(' ')[0]}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Assigned Evaluator</div>
              <div className="font-bold text-slate-800 mt-0.5 truncate">{application.assignedOfficer}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Cadre Ratio</div>
              <div className="font-bold text-slate-800 mt-0.5">{application.cadreRatio || '1:20 (Norm)'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Built-Up Area</div>
              <div className="font-bold text-slate-800 mt-0.5">{application.builtUpAreaSqM?.toLocaleString()} sq.m</div>
            </div>
          </div>

          {/* Active Deficiency Alert (if deficient) */}
          {application.revertReason && (
            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Active Statutory Deficiency Notice</span>
              </div>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                {application.revertReason}
              </p>
            </div>
          )}

          {/* Statutory Documents */}
          <div>
            <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider mb-2">
              Submitted Regulatory Documents ({application.documents?.length || 0})
            </h4>
            <div className="space-y-1.5">
              {application.documents?.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium text-slate-800">{doc.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Category: {doc.category || 'STATUTORY'} • Hash: {doc.hash}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    doc.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider mb-2">
              Statutory Application Timeline
            </h4>
            <div className="space-y-3 relative pl-6 border-l-2 border-slate-200">
              {application.timeline?.map((evt, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white" />
                  <div className="font-bold text-slate-800">{evt.stage}</div>
                  <div className="text-[11px] text-slate-600">{evt.note}</div>
                  <div className="text-[10px] text-slate-400">By {evt.actor} • {new Date(evt.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
