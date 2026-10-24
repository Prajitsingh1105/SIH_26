import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb, 
  ArrowUpRight 
} from 'lucide-react';
import { FORECAST_DATA } from '../services/mockData';

export default function PredictiveAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState("Western Region (Mumbai)");

  const series = FORECAST_DATA[selectedRegion] || FORECAST_DATA["Western Region (Mumbai)"];

  const forecastSummary = {
    "Western Region (Mumbai)": {
      current: 31,
      predicted: 52,
      risk: "HIGH_RISK_BOTTLENECK",
      model: "ARIMA(2,1,2) + Prophet Bayesian Trend",
      recommendation: "Northern & Western bureaus will experience a 67% increase in scrutiny backlog due to AI/ML expansion dockets. Recommend temporary secondment of 3 senior evaluators."
    },
    "Northern Region (New Delhi)": {
      current: 44,
      predicted: 74,
      risk: "CRITICAL_BOTTLENECK",
      model: "ARIMA(2,1,2) + Prophet Bayesian Trend",
      recommendation: "Severe pendency forecast in New Technical Campus verification. Route 12 applications to North-Western Bureau (Chandigarh) to balance queue."
    },
    "Southern Region (Bengaluru)": {
      current: 22,
      predicted: 30,
      risk: "MODERATE_STABLE",
      model: "ARIMA(2,1,2) + Prophet Bayesian Trend",
      recommendation: "SLA compliance stable at 96%. Routine EVC cluster scheduling recommended."
    },
    "Eastern Region (Kolkata)": {
      current: 20,
      predicted: 36,
      risk: "ELEVATED_WATCH",
      model: "ARIMA(2,1,2) + Prophet Bayesian Trend",
      recommendation: "Fire safety NOC delays driving 8-day stage extension. Trigger automated reminders to State Fire Directorates."
    }
  };

  const currentSummary = forecastSummary[selectedRegion] || forecastSummary["Western Region (Mumbai)"];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Predictive Backlog & Delay Analytics</h2>
          <p className="text-xs text-slate-500">
            Time-series machine learning forecasting (ARIMA / Prophet) projecting 15-day regional docket bottlenecks and SLA pressure.
          </p>
        </div>

        {/* Region Selector */}
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 shadow-sm font-semibold"
        >
          {Object.keys(FORECAST_DATA).map(reg => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="app-card p-4 border-l-4 border-l-primary">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Current Backlog</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{currentSummary.current} Files</div>
          <div className="text-[10px] text-slate-400 mt-1">In Active Scrutiny</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-red-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Predicted in 15 Days</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{currentSummary.predicted} Files</div>
          <div className="text-[10px] text-red-500 font-medium mt-1">
            +{Math.round(((currentSummary.predicted - currentSummary.current) / currentSummary.current) * 100)}% Surge Expected
          </div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-amber-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Forecast Risk Level</div>
          <div className="text-sm font-bold text-amber-700 mt-2">
            {currentSummary.risk.replace(/_/g, ' ')}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Confidence Interval: 95%</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-teal">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">ML Estimator Model</div>
          <div className="text-xs font-mono font-bold text-teal mt-2">Prophet + ARIMA(2,1,2)</div>
          <div className="text-[10px] text-slate-400 mt-1">Python FastAPI Microservice</div>
        </div>
      </div>

      {/* Forecasting Chart */}
      <div className="app-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm text-slate-800">
              15-Day Pendency Horizon: {selectedRegion}
            </h3>
            <p className="text-xs text-slate-400">
              Solid blue shows historical backlog; dashed red shows ML projection with 95% confidence boundary bands.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-primary rounded" />
              <span className="text-slate-600">Historical Volume</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-red-500 rounded border border-dashed border-red-500" />
              <span className="text-slate-600">Predicted Backlog</span>
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="forecastArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="upper" stroke="none" fill="#FEE2E2" fillOpacity={0.5} name="95% CI Upper" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="#FFFFFF" name="95% CI Lower" />
              <Line type="monotone" dataKey="historical" stroke="#1E40AF" strokeWidth={3} dot={{ r: 4 }} name="Historical Backlog" />
              <Line type="monotone" dataKey="forecast" stroke="#DC2626" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} name="Predicted Backlog" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommended Operational Intervention */}
      <div className="app-card p-5 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Recommended AICTE Operational Intervention</span>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed">
          {currentSummary.recommendation}
        </p>
      </div>
    </div>
  );
}
