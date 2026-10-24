import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { REGIONS, WORKFLOW_STAGES } from '../services/mockData';

export default function ApplicationManagement({ 
  applications = [], 
  onSelectApplication,
  onApprove,
  onRevert
}) {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [slaFilter, setSlaFilter] = useState('ALL');
  const [sortField, setSortField] = useState('submittedDate');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filtered & Sorted applications
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (search) {
        const s = search.toLowerCase();
        const matches = 
          app.id.toLowerCase().includes(s) || 
          app.instituteName.toLowerCase().includes(s) || 
          app.city.toLowerCase().includes(s) ||
          app.assignedOfficer.toLowerCase().includes(s);
        if (!matches) return false;
      }
      if (regionFilter !== 'ALL' && app.region !== regionFilter) return false;
      if (stageFilter !== 'ALL' && app.currentStage !== stageFilter) return false;
      if (riskFilter !== 'ALL' && app.riskLevel !== riskFilter) return false;
      if (slaFilter !== 'ALL' && app.slaStatus !== slaFilter) return false;
      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [applications, search, regionFilter, stageFilter, riskFilter, slaFilter, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredApps.length / pageSize) || 1;
  const paginatedApps = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredApps.slice(start, start + pageSize);
  }, [filteredApps, page, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Docket ID", "Institute Name", "Region", "Stage", "SLA Status", "Assigned Officer", "Risk Level", "Submitted Date"];
    const rows = filteredApps.map(a => [
      `"${a.id}"`,
      `"${a.instituteName}"`,
      `"${a.region}"`,
      `"${a.currentStage}"`,
      `"${a.slaStatus}"`,
      `"${a.assignedOfficer}"`,
      `"${a.riskLevel}"`,
      `"${new Date(a.submittedDate).toLocaleDateString()}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aicte_applications_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Application Management</h2>
          <p className="text-xs text-slate-500">
            Comprehensive registry of {applications.length} technical education approval dockets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV ({filteredApps.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="app-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search docket ID, institute, city..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Region Filter */}
          <select
            value={regionFilter}
            onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">All Regions (7)</option>
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => { setStageFilter(e.target.value); setPage(1); }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">All Stages</option>
            {WORKFLOW_STAGES.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>

          {/* SLA Filter */}
          <select
            value={slaFilter}
            onChange={(e) => { setSlaFilter(e.target.value); setPage(1); }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">All SLA Statuses</option>
            <option value="ON_TRACK">On Track</option>
            <option value="WARNING">Warning (&lt;4 Days)</option>
            <option value="BREACHED">Breached (Escalated)</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="app-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th onClick={() => handleSort('id')} className="py-3 px-3 cursor-pointer hover:text-slate-800">
                  <div className="flex items-center gap-1">
                    <span>Docket ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => handleSort('instituteName')} className="py-3 px-3 cursor-pointer hover:text-slate-800">
                  <div className="flex items-center gap-1">
                    <span>Institution & Type</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3">Workflow Stage</th>
                <th onClick={() => handleSort('slaDeadline')} className="py-3 px-3 cursor-pointer hover:text-slate-800">
                  <div className="flex items-center gap-1">
                    <span>SLA Deadline</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Officer Assigned</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedApps.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    No applications matching the selected criteria.
                  </td>
                </tr>
              ) : (
                paginatedApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-primary">
                      {app.id}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate">{app.instituteName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{app.applicationType}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {app.city}, {app.region.split(' ')[0]}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        app.currentStage === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                        app.currentStage === 'DEFICIENCY' ? 'bg-amber-100 text-amber-700' :
                        app.currentStage === 'SCRUTINY' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {app.currentStage}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          app.slaStatus === 'BREACHED' ? 'bg-red-500 animate-ping' :
                          app.slaStatus === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <span className="font-medium text-slate-800">
                          {new Date(app.slaDeadline).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold ${
                        app.slaStatus === 'BREACHED' ? 'text-red-600' :
                        app.slaStatus === 'WARNING' ? 'text-amber-600' : 'text-slate-400'
                      }`}>
                        {app.slaStatus === 'BREACHED' ? 'Overdue!' : `${app.slaElapsedPercent}% elapsed`}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                      {app.assignedOfficer}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        app.riskLevel === 'CRITICAL' || app.riskLevel === 'HIGH' 
                          ? 'bg-red-50 text-red-600 border border-red-200' 
                          : app.riskLevel === 'MEDIUM' 
                          ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                          : 'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}>
                        {app.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectApplication(app)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{paginatedApps.length > 0 ? (page - 1) * pageSize + 1 : 0}</span> to <span className="font-semibold text-slate-700">{Math.min(page * pageSize, filteredApps.length)}</span> of <span className="font-semibold text-slate-700">{filteredApps.length}</span> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-slate-700">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
