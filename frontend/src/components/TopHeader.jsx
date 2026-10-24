import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  UserCheck, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function TopHeader({ 
  activeRole, 
  setActiveRole, 
  notifications = [], 
  onMarkNotificationRead, 
  onResetDemo, 
  searchQuery, 
  setSearchQuery,
  setCurrentView
}) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const ROLES = [
    { id: 'SUPER_ADMIN', label: 'Super Administrator', sub: 'National HQ Member Secretary', badge: 'Apex' },
    { id: 'REGIONAL_HEAD', label: 'Regional Head (Western)', sub: 'Dr. R.K. Srivastava (Mumbai)', badge: 'Regional' },
    { id: 'SCRUTINY_OFFICER', label: 'Scrutiny Officer', sub: 'Er. Sunita Verma (Civil & Labs)', badge: 'Evaluator' },
    { id: 'INSTITUTION_USER', label: 'Institution User', sub: 'Registrar (MIT Pune)', badge: 'Applicant' },
    { id: 'EVC_MEMBER', label: 'EVC Committee Lead', sub: 'Prof. B.N. Mukherjee (Emeritus)', badge: 'Inspector' }
  ];

  const currentRoleObj = ROLES.find(r => r.id === activeRole) || ROLES[1];

  const handleReset = async () => {
    if (window.confirm("Restore the SIH 2026 demonstration environment to its pristine seeded state?")) {
      setIsResetting(true);
      await onResetDemo();
      setIsResetting(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-app-border px-6 flex items-center justify-between shadow-nav select-none z-30 sticky top-0">
      {/* Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Docket ID (e.g. 9401), Institution, or Region..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Hackathon Badge */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span>SIH 2026 • SIH26262 • Team StrataX</span>
        </div>

        {/* Demo Reset Button */}
        <button
          onClick={handleReset}
          disabled={isResetting}
          title="Reset demonstration data to initial state"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg bg-white transition-all shadow-sm"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-slate-500 ${isResetting ? 'animate-spin text-primary' : ''}`} />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-app-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-modal p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-semibold text-slate-800">Omnichannel Alerts</span>
                <span className="text-[10px] text-teal font-medium cursor-pointer" onClick={() => setCurrentView('notifications')}>
                  View All ({notifications.length})
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.slice(0, 4).map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => { onMarkNotificationRead(n.id); setShowNotifDropdown(false); setCurrentView('notifications'); }}
                    className={`p-2 rounded-lg border cursor-pointer transition-all ${
                      n.read ? 'bg-slate-50 border-slate-100' : 'bg-blue-50/50 border-blue-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800 truncate">{n.title}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 font-mono">{n.channel}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{n.message}</p>
                    <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
                      <span>{n.recipient}</span>
                      <span className="text-emerald-600">{n.deliveryStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher (Crucial for SIH Evaluators) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
              {currentRoleObj.label.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-semibold text-slate-800 leading-none">{currentRoleObj.label}</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{currentRoleObj.sub}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-modal p-2 z-50 text-xs">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Switch Perspective (SIH Demo)
              </div>
              <div className="space-y-1">
                {ROLES.map(role => (
                  <button
                    key={role.id}
                    onClick={() => { setActiveRole(role.id); setShowRoleDropdown(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      activeRole === role.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs">{role.label}</div>
                      <div className="text-[10px] text-slate-500">{role.sub}</div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      {role.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
