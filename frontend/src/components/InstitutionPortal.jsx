import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  UploadCloud, 
  Send, 
  RotateCcw, 
  FileCheck,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function InstitutionPortal({ 
  applications = [], 
  onCreateApplication, 
  onResubmitApplication, 
  activeInstitute = "Maharashtra Institute of Technology & AI" 
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'wizard' | 'tracking' | 'deficiencies'
  const [wizardStep, setWizardStep] = useState(1);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [rectificationText, setRectificationText] = useState("");
  const [rectificationSuccess, setRectificationSuccess] = useState(false);

  // New Application Wizard Form State
  const [formData, setFormData] = useState({
    instituteName: activeInstitute,
    instituteCode: "1-354928101",
    region: "Western Region (Mumbai)",
    city: "Pune",
    state: "Maharashtra",
    applicationType: "Increase in Intake (AI, ML & Data Science)",
    proposedIntake: 120,
    builtUpAreaSqM: 14500,
    landAcres: 5.2,
    cadreRatio: "1:20 (Compliant)"
  });

  // Current active college applications
  const collegeApps = applications.filter(a => a.instituteName.includes("Maharashtra Institute") || a.instituteName.includes(activeInstitute));
  const primaryApp = collegeApps[0] || applications[0];

  // Applications with active deficiency notice
  const deficientApp = applications.find(a => a.currentStage === 'DEFICIENCY') || applications[1];

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    onCreateApplication({
      ...formData,
      requiredAreaSqM: 12000,
      documents: [
        { id: `DOC-NEW-1`, name: "Registered Land Lease Deed", status: "VERIFIED", hash: "9a12c8...44aa" },
        { id: `DOC-NEW-2`, name: "Fire Safety NOC", status: "VERIFIED", hash: "1b88e1...88ee" }
      ]
    });
    alert(`Statutory Application docket successfully submitted to AICTE Western Regional Bureau!`);
    setActiveTab('tracking');
    setWizardStep(1);
  };

  const handleResubmitDeficiency = (e) => {
    e.preventDefault();
    if (!rectificationText.trim()) return;
    onResubmitApplication(deficientApp.id, rectificationText);
    setRectificationSuccess(true);
    setTimeout(() => {
      setRectificationSuccess(false);
      setRectificationText("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Portal Header */}
      <div className="app-card p-6 bg-gradient-navy text-white rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase bg-teal text-navy-900 px-2 py-0.5 rounded font-mono">
              INSTITUTION SELF-SERVICE PORTAL
            </span>
            <span className="text-xs text-slate-300">• Permanent Code: 1-354928101</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{activeInstitute}</h1>
          <p className="text-xs text-slate-300 mt-1">
            Autonomous Technical Campus • Western Regional Bureau • AICTE Approval Cycle 2026–27
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 bg-navy-800 p-1.5 rounded-lg border border-navy-700 text-xs overflow-x-auto max-w-full whitespace-nowrap">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'dashboard' ? 'bg-primary text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'wizard' ? 'bg-primary text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            New Application
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'tracking' ? 'bg-primary text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            Track Status
          </button>
          <button
            onClick={() => setActiveTab('deficiencies')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'deficiencies' ? 'bg-amber-600 text-white shadow-sm' : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            Deficiency Notices
          </button>
        </div>
      </div>

      {/* View 1: Institution Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="app-card p-4 border-l-4 border-l-primary">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Active Submissions</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{collegeApps.length || 1}</div>
              <div className="text-[10px] text-slate-400 mt-1">Cycle 2026-27</div>
            </div>
            <div className="app-card p-4 border-l-4 border-l-emerald-500">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Compliance Score</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">98.4%</div>
              <div className="text-[10px] text-emerald-600 font-medium mt-1">Statutory Norms Met</div>
            </div>
            <div className="app-card p-4 border-l-4 border-l-amber-500">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Upcoming Expiry</div>
              <div className="text-2xl font-bold text-amber-600 mt-1">18 Days</div>
              <div className="text-[10px] text-amber-600 mt-1">Land Lease Deed</div>
            </div>
            <div className="app-card p-4 border-l-4 border-l-purple-500">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">EVC Inspection</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">27 Oct 2026</div>
              <div className="text-[10px] text-purple-600 mt-1">Committee Lead Assigned</div>
            </div>
          </div>

          {/* Active Docket Card */}
          <div className="app-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-primary">{primaryApp.id}</span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">{primaryApp.applicationType}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Current Stage: {primaryApp.currentStage}
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-2">
              <div className="text-xs font-semibold text-slate-600 mb-2">Statutory Approval Progression</div>
              <div className="flex items-center justify-between gap-1 text-[11px]">
                {['SUBMISSION', 'SCRUTINY', 'EVC_QUEUE', 'SAC_FINAL', 'APPROVED'].map((st, i) => {
                  const isDone = i <= 1;
                  const isCurrent = (st === primaryApp.currentStage) || (i === 1);
                  return (
                    <div key={st} className="flex-1 text-center">
                      <div className={`h-2 rounded-full mb-1.5 ${isDone ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                      <span className={`font-medium ${isCurrent ? 'text-primary font-bold' : 'text-slate-400'}`}>
                        {st.replace('_', ' ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Multi-Step Application Wizard */}
      {activeTab === 'wizard' && (
        <div className="app-card p-6 space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">New Technical Application Filing Wizard</h3>
              <span className="text-xs font-semibold text-slate-500">Step {wizardStep} of 4</span>
            </div>
            {/* Steps indicator */}
            <div className="flex items-center gap-2 mt-3">
              {['Campus Basics', 'Academic Intake', 'Infrastructure Norms', 'Document Uploads'].map((s, idx) => (
                <div key={s} className="flex-1">
                  <div className={`h-1.5 rounded-full ${idx + 1 <= wizardStep ? 'bg-primary' : 'bg-slate-200'}`} />
                  <span className={`text-[10px] mt-1 block ${idx + 1 === wizardStep ? 'font-bold text-primary' : 'text-slate-400'}`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleWizardSubmit} className="space-y-4">
            {wizardStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institution Name</label>
                  <input
                    type="text"
                    value={formData.instituteName}
                    onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Permanent AICTE Code</label>
                  <input
                    type="text"
                    value={formData.instituteCode}
                    disabled
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Regional Bureau</label>
                  <input
                    type="text"
                    value={formData.region}
                    disabled
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Category</label>
                  <select
                    value={formData.applicationType}
                    onChange={(e) => setFormData({ ...formData, applicationType: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option>Increase in Intake (AI, ML & Data Science)</option>
                    <option>New Technical Campus Approval</option>
                    <option>Extension of Approval (EoA 2026-27)</option>
                    <option>Introduction of Supernumerary Seats</option>
                  </select>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Proposed Additional Intake (Seats)</label>
                  <input
                    type="number"
                    value={formData.proposedIntake}
                    onChange={(e) => setFormData({ ...formData, proposedIntake: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Faculty-to-Student Cadre Ratio</label>
                  <input
                    type="text"
                    value={formData.cadreRatio}
                    onChange={(e) => setFormData({ ...formData, cadreRatio: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div className="md:col-span-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs">
                  <strong>APH Chapter VII Norm:</strong> Adding AI & ML intake requires dedicated High-Performance Computing (HPC) with at least 60 GPU workstations and valid NBA accreditation.
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Built-up Area (Sq. Meters)</label>
                  <input
                    type="number"
                    value={formData.builtUpAreaSqM}
                    onChange={(e) => setFormData({ ...formData, builtUpAreaSqM: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contiguous Land Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.landAcres}
                    onChange={(e) => setFormData({ ...formData, landAcres: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 text-center hover:border-primary transition-colors bg-slate-50 cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-slate-800">Upload Statutory Evidence Documents</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Drag & drop Land Deed, Fire Safety NOC, and NBA Certificate (PDF up to 25MB)</div>
                  <div className="mt-2 text-[10px] text-teal font-mono">Instant Simulated SHA-256 Cryptographic Sealing Enabled</div>
                </div>

                <div className="space-y-1.5">
                  <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Registered_Land_Lease_Deed_30Yrs.pdf</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">SHA-256 SEALED</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-medium text-slate-700">Fire_Safety_Form5_NOC.pdf</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">SHA-256 SEALED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              {wizardStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(s => s - 1)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Previous Step
                </button>
              ) : <div />}

              {wizardStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep(s => s + 1)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                >
                  Submit Statutory Docket to AICTE
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* View 3: Tracking Stepper */}
      {activeTab === 'tracking' && (
        <div className="app-card p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-primary">{primaryApp.id}</span>
              <h3 className="font-bold text-base text-slate-900">{primaryApp.applicationType}</h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-50 text-primary font-bold text-xs border border-blue-200">
              SLA: {primaryApp.slaStatus}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Statutory Audit Timeline</h4>
            <div className="space-y-3 relative pl-6 border-l-2 border-slate-200">
              {primaryApp.timeline.map((evt, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white" />
                  <div className="text-xs font-bold text-slate-800">{evt.stage}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{evt.note}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">By {evt.actor} • {new Date(evt.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 4: Deficiency Correction & Resubmission */}
      {activeTab === 'deficiencies' && (
        <div className="app-card p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-amber-600">{deficientApp.id}</span>
              <h3 className="font-bold text-base text-slate-900">Deficiency Rectification Desk</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              10-Day Window Active
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>AICTE Scrutiny Committee Official Notice</span>
            </div>
            <p className="text-xs text-amber-800">
              {deficientApp.revertReason || "Cadre ratio deficient: Faculty to student ratio does not satisfy 1:20 norm as per APH Chapter III Clause 3.4.1."}
            </p>
          </div>

          {rectificationSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Rectification response & corrected proofs successfully submitted! Application transitioned to Reverification stage.</span>
            </div>
          ) : (
            <form onSubmit={handleResubmitDeficiency} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institutional Rectification Explanation <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rectificationText}
                  onChange={(e) => setRectificationText(e.target.value)}
                  placeholder="Detail the corrective actions taken (e.g. Appointment orders issued for 2 Associate Professors, updated biometric roster attached)..."
                  rows={3}
                  required
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-xs">
                <span className="font-medium text-slate-700">Attach Corrected Statutory Documents (Form-B, Appointed Faculty Roster)</span>
              </div>

              <button
                type="submit"
                disabled={!rectificationText.trim()}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-40 shadow-sm"
              >
                Submit Rectification to Scrutiny Committee
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
