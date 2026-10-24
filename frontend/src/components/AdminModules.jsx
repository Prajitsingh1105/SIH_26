import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  Clock, 
  Settings, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Server,
  Lock,
  Mail,
  Smartphone,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../services/mockData';

export default function AdminModules({ viewType = 'user_roles' }) {
  const [stages, setStages] = useState(WORKFLOW_STAGES);

  // 1. User & Role Management View
  if (viewType === 'user_roles') {
    const users = [
      { id: 'USR-01', name: 'National Member Secretary', role: 'SUPER_ADMIN', email: 'secretary@aicte-india.org', bureau: 'National HQ New Delhi', status: 'ACTIVE' },
      { id: 'USR-02', name: 'Dr. R.K. Srivastava', role: 'REGIONAL_HEAD', email: 'ro.western@aicte-india.org', bureau: 'Western Bureau (Mumbai)', status: 'ACTIVE' },
      { id: 'USR-03', name: 'Er. Sunita Verma', role: 'SCRUTINY_OFFICER', email: 'sunita.verma@aicte-india.org', bureau: 'Western Bureau Scrutiny Cell', status: 'ACTIVE' },
      { id: 'USR-04', name: 'Dr. V.D. Karad (Registrar)', role: 'INSTITUTION_USER', email: 'registrar@mit-ai.edu.in', bureau: 'MIT & AI Campus Pune', status: 'ACTIVE' },
      { id: 'USR-05', name: 'Prof. B.N. Mukherjee', role: 'EVC_MEMBER', email: 'bn.mukherjee@iitb.ac.in', bureau: 'IIT Bombay Emeritus / EVC Lead', status: 'ACTIVE' },
      { id: 'USR-06', name: 'Dr. Arvind Joshi', role: 'SCRUTINY_OFFICER', email: 'arvind.joshi@aicte-india.org', bureau: 'Northern Bureau (New Delhi)', status: 'ACTIVE' }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">User & Role-Based Access Control (RBAC)</h2>
          <p className="text-xs text-slate-500">
            Administrative governance enforcing least-privilege security policies across national, regional, evaluator, and institutional actors.
          </p>
        </div>

        <div className="app-card overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">User ID</th>
                <th className="py-3 px-3">Full Name</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Affiliation / Bureau</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-medium text-primary">{u.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{u.name}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-primary font-bold text-[10px]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{u.bureau}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 2. Workflow Configuration View
  if (viewType === 'workflow_config') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Workflow Stage Engine Configuration</h2>
          <p className="text-xs text-slate-500">
            Configure statutory state machine sequence, ownership roles, and default SLA durations for the 2026-27 cycle.
          </p>
        </div>

        <div className="app-card overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Order</th>
                <th className="py-3 px-3">Stage Key</th>
                <th className="py-3 px-3">Public Label</th>
                <th className="py-3 px-3">Owning Stakeholder</th>
                <th className="py-3 px-3">SLA Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stages.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono text-slate-400">#{idx + 1}</td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">{s.id}</td>
                  <td className="py-3 px-3 font-medium text-slate-800">{s.label}</td>
                  <td className="py-3 px-3 text-slate-600">{s.owner}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{s.slaDays} Days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3. SLA Policy Configuration
  if (viewType === 'sla_config') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">SLA Escalation Policy Thresholds</h2>
          <p className="text-xs text-slate-500">
            Configure automated BullMQ delayed escalation thresholds, authority routing, and notification matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="app-card p-5 space-y-2 border-t-4 border-t-blue-500">
            <h3 className="font-bold text-sm text-slate-900">Tier 1 Threshold: 75%</h3>
            <p className="text-xs text-slate-500">Triggers visual advisory badge in officer queue.</p>
            <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded">
              Channel: In-App Banner • Recipient: Reviewing Officer
            </div>
          </div>

          <div className="app-card p-5 space-y-2 border-t-4 border-t-amber-500">
            <h3 className="font-bold text-sm text-slate-900">Tier 2 Threshold: 90%</h3>
            <p className="text-xs text-slate-500">Triggers urgent multi-channel dispatch.</p>
            <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded">
              Channel: SMS + WhatsApp • Recipient: Officer + Regional Head
            </div>
          </div>

          <div className="app-card p-5 space-y-2 border-t-4 border-t-red-500">
            <h3 className="font-bold text-sm text-slate-900">Tier 3 Threshold: 100% (Breach)</h3>
            <p className="text-xs text-slate-500">Cryptographic audit log and statutory escalation.</p>
            <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded">
              Channel: SMS + Email • Recipient: AICTE Member Secretary
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Integration Settings (Distinguishing Live vs Simulated)
  if (viewType === 'integrations') {
    const adapters = [
      { name: 'PostgreSQL & PostGIS Database', type: 'Primary Relational & Geospatial Store', mode: 'LIVE / DETERMINISTIC FALLBACK', status: 'CONNECTED', icon: Server },
      { name: 'Gemini 1.5 Pro (APH RAG Assistant)', type: 'Google Deepmind AI Model', mode: 'SIMULATED DEMO ADAPTER', status: 'DEMO READY', icon: Sparkles },
      { name: 'Twilio SMS Gateway', type: 'Omnichannel Mobile Dispatch', mode: 'SIMULATED ADAPTER', status: 'SANDBOX ACTIVE', icon: Smartphone },
      { name: 'Meta WhatsApp Cloud API', type: 'Instant Regulatory Notification', mode: 'SIMULATED ADAPTER', status: 'SANDBOX ACTIVE', icon: MessageSquare },
      { name: 'Nodemailer SMTP Relay', type: 'Statutory Email Service', mode: 'SIMULATED ADAPTER', status: 'SANDBOX ACTIVE', icon: Mail },
      { name: 'Cryptographic SHA-256 Engine', type: 'Node.js Crypto Native Module', mode: 'LIVE IMPLEMENTATION', status: 'VERIFIED', icon: Lock }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Integration Settings & Provider Adapters</h2>
          <p className="text-xs text-slate-500">
            Official system connectivity status distinguishing Live versus Simulated demonstration adapters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adapters.map((ad, idx) => {
            const Icon = ad.icon;
            return (
              <div key={idx} className="app-card p-4 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 truncate">{ad.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {ad.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{ad.type}</div>
                  <div className="mt-2 text-[10px] font-mono text-teal font-semibold">
                    Mode: {ad.mode}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 5. System Activity Logs
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Activity & Security Logs</h2>
        <p className="text-xs text-slate-500">
          Continuous runtime health heartbeat and administrative audit logging.
        </p>
      </div>

      <div className="app-card p-5 space-y-3 font-mono text-xs text-slate-700">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <span className="font-bold text-slate-800">Event Stream (Recent 5)</span>
          <span className="text-emerald-600 font-bold">● Node Cluster Healthy</span>
        </div>

        <div className="space-y-2">
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            [2026-10-24T14:40:12Z] [AUTH_CHECK] JWT bearer token validated for Dr. R.K. Srivastava (Western Bureau).
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            [2026-10-24T14:38:00Z] [SLA_CRON] BullMQ scheduled job inspected 105 active dockets. 0 critical breaches unacknowledged.
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            [2026-10-24T14:35:19Z] [AUDIT_BLOCK] Block #52 sealed with SHA-256 hash. Scope: NATIONAL_SOVEREIGN.
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            [2026-10-24T14:30:00Z] [ROUTING_HEURISTIC] 2-Opt TSP optimization generated for Pune-Mumbai-Nashik cluster (498 km saved).
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            [2026-10-24T14:25:44Z] [APH_RAG] Vector semantic query processed for Faculty Cadre Ratio Chapter III.
          </div>
        </div>
      </div>
    </div>
  );
}
