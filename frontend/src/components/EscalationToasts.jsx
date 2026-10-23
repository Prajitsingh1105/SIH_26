import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Bell, X } from 'lucide-react';

export default function EscalationToasts({ escalations = [], onDismiss }) {
  if (!escalations || escalations.length === 0) return null;

  return (
    <div className="fixed top-16 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-auto">
      <AnimatePresence>
        {escalations.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl text-left"
          >
            {/* Notification Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-300 flex items-center justify-center">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-zinc-200">
                  {item.channel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {onDismiss && (
                  <button
                    onClick={() => onDismiss(item.id)}
                    className="text-zinc-500 hover:text-white p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Recipient */}
            <div className="mt-2 text-[11px] text-zinc-400">
              Recipient: <span className="text-zinc-200 font-medium">{item.recipient}</span>
            </div>

            {/* Notification Body */}
            <div className="mt-1.5 p-2 rounded-lg bg-zinc-950/80 border border-white/[0.04] text-[11px] text-zinc-300 font-mono leading-relaxed">
              {item.message}
            </div>

            <div className="mt-2 text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
              <Bell className="w-3 h-3 text-zinc-500" />
              <span>Statutory notification dispatched</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
