import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  Filter, 
  Download,
  Building2,
  Calendar,
  XCircle
} from 'lucide-react';
import { REGIONS } from '../services/mockData';

export default function ComplianceCenter({ 
  complianceDocs = [], 
  onVerifyDocument 
}) {
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [verifiedToast, setVerifiedToast] = useState(null);

  const filteredDocs = complianceDocs.filter(d => {
    if (search) {
      const s = search.toLowerCase();
      if (!d.institutionName.toLowerCase().includes(s) && !d.documentType.toLowerCase().includes(s)) return false;
    }
    if (categoryFilter !== 'ALL' && d.category !== categoryFilter) return false;
    if (regionFilter !== 'ALL' && d.region !== regionFilter) return false;
    return true;
  });

  const validCount = complianceDocs.filter(d => d.category === 'VALID').length;
  const expiring30Count = complianceDocs.filter(d => d.category === 'EXPIRING_30_DAYS').length;
  const expiring7Count = complianceDocs.filter(d => d.category === 'EXPIRING_7_DAYS').length;
  const expiredCount = complianceDocs.filter(d => d.category === 'EXPIRED').length;

  const handleVerify = (docId) => {
    onVerifyDocument(docId, "Dr. R.K. Srivastava");
    setVerifiedToast(`Document ${docId} verified successfully and recorded in audit ledger!`);
    setTimeout(() => setVerifiedToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Compliance & Statutory Expiry Monitoring Center</h2>
          <p className="text-xs text-slate-500">
            Automated background tracking of mandatory institution certifications, renewal windows, and fire/safety NOC expirations.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="app-card p-4 border-l-4 border-l-emerald-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Valid Certifications</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{validCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Full Statutory Compliance</div>
        </div>
        <div className="app-card p-4 border-l-4 border-l-yellow-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Expiring &lt;30 Days</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">{expiring30Count}</div>
          <div className="text-[10px] text-yellow-600 mt-1">Statutory Notice Active</div>
        </div>
        <div className="app-card p-4 border-l-4 border-l-amber-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Expiring &lt;7 Days</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{expiring7Count}</div>
          <div className="text-[10px] text-amber-600 mt-1">High-Priority Alert</div>
        </div>
        <div className="app-card p-4 border-l-4 border-l-red-500 bg-red-50/20">
          <div className="text-[11px] font-semibold text-red-600 uppercase">Expired Certifications</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{expiredCount}</div>
          <div className="text-[10px] text-red-500 font-medium mt-1">Action Mandated</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="app-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institution or document type..."
            className="text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
          >
            <option value="ALL">All Expiry Categories ({complianceDocs.length})</option>
            <option value="EXPIRING_30_DAYS">Expiring in 30 Days</option>
            <option value="EXPIRING_7_DAYS">Expiring in 7 Days</option>
            <option value="EXPIRED">Expired</option>
            <option value="VALID">Valid</option>
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
          >
            <option value="ALL">All Regions</option>
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {verifiedToast && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{verifiedToast}</span>
        </div>
      )}

      {/* Document Records Table */}
      <div className="app-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Doc ID</th>
                <th className="py-3 px-3">Institution</th>
                <th className="py-3 px-3">Document Type</th>
                <th className="py-3 px-3">Expiry Date</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Verification Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-primary">
                    {doc.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{doc.institutionName}</div>
                    <div className="text-[10px] text-slate-400">{doc.region}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {doc.documentType}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {new Date(doc.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      doc.category === 'EXPIRED' ? 'bg-red-100 text-red-700' :
                      doc.category === 'EXPIRING_7_DAYS' ? 'bg-amber-100 text-amber-800' :
                      doc.category === 'EXPIRING_30_DAYS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {doc.category.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {doc.verificationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {doc.verificationStatus !== 'VERIFIED' ? (
                      <button
                        onClick={() => handleVerify(doc.id)}
                        className="px-2.5 py-1 rounded bg-primary text-white hover:bg-primary-hover font-semibold text-[11px] transition-colors"
                      >
                        Verify Now
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-medium">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
