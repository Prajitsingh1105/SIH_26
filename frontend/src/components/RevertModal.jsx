import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

const COMMON_DEFICIENCIES = [
  "Cadre Imbalance: Mandatory 1:20 ratio violated (Assistant/Associate Professor shortage)",
  "Registered Land Lease expired or tenure < 30 years as per Chapter II Clause 2.1.3",
  "Fire Safety NOC (Form-5) expired or pending verification from State Fire Department",
  "Barrier-free infrastructure deficient: Ramps gradient exceeds 1:12 or Divyangjan washrooms missing",
  "High-Performance Computing (HPC) Lab with 60 GPU workstations not verified for AI/ML intake"
];

export default function RevertModal({ isOpen, onClose, application, onConfirmRevert }) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !application) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsSubmitting(true);
    try {
      await onConfirmRevert(application.id, reason);
      setReason('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          className="relative w-full max-w-lg rounded-2xl bg-[#141417] border border-white/10 p-5 shadow-2xl text-left overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Issue Deficiency Notice</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Application: <span className="text-zinc-200 font-mono">{application.id}</span> • {application.instituteName}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {/* Quick clauses */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                Standard APH Deficiency Clauses
              </label>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {COMMON_DEFICIENCIES.map((def, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setReason(def)}
                    className="w-full text-left p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 hover:text-white transition-colors flex items-center justify-between border border-white/[0.04]"
                  >
                    <span className="line-clamp-1">{def}</span>
                    <span className="text-zinc-500 text-[10px] uppercase font-mono ml-2 shrink-0">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Required Rejection Textarea */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                Deficiency Rationale <span className="text-red-400">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="State the non-compliant parameters or missing documents under APH handbook..."
                rows={3}
                required
                className="w-full rounded-xl bg-zinc-950 border border-white/10 focus:border-white/20 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none resize-none transition-colors"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                Recorded into the immutable audit ledger. College is granted a 10-day appeal window.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white text-xs font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!reason.trim() || isSubmitting}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-all disabled:opacity-40"
              >
                {isSubmitting ? 'Reverting...' : 'Confirm Reversion'}
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
