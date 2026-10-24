import React, { useState } from 'react';
import { 
  CalendarCheck, 
  MapPin, 
  Users, 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  FileCheck, 
  Video, 
  Award,
  ChevronRight,
  Send
} from 'lucide-react';
import { SEED_EXPERTS } from '../services/mockData';

export default function EvcManagement({ 
  evcVisits = [], 
  onSubmitReport 
}) {
  const [selectedVisitId, setSelectedVisitId] = useState(evcVisits[0]?.id || "EVC-2026-WZ-01");
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [reportScore, setReportScore] = useState(96);
  const [reportVerdict, setReportVerdict] = useState('RECOMMENDED_FULL_INTAKE');
  const [reportRemarks, setReportRemarks] = useState('Physical inspection completed. High-performance GPU AI lab and barrier-free access verified.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredVisits = evcVisits.filter(v => {
    if (filterStatus === 'ALL') return true;
    return v.status === filterStatus;
  });

  const activeVisit = evcVisits.find(v => v.id === selectedVisitId) || evcVisits[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReport(activeVisit.id, {
      score: reportScore,
      verdict: reportVerdict,
      remarks: reportRemarks
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Expert Visit Committee (EVC) Management</h2>
          <p className="text-xs text-slate-500">
            Physical campus inspection scheduling, evaluator allocation, geo-tagged video verification, and statutory report submission.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 shadow-sm"
          >
            <option value="ALL">All Inspection Statuses</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="PROPOSED">Proposed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visits List */}
        <div className="app-card p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
              Inspection Visits ({filteredVisits.length})
            </span>
            <span className="text-[10px] text-slate-400">Select to inspect</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredVisits.map(visit => {
              const isSelected = visit.id === activeVisit?.id;
              return (
                <div
                  key={visit.id}
                  onClick={() => setSelectedVisitId(visit.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-50/70 border-primary shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-primary">{visit.id}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      visit.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                      visit.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                      visit.status === 'SCHEDULED' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-slate-800 truncate">{visit.instituteName}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{visit.city} • Docket: {visit.applicationId}</div>
                  <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Visit Date: {new Date(visit.scheduledDate).toLocaleDateString()}</span>
                    <span className="font-medium text-slate-700 truncate max-w-[120px]">{visit.committeeLead}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Visit Dossier & Inspection Checklist */}
        <div className="lg:col-span-2 space-y-4">
          {activeVisit && (
            <div className="app-card p-5 space-y-5">
              {/* Visit Header */}
              <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary">{activeVisit.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                      {activeVisit.city} Hub
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{activeVisit.instituteName}</h3>
                  <p className="text-xs text-slate-500">Related Application: {activeVisit.applicationId}</p>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Inspection Date</div>
                  <div className="text-sm font-bold text-slate-800">{new Date(activeVisit.scheduledDate).toDateString()}</div>
                </div>
              </div>

              {/* Committee Members */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Appointed Expert Committee
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeVisit.members.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-bold text-slate-800">{m}</div>
                        <div className="text-[10px] text-slate-400">AICTE Certified Technical Evaluator</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Protocol Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Statutory EVC Audit Checklist (Clause 4.2.8)
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    <span>Geo-Tagged Video Mandated</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    "Continuous Geo-Tagged & Time-Stamped Video Recording Across Labs",
                    "Dedicated High-Performance Computing (HPC) Lab with 60 GPU Units",
                    "Barrier-Free Infrastructure: Ramps (gradient <= 1:12) & Divyangjan Washrooms",
                    "Active Fire Hydrant Lines, Smoke Sensors & State Fire NOC (Form-5)",
                    "Faculty Biometric Terminal Verification & 1:20 Cadre Compliance"
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-slate-800 font-medium">{item}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        10/10 PTS
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Submission Desk */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  Committee Inspection Report Submission
                </h4>

                {isSubmitted || activeVisit.inspectionReport ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Statutory Inspection Report Filed & Sealed</span>
                    </div>
                    <div>Score: {activeVisit.inspectionReport?.score || reportScore}/100 • Verdict: {activeVisit.inspectionReport?.verdict || reportVerdict}</div>
                    <div className="text-[11px] text-emerald-700">{activeVisit.inspectionReport?.remarks || reportRemarks}</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Compliance Score (0–100)</label>
                        <input
                          type="number"
                          value={reportScore}
                          onChange={(e) => setReportScore(Number(e.target.value))}
                          className="w-full p-2 rounded-lg border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Committee Recommendation</label>
                        <select
                          value={reportVerdict}
                          onChange={(e) => setReportVerdict(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="RECOMMENDED_FULL_INTAKE">Recommended for Full Intake</option>
                          <option value="RECOMMENDED_WITH_REDUCTION">Recommended with 50% Intake Reduction</option>
                          <option value="REFERRED_TO_SAC">Referred to Standing Appellate Committee</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Inspection Findings & Remarks</label>
                      <textarea
                        value={reportRemarks}
                        onChange={(e) => setReportRemarks(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit EVC Report to Standing Appellate Committee</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
