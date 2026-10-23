import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGES = [
  {
    id: 'SCRUTINY',
    title: 'Scrutiny Committee',
    stepNumber: '01',
    description: 'Statutory verification & norms audit',
    dotColor: 'bg-blue-500'
  },
  {
    id: 'EVC_QUEUE',
    title: 'EVC Inspection Queue',
    stepNumber: '02',
    description: 'Expert Visiting Committee dispatch',
    dotColor: 'bg-purple-500'
  },
  {
    id: 'SAC_FINAL',
    title: 'SAC Final Sanction',
    stepNumber: '03',
    description: 'Standing Appellate Committee review',
    dotColor: 'bg-amber-500'
  },
  {
    id: 'APPROVED',
    title: 'Approval Issued (LoA)',
    stepNumber: '04',
    description: 'Letter of Approval sanctioned',
    dotColor: 'bg-emerald-500'
  }
];

export default function StateMachineKanban({ 
  applications, 
  onTransition, 
  onOpenRevertModal, 
  simulationState 
}) {

  const handleApprove = (app) => {
    if (app.currentStage === 'SAC_FINAL') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    onTransition(app.id, 'APPROVE');
  };

  const revertedFiles = applications.filter(a => a.currentStage === 'REVERTED');

  return (
    <div className="space-y-6">

      {/* Deficiency Holding Tray (Clean Linear-style warning) */}
      {revertedFiles.length > 0 && (
        <div className="rounded-2xl bg-zinc-900/80 border border-red-500/20 p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <h4 className="text-xs font-semibold text-zinc-200">
                Deficiency Holding Queue ({revertedFiles.length})
              </h4>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">
              Pending College Rectification Dossier
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {revertedFiles.map(app => (
              <div 
                key={app.id}
                className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-zinc-400">{app.id}</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 text-[10px] font-medium border border-red-500/20">
                      Deficiency Notice
                    </span>
                  </div>
                  <h5 className="text-xs font-medium text-white mt-1.5 line-clamp-1">{app.instituteName}</h5>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {app.revertReason || "Deficiency observed during regulatory check"}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">From: {app.previousStage}</span>
                  <button
                    onClick={() => onTransition(app.id, 'APPROVE')}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-medium transition-all"
                  >
                    Accept Rectification →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {STAGES.map((col) => {
          const colApps = applications.filter(a => a.currentStage === col.id);

          return (
            <div
              key={col.id}
              className="rounded-2xl bg-zinc-900/40 border border-white/[0.06] p-3 flex flex-col min-h-[560px]"
            >
              {/* Column Header */}
              <div className="pb-3 border-b border-white/[0.04] mb-3 px-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <h3 className="text-xs font-semibold text-zinc-200">
                      {col.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded border border-white/5">
                    {colApps.length}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  {col.description}
                </p>
              </div>

              {/* Application Cards Container with smooth Framer Motion layout physics */}
              <div className="space-y-2.5 flex-1">
                <AnimatePresence mode="popLayout">
                  {colApps.map((app) => {
                    const isLeaseExpired = app.hasExpiredLease || (simulationState?.isSimulated && app.landLeaseExpiry && new Date(app.landLeaseExpiry) < new Date(Date.now() + simulationState.daysForwarded * 86400000));
                    const isSlaBreached = app.slaStatus === 'BREACHED';

                    return (
                      <motion.div
                        layout
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 450, 
                          damping: 35,
                          layout: { duration: 0.28 }
                        }}
                        className={`rounded-xl p-3.5 border transition-all ${
                          isLeaseExpired || isSlaBreached
                            ? 'bg-[#181313] border-red-500/40 shadow-sm'
                            : 'bg-[#141417] hover:bg-[#18181D] border-white/[0.07] hover:border-white/[0.14] shadow-bezel'
                        }`}
                      >
                        {/* Header ID & SLA Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[11px] font-medium text-zinc-400">
                            {app.id}
                          </span>

                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSlaBreached
                              ? 'bg-red-500/10 text-red-400 font-semibold border border-red-500/30'
                              : app.slaStatus === 'WARNING'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-zinc-800 text-zinc-400 border border-white/5'
                          }`}>
                            {isSlaBreached ? 'SLA BREACH' : `${app.slaDeadlineDays}d SLA`}
                          </span>
                        </div>

                        {/* Institute Name & Application Type */}
                        <h4 className="text-xs font-semibold text-zinc-100 mt-2 leading-snug">
                          {app.instituteName}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                          {app.applicationType}
                        </p>

                        {/* Metadata Footer */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.04] space-y-1.5 text-[11px]">
                          {isLeaseExpired && (
                            <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-mono font-medium">
                              <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                              <span>Land Lease Expired ({'>'} 30 Days)</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-zinc-500 text-[10px] font-mono">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-zinc-600" />
                              {app.evcCluster || 'Western Hub'}
                            </span>
                            <span className="text-zinc-400">
                              FSR: {app.cadreRatio.split(' ')[0]}
                            </span>
                          </div>
                        </div>

                        {/* State Transition Actions */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center gap-2">
                          {col.id !== 'APPROVED' ? (
                            <>
                              <button
                                onClick={() => onOpenRevertModal(app)}
                                className="px-2 py-1 rounded-lg bg-zinc-800/80 hover:bg-red-950/40 hover:text-red-300 text-zinc-400 text-xs font-medium border border-white/5 hover:border-red-500/20 transition-all flex items-center gap-1"
                                title="Revert with deficiency notice"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Revert</span>
                              </button>

                              <button
                                onClick={() => handleApprove(app)}
                                className={`flex-1 py-1 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                                  col.id === 'SAC_FINAL'
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                                    : 'bg-zinc-200 hover:bg-white text-zinc-900 shadow-sm font-semibold'
                                }`}
                              >
                                {col.id === 'SAC_FINAL' ? (
                                  <>
                                    <Award className="w-3.5 h-3.5" />
                                    <span>Sanction LoA</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Approve</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            </>
                          ) : (
                            <div className="w-full py-1 px-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center justify-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>LoA Formally Sanctioned</span>
                            </div>
                          )}
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {colApps.length === 0 && (
                  <div className="h-28 rounded-xl border border-dashed border-white/[0.04] flex items-center justify-center text-zinc-600 text-xs font-mono">
                    Empty queue
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
