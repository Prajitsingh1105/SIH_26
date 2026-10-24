import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Send, 
  Eye, 
  X,
  Building2,
  FileCheck
} from 'lucide-react';

export default function OfficerWorkbench({ 
  applications = [], 
  onApprove, 
  onRevert,
  onSelectApplication,
  activeOfficer = "Dr. R.K. Srivastava"
}) {
  const [selectedAppId, setSelectedAppId] = useState("AICTE-2026-WZ-9401");
  const [revertModalOpen, setRevertModalOpen] = useState(false);
  const [revertReason, setRevertReason] = useState("");
  const [observationText, setObservationText] = useState("");
  const [checkedDocs, setCheckedDocs] = useState({});

  // Applications assigned to this officer
  const assignedApps = applications.filter(a => 
    a.assignedOfficer.includes("Srivastava") || a.assignedOfficerId === "OFF-101" || a.currentStage === "SCRUTINY"
  ).slice(0, 6);

  const activeApp = applications.find(a => a.id === selectedAppId) || assignedApps[0] || applications[0];

  const STANDARD_CLAUSES = [
    "Cadre Imbalance: Mandatory 1:20 ratio violated as per APH Chapter III Clause 3.4.1 (Shortage of Assistant/Associate Professors)",
    "Registered Land Lease expired or tenure < 30 years as per Chapter II Clause 2.1.3",
    "Fire Safety NOC (Form-5) expired or pending verification from State Fire Authority",
    "Barrier-free infrastructure deficient: Ramps gradient exceeds 1:12 or Divyangjan washrooms missing",
    "High-Performance Computing (HPC) Lab with 60 GPU workstations not verified for AI/ML intake"
  ];

  const toggleDocCheck = (docId) => {
    setCheckedDocs(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleConfirmRevert = (e) => {
    e.preventDefault();
    if (!revertReason.trim()) return;
    onRevert(activeApp.id, revertReason);
    setRevertModalOpen(false);
    setRevertReason("");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Scrutiny Officer Review Workbench</h2>
          <p className="text-xs text-slate-500">
            Assigned Reviewer: <strong className="text-slate-800">{activeOfficer}</strong> • Western Regional Bureau Scrutiny Cell
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-50 border border-blue-200 text-primary font-semibold px-2.5 py-1 rounded-full">
            {assignedApps.length} Assigned Dockets
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assigned Queue */}
        <div className="app-card p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">My Review Queue</span>
            <span className="text-[10px] text-slate-400">Select to evaluate</span>
          </div>

          <div className="space-y-2">
            {assignedApps.map(app => {
              const isSelected = app.id === activeApp.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-50/70 border-primary shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
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
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Due: {new Date(app.slaDeadline).toLocaleDateString()}</span>
                    <span className="font-semibold text-slate-700">Stage: {app.currentStage}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Active Scrutiny Dossier */}
        <div className="lg:col-span-2 space-y-4">
          <div className="app-card p-5 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-primary">{activeApp.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {activeApp.currentStage}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">{activeApp.instituteName}</h3>
                <p className="text-xs text-slate-500">{activeApp.city}, {activeApp.region}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRevertModalOpen(true)}
                  className="px-3 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return (Deficiency)</span>
                </button>

                <button
                  onClick={() => onApprove(activeApp)}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Stage</span>
                </button>
              </div>
            </div>

            {/* Document Verification Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
                  Mandatory Statutory Checklist (APH 2024–27)
                </span>
                <span className="text-[11px] text-slate-400">Click to verify physical/digital evidence</span>
              </div>

              <div className="space-y-2">
                {activeApp.documents.map(doc => {
                  const isChecked = checkedDocs[doc.id] || doc.status === 'VERIFIED';
                  return (
                    <div 
                      key={doc.id}
                      onClick={() => toggleDocCheck(doc.id)}
                      className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-emerald-50/60 border-emerald-200' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-transparent'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-800">{doc.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            Category: {doc.category || 'STATUTORY'} • Hash: {doc.hash}
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isChecked ? 'VERIFIED' : 'PENDING CHECK'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cadre & Space Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Cadre Ratio</div>
                <div className="font-bold text-xs text-slate-800 mt-0.5">{activeApp.cadreRatio}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Built-Up Area</div>
                <div className="font-bold text-xs text-slate-800 mt-0.5">{activeApp.builtUpAreaSqM?.toLocaleString()} sq.m</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Land Lease Expiry</div>
                <div className="font-bold text-xs text-slate-800 mt-0.5">{new Date(activeApp.landLeaseExpiry).toLocaleDateString()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-semibold text-slate-400 uppercase">Fire Safety NOC</div>
                <div className="font-bold text-xs text-slate-800 mt-0.5">{new Date(activeApp.fireNocExpiry).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Scrutiny Observation Note */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scrutiny Review Observation Note (Logged to Audit Ledger)
              </label>
              <textarea
                value={observationText}
                onChange={(e) => setObservationText(e.target.value)}
                placeholder="Record evaluator technical notes or requirements for EVC inspection..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Revert / Deficiency Modal */}
      {revertModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-modal max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Return Docket for Deficiency Correction</h3>
                <p className="text-xs text-slate-500">{activeApp.id} • {activeApp.instituteName}</p>
              </div>
              <button onClick={() => setRevertModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmRevert} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Standard AICTE APH Deficiency Clause
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {STANDARD_CLAUSES.map((clause, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setRevertReason(clause)}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-between"
                    >
                      <span className="line-clamp-1">{clause}</span>
                      <span className="text-primary font-bold text-[10px] ml-2 shrink-0">Use</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deficiency Reason & Statutory Instruction <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={revertReason}
                  onChange={(e) => setRevertReason(e.target.value)}
                  placeholder="Specify the exact deficiency observed..."
                  rows={3}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRevertModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!revertReason.trim()}
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs disabled:opacity-40"
                >
                  Confirm Return Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
