import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Check, 
  CheckCircle2, 
  Filter, 
  ShieldAlert, 
  Clock,
  ExternalLink
} from 'lucide-react';

export default function NotificationsCenter({ 
  notifications = [], 
  onMarkRead, 
  onMarkAllRead,
  onSelectApplication 
}) {
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredNotifs = notifications.filter(n => {
    if (channelFilter !== 'ALL' && n.channel !== channelFilter) return false;
    if (priorityFilter !== 'ALL' && n.priority !== priorityFilter) return false;
    return true;
  });

  const getChannelIcon = (ch) => {
    switch (ch) {
      case 'SMS': return <Smartphone className="w-4 h-4 text-amber-500" />;
      case 'WHATSAPP': return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'EMAIL': return <Mail className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Omnichannel Notifications & Delivery Log</h2>
          <p className="text-xs text-slate-500">
            Multi-channel statutory dispatch engine routing urgent deficiency notices, EVC schedules, and SLA breach escalations.
          </p>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="app-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Filter by Channel</label>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
            >
              <option value="ALL">All Delivery Channels (In-App, SMS, WhatsApp, Email)</option>
              <option value="IN_APP">In-App Broadcast</option>
              <option value="SMS">SMS Alerts (Twilio Relay)</option>
              <option value="WHATSAPP">WhatsApp Cloud API</option>
              <option value="EMAIL">Email Dispatch (Nodemailer)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Filter by Severity Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
            >
              <option value="ALL">All Severity Levels</option>
              <option value="CRITICAL">Critical Breaches</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium / Informational</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="app-card p-8 text-center text-xs text-slate-400">
            No notifications matching the selected filters.
          </div>
        ) : (
          filteredNotifs.map(n => (
            <div
              key={n.id}
              className={`app-card p-4 transition-all ${
                n.read ? 'bg-white' : 'bg-blue-50/40 border-primary/30 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                    {getChannelIcon(n.channel)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{n.title}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        n.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                        n.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {n.priority}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">[{n.channel}]</span>
                    </div>

                    <p className="text-xs text-slate-700">{n.message}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1">
                      <span>Recipient: <strong className="text-slate-600">{n.recipient}</strong></span>
                      <span>Docket: <strong className="font-mono text-primary">{n.applicationId}</strong></span>
                      <span className="text-emerald-600 font-semibold">{n.deliveryStatus}</span>
                      <span>{new Date(n.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {!n.read && (
                    <button
                      onClick={() => onMarkRead(n.id)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
