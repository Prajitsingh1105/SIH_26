import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid 
} from 'recharts';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowUpRight, 
  Layers, 
  TrendingUp,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function OverviewDashboard({ 
  applications = [], 
  onSelectApplication, 
  setCurrentView 
}) {
  const totalApps = applications.length;
  const underReview = applications.filter(a => a.currentStage === 'SCRUTINY' || a.currentStage === 'REVERIFICATION').length;
  const awaitingResponse = applications.filter(a => a.currentStage === 'DEFICIENCY').length;
  const awaitingEvc = applications.filter(a => a.currentStage === 'EVC_QUEUE' || a.currentStage === 'EVC_VISIT').length;
  const approved = applications.filter(a => a.currentStage === 'APPROVED').length;
  const slaWarning = applications.filter(a => a.slaStatus === 'WARNING').length;
  const slaBreached = applications.filter(a => a.slaStatus === 'BREACHED').length;

  // Chart data: Stage breakdown
  const stageData = [
    { name: 'Scrutiny', count: applications.filter(a => a.currentStage === 'SCRUTINY').length },
    { name: 'Deficiency', count: awaitingResponse },
    { name: 'Reverify', count: applications.filter(a => a.currentStage === 'REVERIFICATION').length },
    { name: 'EVC Queue', count: applications.filter(a => a.currentStage === 'EVC_QUEUE').length },
    { name: 'EVC Visit', count: applications.filter(a => a.currentStage === 'EVC_VISIT').length },
    { name: 'SAC Final', count: applications.filter(a => a.currentStage === 'SAC_FINAL').length },
    { name: 'Approved', count: approved },
  ];

  // SLA Pie Chart
  const slaData = [
    { name: 'On Track', value: totalApps - slaWarning - slaBreached, color: '#16A34A' },
    { name: 'Warning (<4d)', value: slaWarning, color: '#F59E0B' },
    { name: 'SLA Breached', value: slaBreached, color: '#DC2626' }
  ];

  // Region breakdown
  const regionCounts = {};
  applications.forEach(a => {
    const reg = a.region.split(' ')[0];
    regionCounts[reg] = (regionCounts[reg] || 0) + 1;
  });
  const regionData = Object.keys(regionCounts).map(k => ({ region: k, count: regionCounts[k] }));

  // Critical files
  const priorityFiles = applications
    .filter(a => a.slaStatus === 'BREACHED' || a.slaStatus === 'WARNING' || a.currentStage === 'DEFICIENCY')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="app-card bg-gradient-header text-white p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/20 uppercase tracking-wider text-cyan-accent">
              Statutory Executive Dashboard
            </span>
            <span className="text-xs text-slate-300">• Approval Cycle 2026–27</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AICTE National Workflow & Pendency Monitor
          </h1>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            Real-time compliance monitoring, automated SLA escalation engine, and EVC logistical dispatch tracking across all technical institutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('sih_demo')}
            className="px-3.5 py-2 rounded-lg bg-teal hover:bg-teal-light text-navy-900 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Run SIH Demo Scenarios</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="app-card p-3.5 border-l-4 border-l-primary">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Dockets</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalApps}</div>
          <div className="text-[10px] text-slate-400 mt-1">Across 7 Regions</div>
        </div>

        <div className="app-card p-3.5 border-l-4 border-l-blue-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Under Review</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{underReview}</div>
          <div className="text-[10px] text-slate-400 mt-1">Scrutiny & Reverif</div>
        </div>

        <div className="app-card p-3.5 border-l-4 border-l-amber-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Deficiency Queue</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{awaitingResponse}</div>
          <div className="text-[10px] text-amber-600 font-medium mt-1">Action at College</div>
        </div>

        <div className="app-card p-3.5 border-l-4 border-l-purple-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Awaiting EVC</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">{awaitingEvc}</div>
          <div className="text-[10px] text-slate-400 mt-1">Inspection Ready</div>
        </div>

        <div className="app-card p-3.5 border-l-4 border-l-emerald-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Sanctioned (LoA)</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{approved}</div>
          <div className="text-[10px] text-slate-400 mt-1">Approval Granted</div>
        </div>

        <div className="app-card p-3.5 border-l-4 border-l-yellow-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">SLA Warning</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">{slaWarning}</div>
          <div className="text-[10px] text-yellow-600 mt-1">&lt;4 Days Remaining</div>
        </div>

        <div className="app-card p-3.5 border-l-4 border-l-red-500 bg-red-50/30">
          <div className="text-[11px] font-semibold text-red-600 uppercase">SLA Breached</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{slaBreached}</div>
          <div className="text-[10px] text-red-500 font-medium mt-1">Statutory Escalated</div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Stage Bar Chart */}
        <div className="app-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">Dockets by Workflow Stage</h3>
              <p className="text-xs text-slate-400">Distribution across current active lifecycle phases</p>
            </div>
            <button 
              onClick={() => setCurrentView('workflow_monitor')} 
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>View DAG</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SLA Donut Chart */}
        <div className="app-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">SLA Statutory Health</h3>
              <p className="text-xs text-slate-400">Compliance & breach distribution</p>
            </div>
            <button 
              onClick={() => setCurrentView('sla_escalations')} 
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={slaData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={50} 
                  outerRadius={75} 
                  paddingAngle={4}
                >
                  {slaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-center text-xs pt-2 border-t border-slate-100">
            {slaData.map(item => (
              <div key={item.name}>
                <div className="font-bold text-slate-800">{item.value}</div>
                <div className="text-[10px] text-slate-400">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Escalations Table */}
      <div className="app-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm text-slate-800">High-Priority & Escalated Dockets</h3>
            <p className="text-xs text-slate-400">Applications requiring immediate administrative intervention</p>
          </div>
          <button 
            onClick={() => setCurrentView('applications')}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All 105 Applications</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Docket ID</th>
                <th className="py-2.5 px-3">Institution</th>
                <th className="py-2.5 px-3">Region</th>
                <th className="py-2.5 px-3">Current Stage</th>
                <th className="py-2.5 px-3">SLA Status</th>
                <th className="py-2.5 px-3">Assigned Officer</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priorityFiles.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-primary">
                    {app.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-900">{app.instituteName}</div>
                    <div className="text-[10px] text-slate-400">{app.applicationType}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{app.region}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {app.currentStage}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      app.slaStatus === 'BREACHED' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {app.slaStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {app.assignedOfficer}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectApplication(app)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                    >
                      Inspect File
                    </button>
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
