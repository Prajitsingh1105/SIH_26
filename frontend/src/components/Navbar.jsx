import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Kanban, 
  FileText, 
  Compass, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Shield
} from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab,
  simulationState,
  ledgerCount
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090B]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Identity - Minimalist Institutional */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white">
                AICTE
              </span>
              <span className="text-zinc-600 font-light">/</span>
              <span className="text-xs text-zinc-300 font-medium">
                Approval Workflow Engine
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-white/5 ml-1">
                2026–27
              </span>
            </div>
          </div>

          {/* Officer Navigation Tabs (Clean Linear Style) */}
          {currentRole === 'OFFICER' && (
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-white/[0.06]">
              <button
                onClick={() => setActiveTab('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'kanban'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                State Machine
              </button>
              
              <button
                onClick={() => setActiveTab('ledger')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'ledger'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Audit Trail
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-400 font-mono border border-white/5">
                  {ledgerCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('clusters')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'clusters'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/5'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                EVC Clusters
              </button>
            </nav>
          )}

          {/* Perspective Switcher & User Pill */}
          <div className="flex items-center gap-3">
            
            {/* Simulation Status Tag */}
            {simulationState?.isSimulated && (
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>+{simulationState.daysForwarded}d Offset</span>
              </div>
            )}

            {/* macOS-style Segmented Control */}
            <div className="flex items-center p-0.5 rounded-xl bg-zinc-900 border border-white/[0.08]">
              <button
                onClick={() => setCurrentRole('COLLEGE')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  currentRole === 'COLLEGE'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/5'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>College View</span>
              </button>

              <button
                onClick={() => setCurrentRole('OFFICER')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  currentRole === 'OFFICER'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/5'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Officer View</span>
              </button>
            </div>

            {/* Profile Pill */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/[0.08]">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[11px] font-medium text-zinc-300">
                {currentRole === 'COLLEGE' ? 'MIT' : 'RS'}
              </div>
              <div className="text-left text-xs leading-none">
                <div className="font-medium text-zinc-200">
                  {currentRole === 'COLLEGE' ? 'MIT & AI Campus' : 'Dr. R.K. Srivastav'}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  {currentRole === 'COLLEGE' ? 'PID: 1-354928101' : 'RO-Western'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
