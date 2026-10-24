import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  GitBranch, 
  Briefcase, 
  Building2, 
  CalendarCheck, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  SlidersHorizontal, 
  TrendingUp, 
  Terminal, 
  Sparkles, 
  Bell, 
  Download, 
  Users, 
  Settings, 
  Zap, 
  Activity,
  Layers,
  Award,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  setCurrentView, 
  activeRole,
  isOpen = false,
  onClose,
  isDesktopCollapsed = false
}) {
  const [openGroups, setOpenGroups] = React.useState({
    core: true,
    logistics: true,
    intelligence: true,
    system: false
  });

  const toggleGroup = (key) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navGroups = [
    {
      key: 'core',
      title: 'CORE WORKFLOW',
      items: [
        { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
        { id: 'applications', label: 'Application Management', icon: FileText, badge: '105' },
        { id: 'workflow_monitor', label: 'Workflow Monitor (DAG)', icon: GitBranch },
        { id: 'officer_workbench', label: 'Officer Workbench', icon: Briefcase },
        { id: 'institution_portal', label: 'Institution Portal', icon: Building2 },
      ]
    },
    {
      key: 'logistics',
      title: 'LOGISTICS & COMPLIANCE',
      items: [
        { id: 'evc_management', label: 'EVC Management & Visits', icon: CalendarCheck, badge: '24' },
        { id: 'compliance_center', label: 'Compliance & Expiry Center', icon: ShieldCheck, badge: '72' },
        { id: 'sla_escalations', label: 'SLA & Escalation Matrix', icon: Clock },
        { id: 'geo_routing', label: 'Geo-Optimized EVC Routing', icon: MapPin },
      ]
    },
    {
      key: 'intelligence',
      title: 'INTELLIGENCE & GOVERNANCE',
      items: [
        { id: 'workload_balancing', label: 'Smart Workload Balancing', icon: SlidersHorizontal },
        { id: 'predictive_analytics', label: 'Predictive Delay Analytics', icon: TrendingUp },
        { id: 'audit_ledger', label: 'Tamper-Evident Audit Ledger', icon: Terminal },
        { id: 'aph_assistant', label: 'APH AI Regulatory Assistant', icon: Sparkles, highlight: true },
      ]
    },
    {
      key: 'system',
      title: 'SYSTEM & ADMINISTRATION',
      items: [
        { id: 'notifications', label: 'Notifications Center', icon: Bell },
        { id: 'reports', label: 'Reports & Exports (CSV)', icon: Download },
        { id: 'user_roles', label: 'User & Role Management', icon: Users },
        { id: 'workflow_config', label: 'Workflow Configuration', icon: Layers },
        { id: 'sla_config', label: 'SLA Policy Configuration', icon: Clock },
        { id: 'integrations', label: 'Integration Settings', icon: Settings },
        { id: 'system_activity', label: 'System Activity Logs', icon: Activity },
      ]
    }
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Drawer on mobile, Persistent on desktop) */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-navy-900 border-r border-navy-800 flex flex-col h-screen text-white select-none shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDesktopCollapsed ? 'lg:hidden' : 'lg:translate-x-0'}`}
      >
        {/* Header Emblem */}
        <div className="p-4 border-b border-navy-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-teal flex items-center justify-center font-bold text-lg text-navy-900 shadow-sm shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">AICTE SOVEREIGN</span>
                <span className="text-[10px] font-semibold uppercase bg-teal/20 text-teal-light px-1.5 py-0.5 rounded">2026</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">Ministry of Education • Gov. of India</p>
            </div>
          </div>

          {/* Close button for Mobile View */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 lg:hidden transition-colors"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action: SIH Demo Scenarios */}
        <div className="p-3 border-b border-navy-800">
          <button
            onClick={() => handleNavClick('sih_demo')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              currentView === 'sih_demo'
                ? 'bg-gradient-teal text-white shadow-teal/20'
                : 'bg-navy-800/80 hover:bg-navy-800 text-teal-light border border-teal/30 hover:border-teal/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-accent" />
              <span>SIH 2026 Demo Scenarios</span>
            </div>
            <span className="text-[10px] bg-navy-900/60 px-1.5 py-0.5 rounded font-mono">8 Demos</span>
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-3 py-2 space-y-4 text-xs overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.key} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.key)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-slate-200 tracking-wider uppercase transition-colors"
              >
                <span>{group.title}</span>
                {openGroups[group.key] ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {openGroups[group.key] && (
                <div className="space-y-0.5 pl-1">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary text-white font-medium shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-teal-light' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                            isActive ? 'bg-navy-900 text-white' : 'bg-navy-800 text-slate-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer System Status */}
        <div className="p-3 bg-navy-950 border-t border-navy-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sovereign Node #01</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">v3.4-SIH26</span>
        </div>
      </aside>
    </>
  );
}
