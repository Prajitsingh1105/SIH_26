import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  UploadCloud, 
  FileCheck, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  ShieldCheck, 
  Calendar,
  Building,
  CheckCircle2
} from 'lucide-react';

export default function CollegeAdminDashboard({ 
  application, 
  simulationState,
  onUploadDocument,
  onResubmitApplication 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const app = application || {
    id: "AICTE-2026-WZ-9401",
    instituteName: "Maharashtra Institute of Technology & AI",
    instituteCode: "1-354928101",
    applicationType: "Increase in Intake (AI & Data Science)",
    currentStage: "SCRUTINY",
    slaDeadlineDays: 14,
    landLeaseExpiry: new Date(Date.now() + 18 * 86400000).toISOString(),
    fireNocExpiry: new Date(Date.now() + 90 * 86400000).toISOString(),
    cadreRatio: "1:20 (Compliant)",
    documents: [
      { name: "Registered Land Lease Deed", status: "VERIFIED", hash: "9a7f3e82...b10a" },
      { name: "National Board of Accreditation (NBA) Certificate", status: "VERIFIED", hash: "4c11b09e...99fa" },
      { name: "Fire Safety NOC (Form-5)", status: "VERIFIED", hash: "0ef18dca...3312" },
      { name: "Faculty Cadre & Bio-metric Roster", status: "PENDING_SCRUTINY", hash: "6b3891af...8d01" }
    ]
  };

  const stages = [
    { key: 'SCRUTINY', label: 'Scrutiny Committee', sub: 'Norms verification' },
    { key: 'EVC_QUEUE', label: 'EVC Inspection', sub: 'Physical audit' },
    { key: 'SAC_FINAL', label: 'SAC Final', sub: 'Appellate review' },
    { key: 'APPROVED', label: 'LoA Sanctioned', sub: 'Final approval' }
  ];

  const getStepStatus = (stageKey) => {
    if (app.currentStage === 'APPROVED') return 'completed';
    if (app.currentStage === 'REVERTED') {
      if (app.previousStage === stageKey) return 'reverted';
      return 'pending';
    }

    const stageOrder = ['SCRUTINY', 'EVC_QUEUE', 'SAC_FINAL', 'APPROVED'];
    const currentIndex = stageOrder.indexOf(app.currentStage);
    const targetIndex = stageOrder.indexOf(stageKey);

    if (targetIndex < currentIndex) return 'completed';
    if (targetIndex === currentIndex) return 'active';
    return 'pending';
  };

  const isLeaseExpired = app.hasExpiredLease || (simulationState?.isSimulated && simulationState.daysForwarded >= 18);

  const handleSimulatedUpload = async (docName = "Faculty Bio-Metric Attendance Audit 2026.pdf") => {
    setIsUploading(true);
    setUploadProgress(20);
    
    setTimeout(() => setUploadProgress(60), 300);
    setTimeout(() => setUploadProgress(90), 500);
    
    setTimeout(async () => {
      setUploadProgress(100);
      setIsUploading(false);
      setUploadSuccessMessage(`Cryptographically sealed: ${docName}`);
      if (onUploadDocument) {
        await onUploadDocument(app.id, docName);
      }
      setTimeout(() => setUploadSuccessMessage(null), 3500);
    }, 750);
  };

  return (
    <div className="space-y-6">

      {/* Reversion Notice (if reverted) */}
      <AnimatePresence>
        {app.currentStage === 'REVERTED' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-red-200">
                  Application Reverted: Statutory Deficiency Notice
                </h4>
                <p className="text-xs text-red-300/80 mt-0.5 max-w-2xl">
                  {app.revertReason || "Deficiency observed during regulatory check. Re-upload rectified documentation under APH Clause 5.1."}
                </p>
              </div>
            </div>

            <button
              onClick={() => onResubmitApplication(app.id)}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium flex items-center gap-1.5 transition-all shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Submit Rectification Dossier
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Institutional Dossier Header */}
      <div className="rounded-2xl p-6 bg-[#121215] border border-white/[0.08] shadow-bezel">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded border border-white/5">
                {app.id}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                PID: {app.instituteCode}
              </span>
              <span className="text-[11px] text-zinc-400 bg-zinc-800/40 px-2 py-0.5 rounded border border-white/5">
                {app.applicationType}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {app.instituteName}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Affiliated Campus • Western Regional Bureau • Academic Cycle 2026–27
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/[0.06] text-right">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                Workflow Phase
              </div>
              <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                {app.currentStage.replace('_', ' ')}
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/[0.06] text-right">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                SLA Countdown
              </div>
              <div className={`text-xs font-semibold font-mono mt-0.5 ${
                app.slaStatus === 'BREACHED' ? 'text-red-400' : 'text-zinc-200'
              }`}>
                {app.slaDeadlineDays > 0 ? `${app.slaDeadlineDays}d remaining` : `${Math.abs(app.slaDeadlineDays)}d overdue`}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Multi-Step Progress Stepper */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stages.map((stage, idx) => {
              const status = getStepStatus(stage.key);

              return (
                <div
                  key={stage.key}
                  className={`p-3 rounded-xl border transition-all ${
                    status === 'completed'
                      ? 'bg-zinc-900/80 border-blue-500/30'
                      : status === 'active'
                      ? 'bg-zinc-800/50 border-white/20'
                      : status === 'reverted'
                      ? 'bg-red-950/20 border-red-500/30'
                      : 'bg-zinc-900/30 border-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-semibold ${
                      status === 'completed'
                        ? 'bg-blue-600 text-white'
                        : status === 'active'
                        ? 'bg-white text-zinc-900'
                        : status === 'reverted'
                        ? 'bg-red-500 text-white'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {status === 'completed' ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {status === 'completed' && 'Completed'}
                      {status === 'active' && 'Active'}
                      {status === 'reverted' && 'Deficient'}
                      {status === 'pending' && 'Queued'}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-zinc-200">
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    {stage.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Compliance Metrics & Document Upload Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Statutory Compliance (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Statutory Compliance Dossier
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">APH 2026-27</span>
          </div>

          <div className="space-y-2.5">
            {/* Land Lease Deed */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              isLeaseExpired 
                ? 'bg-red-950/20 border-red-500/40' 
                : 'bg-[#121215] border-white/[0.08]'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-200">Registered Land Lease Deed</span>
                    {isLeaseExpired ? (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/30">
                        EXPIRED
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Valid
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Mandatory 30-year registered tenure (Clause 2.1.3)
                  </p>
                </div>
                <span className={`text-[11px] font-mono ${isLeaseExpired ? 'text-red-400 font-semibold' : 'text-zinc-500'}`}>
                  {isLeaseExpired ? 'Expired' : '18d remaining'}
                </span>
              </div>
              {isLeaseExpired && (
                <div className="mt-2.5 pt-2 border-t border-red-500/20 text-[11px] text-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Statutory notice sent. Upload renewal to resume workflow.</span>
                </div>
              )}
            </div>

            {/* Faculty Cadre Ratio */}
            <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-zinc-200">Faculty Cadre Ratio (FSR)</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Mandatory 1:20 UG ratio (1 Prof : 2 Assoc : 6 Asst)
                  </p>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {app.cadreRatio.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Fire Safety NOC */}
            <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-zinc-200">Fire Safety NOC (Form-5)</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    State Fire Services clearance certificate
                  </p>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-zinc-400 bg-zinc-800">
                  90d remaining
                </span>
              </div>
            </div>

            {/* Built-up space */}
            <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.08]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-zinc-200">Campus Built-Up Space</span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Required: 12,000 sq.m • Verified: 14,200 sq.m
                  </p>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10">
                  Compliant
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Document Upload Zone & Attached Dossier (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Cryptographic Document Upload
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">SHA-256 Ledger Sealing</span>
          </div>

          {/* Clean Enterprise Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleSimulatedUpload("Registered Land Lease Extension Deed 2026.pdf");
            }}
            className={`rounded-2xl p-6 border-2 border-dashed transition-all text-center flex flex-col items-center justify-center ${
              dragActive 
                ? 'border-blue-500 bg-blue-500/5' 
                : 'border-white/[0.08] hover:border-white/20 bg-[#121215]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 mb-3">
              <UploadCloud className="w-5 h-5" />
            </div>

            <h4 className="text-xs font-semibold text-zinc-200">
              Drag and drop certified compliance documents
            </h4>
            <p className="text-[11px] text-zinc-500 mt-1 mb-4 max-w-sm">
              Files are hashed with SHA-256 and stamped into the AICTE audit ledger. PDF format only (Max 25MB).
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={isUploading}
                onClick={() => handleSimulatedUpload("Faculty Cadre & Attendance Audit 2026.pdf")}
                className="px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-white text-zinc-900 text-xs font-semibold transition-all disabled:opacity-50"
              >
                Select Document
              </button>
              <button
                disabled={isUploading}
                onClick={() => handleSimulatedUpload("Registered Land Lease Addendum 2026.pdf")}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/5 transition-all disabled:opacity-50"
              >
                Upload Lease Renewal
              </button>
            </div>

            {/* Progress bar */}
            {isUploading && (
              <div className="w-full max-w-xs mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Calculating SHA-256 hash...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadSuccessMessage && (
              <div className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{uploadSuccessMessage}</span>
              </div>
            )}
          </div>

          {/* Attached Files Table */}
          <div className="rounded-xl bg-[#121215] border border-white/[0.08] p-3.5">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5 pb-2 border-b border-white/[0.04]">
              <span className="font-medium text-zinc-300">Attached Verified Dossier</span>
              <span className="font-mono text-[11px]">{app.documents?.length || 4} files</span>
            </div>

            <div className="space-y-1.5">
              {app.documents?.map((doc, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/[0.04] flex items-center justify-between text-xs hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                    <div>
                      <div className="font-medium text-zinc-200 text-[11px]">{doc.name}</div>
                      <div className="font-mono text-[10px] text-zinc-500">
                        SHA: <span className="text-zinc-400">{doc.hash}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                    doc.status === 'VERIFIED'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
