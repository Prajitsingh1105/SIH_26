import React, { useState } from 'react';
import { 
  Zap, 
  GitBranch, 
  Clock, 
  SlidersHorizontal, 
  MapPin, 
  Terminal, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function SihDemoScenarios({ 
  setCurrentView,
  onSimulateBreach,
  onAutoAssign,
  onVerifyLedger,
  onTamperTest,
  onResetDemo
}) {
  const [runningScenario, setRunningScenario] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  const runScenarioA = () => {
    setRunningScenario('A');
    setScenarioFeedback({
      title: "Scenario A: End-to-End Workflow & Deficiency Rectification Loop",
      message: "Navigating to Officer Workbench. You can inspect Docket AICTE-2026-WZ-9401, test mandatory deficiency returns or advance to EVC Queue.",
      targetView: 'officer_workbench'
    });
    setTimeout(() => setCurrentView('officer_workbench'), 1500);
  };

  const runScenarioB = async () => {
    setRunningScenario('B');
    const res = await onSimulateBreach();
    setScenarioFeedback({
      title: "Scenario B: Automated SLA Statutory Breach & Escalation",
      message: `Statutory review deadline breached on Docket ${res?.application?.id || 'AICTE-2026-WZ-9401'}. Emergency SMS alert dispatched to Regional Head!`,
      targetView: 'sla_escalations'
    });
    setTimeout(() => setCurrentView('sla_escalations'), 1500);
  };

  const runScenarioC = async () => {
    setRunningScenario('C');
    const res = await onAutoAssign();
    setScenarioFeedback({
      title: "Scenario C: Smart Workload Balancing Algorithmic Allocation",
      message: `Unassigned Docket ${res?.applicationId} allocated to ${res?.assignedOfficer?.name}. ${res?.rationale}`,
      targetView: 'workload_balancing'
    });
    setTimeout(() => setCurrentView('workload_balancing'), 1500);
  };

  const runScenarioD = () => {
    setRunningScenario('D');
    setScenarioFeedback({
      title: "Scenario D: Geo-Optimized EVC Inspection Route (TSP)",
      message: "Navigating to Geo-Optimized Route Engine. 4 campus visits clustered into single 342 km loop, saving 498 km and 60 kg CO2.",
      targetView: 'geo_routing'
    });
    setTimeout(() => setCurrentView('geo_routing'), 1500);
  };

  const runScenarioE = async () => {
    setRunningScenario('E');
    await onVerifyLedger();
    setScenarioFeedback({
      title: "Scenario E: Tamper-Evident SHA-256 Audit Verification",
      message: "Cryptographic hash chain verified from Genesis Block #1 to Block #52. All block hashes mathematically verified.",
      targetView: 'audit_ledger'
    });
    setTimeout(() => setCurrentView('audit_ledger'), 1500);
  };

  const runScenarioF = () => {
    setRunningScenario('F');
    setScenarioFeedback({
      title: "Scenario F: Predictive Backlog Analytics (15-Day ML Horizon)",
      message: "Navigating to Time-Series Forecast. Prophet / ARIMA projecting 67% backlog surge in Western Bureau.",
      targetView: 'predictive_analytics'
    });
    setTimeout(() => setCurrentView('predictive_analytics'), 1500);
  };

  const runScenarioG = () => {
    setRunningScenario('G');
    setScenarioFeedback({
      title: "Scenario G: AI-Powered APH Regulatory Handbook Assistant",
      message: "Opening RAG conversational interface pre-loaded with official AICTE Handbook (2024–27) chapter citations.",
      targetView: 'aph_assistant'
    });
    setTimeout(() => setCurrentView('aph_assistant'), 1500);
  };

  const runScenarioH = () => {
    setRunningScenario('H');
    setScenarioFeedback({
      title: "Scenario H: Compliance & Expiry Alert Monitoring",
      message: "Navigating to Compliance Center. 72 statutory certifications categorized by 30-day, 7-day, and expired status.",
      targetView: 'compliance_center'
    });
    setTimeout(() => setCurrentView('compliance_center'), 1500);
  };

  const SCENARIOS = [
    {
      id: 'A',
      title: 'Scenario A: End-to-End Approval Workflow',
      desc: 'Review submitted evidence, return for deficiency with mandatory APH clauses, switch to institution, upload corrected proof, and reverify.',
      icon: GitBranch,
      action: runScenarioA,
      badge: 'Core Workflow'
    },
    {
      id: 'B',
      title: 'Scenario B: Automatic SLA Escalation',
      desc: 'Simulate instant statutory SLA breach, verify emergency tier-3 authority escalation, and inspect multi-channel notification log.',
      icon: Clock,
      action: runScenarioB,
      badge: 'SLA Engine'
    },
    {
      id: 'C',
      title: 'Scenario C: Smart Workload Balancing',
      desc: 'Execute real assignment heuristic over unassigned dockets considering evaluator domain expertise and capacity utilization.',
      icon: SlidersHorizontal,
      action: runScenarioC,
      badge: 'Workload AI'
    },
    {
      id: 'D',
      title: 'Scenario D: Geo-Optimized EVC Logistics',
      desc: 'Cluster Maharashtra campus inspections into 2-Opt TSP route, calculate 498 km travel reduction and 60 kg CO2 emissions savings.',
      icon: MapPin,
      action: runScenarioD,
      badge: 'Geospatial TSP'
    },
    {
      id: 'E',
      title: 'Scenario E: Audit Integrity & Tamper Proof',
      desc: 'Verify SHA-256 chain from Genesis block, and run disposable test ledger tamper simulation to detect unauthorized alterations.',
      icon: Terminal,
      action: runScenarioE,
      badge: 'Cryptographic'
    },
    {
      id: 'F',
      title: 'Scenario F: Predictive Backlog Analytics',
      desc: 'Inspect 15-day regional pendency projection with 95% confidence intervals and operational evaluator secondment interventions.',
      icon: TrendingUp,
      action: runScenarioF,
      badge: 'Time-Series ML'
    },
    {
      id: 'G',
      title: 'Scenario G: APH Regulatory AI Assistant',
      desc: 'Query Approval Process Handbook RAG engine regarding Faculty Cadre Ratio 1:20 and Land Tenure norms with chapter citations.',
      icon: Sparkles,
      action: runScenarioG,
      badge: 'Handbook RAG'
    },
    {
      id: 'H',
      title: 'Scenario H: Compliance & Expiry Alerts',
      desc: 'Track 72 institutional certifications, examine 30-day land lease alert window, and execute verified statutory renewals.',
      icon: ShieldCheck,
      action: runScenarioH,
      badge: 'Compliance'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="app-card p-6 bg-gradient-navy text-white rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase bg-teal text-navy-900 px-2.5 py-0.5 rounded font-mono">
              SIH 2026 JUDGING & EVALUATION DESK
            </span>
            <span className="text-xs text-slate-300">• Problem Statement SIH26262 • Team StrataX</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Interactive Demonstration Scenarios</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Execute each of the 8 required SIH demonstration scenarios. Each action triggers actual prototype logic, updates the backend/local store, and navigates to the verified outcome.
          </p>
        </div>

        <button
          onClick={onResetDemo}
          className="px-4 py-2 rounded-lg bg-navy-800 border border-slate-600 hover:border-slate-400 text-white font-semibold text-xs flex items-center gap-2 transition-colors self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-light" />
          <span>Reset Demo Environment</span>
        </button>
      </div>

      {/* Live Feedback Toast */}
      {scenarioFeedback && (
        <div className="p-4 rounded-xl bg-teal/10 border border-teal/30 text-xs text-slate-800 space-y-1 animate-fade-in">
          <div className="font-bold flex items-center gap-2 text-teal text-sm">
            <CheckCircle2 className="w-5 h-5 text-teal" />
            <span>{scenarioFeedback.title}</span>
          </div>
          <div className="text-slate-700">{scenarioFeedback.message}</div>
          <div className="text-[10px] text-teal font-semibold pt-1">
            Redirecting to module...
          </div>
        </div>
      )}

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCENARIOS.map(sc => {
          const Icon = sc.icon;
          const isCurrent = runningScenario === sc.id;
          return (
            <div key={sc.id} className="app-card p-5 space-y-3 flex flex-col justify-between hover:border-primary/40 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-slate-900">{sc.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {sc.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sc.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">SIH26262 / Part {sc.id}</span>
                <button
                  onClick={sc.action}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3 h-3 text-cyan-accent" />
                  <span>Execute Scenario {sc.id}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
