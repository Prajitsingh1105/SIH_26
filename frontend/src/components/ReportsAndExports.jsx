import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Table, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { REGIONS, WORKFLOW_STAGES } from '../services/mockData';

export default function ReportsAndExports({ applications = [], officers = [], complianceDocs = [] }) {
  const [selectedReport, setSelectedReport] = useState('pendency');

  const downloadCSV = (title, headers, rows) => {
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aicte_${title}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportApplications = () => {
    const headers = ["Docket_ID", "Institute_Name", "Region", "Stage", "SLA_Status", "Assigned_Officer", "Risk_Level"];
    const rows = applications.map(a => [
      `"${a.id}"`, `"${a.instituteName}"`, `"${a.region}"`, `"${a.currentStage}"`, `"${a.slaStatus}"`, `"${a.assignedOfficer}"`, `"${a.riskLevel}"`
    ]);
    downloadCSV("applications_pendency_report", headers, rows);
  };

  const handleExportOfficers = () => {
    const headers = ["Officer_ID", "Name", "Region", "Expertise", "Active_Dockets", "Max_Capacity", "Availability"];
    const rows = officers.map(o => [
      `"${o.id}"`, `"${o.name}"`, `"${o.region}"`, `"${o.expertise}"`, o.activeDockets, o.maxCapacity, `"${o.availability}"`
    ]);
    downloadCSV("evaluator_workload_report", headers, rows);
  };

  const handleExportCompliance = () => {
    const headers = ["Document_ID", "Institute_Name", "Document_Type", "Expiry_Date", "Category", "Verification_Status"];
    const rows = complianceDocs.map(d => [
      `"${d.id}"`, `"${d.institutionName}"`, `"${d.documentType}"`, `"${d.expiryDate}"`, `"${d.category}"`, `"${d.verificationStatus}"`
    ]);
    downloadCSV("compliance_document_expiry_report", headers, rows);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Official Reports & Statutory Data Exports</h2>
        <p className="text-xs text-slate-500">
          Export verified government-grade CSV and tabular data summaries across applications, evaluator rosters, and compliance validity.
        </p>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="app-card p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-primary w-fit mb-2">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Application Pendency & SLA Compliance</h3>
            <p className="text-xs text-slate-500 mt-1">
              Complete data table of all 105 active applications across 7 regional bureaus including stage durations, SLA warnings, and breaches.
            </p>
          </div>
          <button
            onClick={handleExportApplications}
            className="w-full py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (105 Records)</span>
          </button>
        </div>

        <div className="app-card p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="p-2.5 rounded-lg bg-teal/10 text-teal w-fit mb-2">
              <Table className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Evaluator Workload & Capacity Roster</h3>
            <p className="text-xs text-slate-500 mt-1">
              Roster of 14 Scrutiny Officers, active docket burdens, capacity utilization percentages, and domain specializations.
            </p>
          </div>
          <button
            onClick={handleExportOfficers}
            className="w-full py-2 rounded-lg bg-teal hover:bg-teal-light text-navy-900 font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (14 Evaluators)</span>
          </button>
        </div>

        <div className="app-card p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 w-fit mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Compliance & Document Expiry Schedule</h3>
            <p className="text-xs text-slate-500 mt-1">
              72 institutional certificates categorized by 30-day, 7-day, and expired statutory renewal deadlines.
            </p>
          </div>
          <button
            onClick={handleExportCompliance}
            className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (72 Documents)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
