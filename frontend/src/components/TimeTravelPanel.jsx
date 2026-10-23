import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FastForward, 
  RotateCcw, 
  Clock, 
  X, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function TimeTravelPanel({ 
  simulationState, 
  onFastForward, 
  onResetSimulation 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async (days = 30) => {
    setLoading(true);
    try {
      await onFastForward(days);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      await onResetSimulation();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      
      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-all shadow-lg border ${
          simulationState?.isSimulated
            ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
            : 'bg-zinc-900 text-zinc-300 hover:text-white border-white/10 hover:border-white/20'
        }`}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
        <span>Timeline Simulation</span>
        {simulationState?.isSimulated && (
          <span className="font-mono text-[10px] text-amber-400">
            +{simulationState.daysForwarded}d
          </span>
        )}
        {isOpen ? <ChevronDown className="w-3 h-3 text-zinc-500" /> : <ChevronUp className="w-3 h-3 text-zinc-500" />}
      </button>

      {/* Flyout Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute bottom-11 left-0 w-80 rounded-xl bg-zinc-900 border border-white/10 p-4 shadow-2xl text-left overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <h4 className="text-xs font-semibold text-zinc-200">
                  Timeline Simulator
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
              Fast-forward by 30 days to demonstrate statutory lease expirations, automated SLA breaches, and SMS escalation dispatches.
            </p>

            <div className="my-3 p-2.5 rounded-lg bg-zinc-950/60 border border-white/[0.04] space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between text-zinc-500">
                <span>Offset:</span>
                <span className={simulationState?.isSimulated ? "text-amber-400" : "text-zinc-400"}>
                  +{simulationState?.daysForwarded || 0} Days
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-500">
                <span>Expired Leases:</span>
                <span className={simulationState?.isSimulated ? "text-red-400" : "text-emerald-400"}>
                  {simulationState?.isSimulated ? "3 Detected" : "None"}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <button
                disabled={loading}
                onClick={() => handleSimulate(30)}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Simulate: Fast Forward 30 Days</span>
              </button>

              <button
                disabled={loading || !simulationState?.isSimulated}
                onClick={handleReset}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-white/5 flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Real-Time Anchor</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
