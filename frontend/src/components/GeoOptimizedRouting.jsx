import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Award, 
  Leaf, 
  TrendingDown, 
  ArrowRight,
  Zap
} from 'lucide-react';

export default function GeoOptimizedRouting({ onOptimize }) {
  const [isOptimized, setIsOptimized] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const STOPS = [
    { stop: 1, name: 'MIT & AI Campus', city: 'Pune Hub', x: 30, y: 65, docket: 'AICTE-2026-WZ-9401' },
    { stop: 2, name: 'Somaiya Advanced Tech', city: 'Mumbai Central', x: 24, y: 50, docket: 'AICTE-2026-WZ-6612' },
    { stop: 3, name: 'Nashik Engineering College', city: 'Nashik Corridor', x: 38, y: 38, docket: 'AICTE-2026-WZ-9407' },
    { stop: 4, name: 'Vidarbha Tech Institute', city: 'Nagpur Zone', x: 74, y: 44, docket: 'AICTE-2026-WZ-9408' }
  ];

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => setIsConfirmed(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Geo-Optimized EVC Inspection Route Logistics</h2>
          <p className="text-xs text-slate-500">
            Traveling Salesperson Problem (TSP) multi-institution cluster heuristic reducing evaluator carbon footprint and committee travel SLA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOptimized(!isOptimized)}
            className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{isOptimized ? 'Show Un-Optimized Trips' : 'Run 2-Opt TSP Optimizer'}</span>
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-teal hover:bg-teal-light text-navy-900 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirm Multi-Stop Itinerary</span>
          </button>
        </div>
      </div>

      {isConfirmed && (
        <div className="p-3.5 rounded-lg bg-teal/10 border border-teal/30 text-teal font-semibold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>EVC Inspection Multi-Stop Itinerary dispatched and locked into official Regional Bureau Schedule!</span>
        </div>
      )}

      {/* Comparison Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="app-card p-4 border-l-4 border-l-primary">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Clustered Inspections</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">4 Campuses</div>
          <div className="text-[10px] text-slate-400 mt-1">Western Bureau Hubs</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-emerald-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Distance Saved</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {isOptimized ? '498 km' : '0 km'}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">
            {isOptimized ? '59.2% Travel Reduction' : 'Separate Point-to-Point'}
          </div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-teal">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">CO2 Emissions Saved</div>
          <div className="text-2xl font-bold text-teal mt-1">
            {isOptimized ? '60 kg CO2' : '0 kg'}
          </div>
          <div className="text-[10px] text-teal font-medium mt-1">Green Governance Metric</div>
        </div>

        <div className="app-card p-4 border-l-4 border-l-purple-500">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Travel Time Saved</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">
            {isOptimized ? '12.5 Hours' : '0 Hours'}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Evaluator SLA Preserved</div>
        </div>
      </div>

      {/* Map & Itinerary Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Canvas Map */}
        <div className="app-card p-5 lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">Geographic Inspection Grid: Western Corridor</h3>
              <p className="text-xs text-slate-400">Heuristic TSP path connecting Maharashtra regional clusters</p>
            </div>
            <span className="text-[10px] bg-slate-100 font-mono text-slate-600 px-2 py-0.5 rounded font-semibold">
              PostGIS Proximity Engine
            </span>
          </div>

          <div className="relative w-full h-[380px] bg-navy-950 rounded-xl overflow-hidden border border-navy-800 shadow-inner flex items-center justify-center">
            {/* Background Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#64748B" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* SVG Connecting Route Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {isOptimized ? (
                // Single Continuous TSP Loop
                <polyline
                  points="30% 65%, 24% 50%, 38% 38%, 74% 44%"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              ) : (
                // Disconnected Redundant Trips from HQ (Mumbai)
                <>
                  <line x1="24%" y1="50%" x2="30%" y2="65%" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="24%" y1="50%" x2="38%" y2="38%" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="24%" y1="50%" x2="74%" y2="44%" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
                </>
              )}
            </svg>

            {/* Campus Map Pins */}
            {STOPS.map(stop => (
              <div
                key={stop.stop}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 transition-transform group-hover:scale-125 ${
                  isOptimized 
                    ? 'bg-teal border-white text-navy-900' 
                    : 'bg-red-500 border-white text-white'
                }`}>
                  {stop.stop}
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-navy-900/90 border border-navy-700 text-[10px] text-white font-medium whitespace-nowrap shadow-sm">
                  {stop.name} ({stop.city})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Itinerary Card */}
        <div className="app-card p-5 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-semibold text-sm text-slate-800">Proposed Travel Itinerary</h3>
            <p className="text-xs text-slate-400">Sequential inspection route</p>
          </div>

          <div className="space-y-3">
            {STOPS.map((stop, idx) => (
              <div key={stop.stop} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Stop #{stop.stop}: {stop.city}</span>
                  <span className="text-[10px] font-mono text-primary font-bold">{stop.docket}</span>
                </div>
                <div className="text-[11px] text-slate-700 font-medium">{stop.name}</div>
                {idx < STOPS.length - 1 && (
                  <div className="text-[10px] text-slate-400 pt-1 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>Next leg: ~{idx === 0 ? '148 km' : idx === 1 ? '165 km' : '520 km'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
