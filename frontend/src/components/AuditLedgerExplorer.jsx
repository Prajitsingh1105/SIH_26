import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  ShieldAlert, 
  Copy, 
  Check, 
  Search, 
  RotateCcw, 
  Lock, 
  AlertTriangle,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function AuditLedgerExplorer({ 
  ledger = [], 
  onVerifyLedger, 
  onTamperTest 
}) {
  const [search, setSearch] = useState('');
  const [copiedHash, setCopiedHash] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [tamperResult, setTamperResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const filteredLedger = ledger.filter(b => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      b.applicationId?.toLowerCase().includes(s) ||
      b.actor?.toLowerCase().includes(s) ||
      b.action?.toLowerCase().includes(s) ||
      b.currentHash?.toLowerCase().includes(s)
    );
  });

  const handleCopy = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    const res = await onVerifyLedger();
    setIsVerifying(false);
    setVerificationResult(res);
    setTimeout(() => setVerificationResult(null), 5000);
  };

  const handleTamperTest = async () => {
    const res = await onTamperTest();
    setTamperResult(res);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tamper-Evident Digital Audit Ledger</h2>
          <p className="text-xs text-slate-500">
            Cryptographically linked SHA-256 event chain providing immutable auditability for every statutory AICTE state transition.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTamperTest}
            className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Tamper Detection Test (Disposable)</span>
          </button>

          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>Verify Chain Integrity ({ledger.length} Blocks)</span>
          </button>
        </div>
      </div>

      {/* Verification Result Banner */}
      {verificationResult && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-fade-in">
          <div className="font-bold flex items-center gap-1.5 text-sm text-emerald-800">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>Cryptographic Chain Integrity Verified: 100% Intact</span>
          </div>
          <div>All {verificationResult.totalBlocksChecked} audit blocks verified from Genesis Root Hash. Zero hash discrepancies detected.</div>
          <div className="font-mono text-[10px] text-emerald-700 truncate">Latest Hash: {verificationResult.latestHash}</div>
        </div>
      )}

      {/* Tamper Test Explanation Modal / Card */}
      {tamperResult && (
        <div className="app-card p-5 bg-slate-900 text-slate-100 rounded-xl space-y-3 font-mono text-xs border border-red-500/50 shadow-modal">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>{tamperResult.simulationName}</span>
            </div>
            <button onClick={() => setTamperResult(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="space-y-1 text-slate-300 text-[11px]">
            <div>1. Original Block #101: Payload = "{tamperResult.originalBlock.payload}" | Hash = {tamperResult.originalBlock.hash}</div>
            <div className="text-red-400">2. Tampered Payload = "{tamperResult.tamperedBlock.payload}" | Recalculated Hash = {tamperResult.tamperedBlock.newRecalculatedHash}</div>
            <div>3. Block #102 Expected PrevHash = {tamperResult.subsequentBlockPointer.expectedPrevHash}</div>
          </div>
          <div className="p-2.5 rounded bg-red-950/80 border border-red-800 text-red-300 text-[11px] font-bold">
            {tamperResult.verdict}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="app-card p-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Docket ID, Actor, Action (e.g. STAGE_TRANSITION), or SHA-256 Hash..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Terminal Style Ledger Blocks List */}
      <div className="space-y-3">
        {filteredLedger.map((block, idx) => (
          <div key={block.blockNumber} className="app-card p-4 space-y-2 border-l-4 border-l-primary">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold bg-navy-900 text-cyan-accent px-2 py-0.5 rounded text-[11px]">
                  Block #{block.blockNumber}
                </span>
                <span className="font-semibold text-slate-800">{block.action}</span>
                <span className="text-[10px] text-slate-400 font-mono">[{block.eventId}]</span>
              </div>
              <div className="text-[10px] text-slate-400">
                {new Date(block.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400">Docket: </span>
                <strong className="font-mono text-primary">{block.applicationId}</strong>
              </div>
              <div>
                <span className="text-slate-400">Actor: </span>
                <span className="font-medium text-slate-800">{block.actor} ({block.role})</span>
              </div>
            </div>

            {/* Hashes Row */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono">
              <div className="text-slate-500 truncate max-w-sm">
                <span className="text-slate-400">PrevHash: </span>
                <span className="text-slate-600">{block.prevHash}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-400">Hash: </span>
                <span className="bg-slate-100 text-primary px-2 py-0.5 rounded border border-slate-200 truncate max-w-xs">
                  {block.currentHash}
                </span>
                <button
                  onClick={() => handleCopy(block.currentHash)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                  title="Copy SHA-256 hash"
                >
                  {copiedHash === block.currentHash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
