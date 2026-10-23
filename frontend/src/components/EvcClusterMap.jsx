import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Calendar, Video, UserCheck, Check } from 'lucide-react';

const CLUSTERS = [
  {
    id: "CL-WEST",
    name: "Western Hub (Pune - Mumbai)",
    region: "Western Region",
    officer: "Dr. R.K. Srivastav",
    activeFiles: 2,
    coordinates: { x: 32, y: 56 },
    institutes: ["Maharashtra Institute of Technology & AI", "KJ Somaiya Tech"],
    evcDate: "Nov 04, 2026",
    status: "Optimized Circuit"
  },
  {
    id: "CL-NORTH",
    name: "Northern Hub (NCR - Gurugram)",
    region: "Northern Region",
    officer: "Dr. Arvind Joshi",
    activeFiles: 1,
    coordinates: { x: 40, y: 30 },
    institutes: ["Delhi NCR Technical Campus"],
    evcDate: "Nov 02, 2026",
    status: "Pending Inspection"
  },
  {
    id: "CL-SOUTH",
    name: "Southern Corridor (Bengaluru)",
    region: "Southern Region",
    officer: "Dr. S. Ramanathan",
    activeFiles: 1,
    coordinates: { x: 38, y: 76 },
    institutes: ["Bengaluru College of Engineering"],
    evcDate: "Nov 08, 2026",
    status: "Inspection Completed"
  },
  {
    id: "CL-CENTRAL",
    name: "Central Zone (Bhopal)",
    region: "Central Region",
    officer: "Dr. M.P. Verma",
    activeFiles: 1,
    coordinates: { x: 46, y: 48 },
    institutes: ["Central India Polytechnic"],
    evcDate: "Nov 06, 2026",
    status: "Scrutiny Queue"
  }
];

export default function EvcClusterMap() {
  const [selectedCluster, setSelectedCluster] = useState(CLUSTERS[0]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setToastMessage("Route optimization: Geographic grouping reduced travel by 380km and cut inspection turnaround by 3.2 days.");
      setTimeout(() => setToastMessage(null), 4000);
    }, 500);
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-[#121215] border border-white/[0.08]">
        <div>
          <h2 className="text-sm font-semibold text-white">
            EVC Inspection Geographic Clusters
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Spatial grouping of institutions for Expert Visiting Committee logistics under APH Chapter IV.
          </p>
        </div>

        <button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/5 flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <Navigation className="w-3.5 h-3.5 text-zinc-400" />
          <span>{isOptimizing ? 'Optimizing...' : 'Optimize Inspection Routes'}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Map & Cluster Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Radar Map (7 cols) */}
        <div className="lg:col-span-7 rounded-xl p-5 bg-[#121215] border border-white/[0.08] relative min-h-[380px] flex flex-col justify-between overflow-hidden">
          
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>National Spatial Radar</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Geo-tagging Active
            </span>
          </div>

          {/* Minimalist Grid Pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="simple-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#simple-grid)" />
            </svg>
          </div>

          {/* Cluster Pin Markers */}
          <div className="relative w-full h-[260px] my-2">
            {CLUSTERS.map((cl) => {
              const isSelected = selectedCluster.id === cl.id;

              return (
                <button
                  key={cl.id}
                  onClick={() => setSelectedCluster(cl)}
                  style={{ left: `${cl.coordinates.x}%`, top: `${cl.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm ${
                    isSelected
                      ? 'bg-zinc-200 border-white text-zinc-950 font-semibold'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{cl.id}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
            <span>WGS-84 Projection</span>
            <span>Batch Clustering: TSP Enabled</span>
          </div>
        </div>

        {/* Selected Cluster Details (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-xl bg-[#121215] border border-white/[0.08] space-y-3">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {selectedCluster.region}
                </span>
                <h3 className="text-xs font-semibold text-white mt-0.5">
                  {selectedCluster.name}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-white/5">
                {selectedCluster.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-white/[0.04]">
                <span className="text-zinc-500">Regional Evaluator:</span>
                <span className="text-zinc-200 font-medium">{selectedCluster.officer}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-white/[0.04]">
                <span className="text-zinc-500">Inspection Schedule:</span>
                <span className="font-mono text-zinc-300">{selectedCluster.evcDate}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-white/[0.04]">
                <span className="text-zinc-500">Video Geotagging:</span>
                <span className="text-zinc-300 font-mono">Enforced (Form 4.2)</span>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
                Included Campuses ({selectedCluster.institutes.length})
              </h4>
              <div className="space-y-1">
                {selectedCluster.institutes.map((inst, i) => (
                  <div key={i} className="p-2 rounded-lg bg-zinc-900/40 border border-white/[0.04] text-xs text-zinc-300 flex items-center justify-between">
                    <span>{inst}</span>
                    <span className="text-[10px] font-mono text-zinc-500">Queue #{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
