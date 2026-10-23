import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CollegeAdminDashboard from './components/CollegeAdminDashboard';
import RegionalOfficerCommandCenter from './components/RegionalOfficerCommandCenter';
import RevertModal from './components/RevertModal';
import EscalationToasts from './components/EscalationToasts';
import TimeTravelPanel from './components/TimeTravelPanel';
import AphChatWidget from './components/AphChatWidget';
import { 
  fetchApplications, 
  fetchAuditLedger, 
  transitionApplication, 
  simulateFastForward, 
  simulateReset,
  uploadDocument
} from './services/api';

export default function App() {
  const [currentRole, setCurrentRole] = useState('OFFICER'); // 'COLLEGE' | 'OFFICER'
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'ledger' | 'clusters'
  const [applications, setApplications] = useState([]);
  const [auditLedger, setAuditLedger] = useState([]);
  const [simulationState, setSimulationState] = useState({
    isSimulated: false,
    daysForwarded: 0,
    escalations: []
  });
  const [revertModalApp, setRevertModalApp] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load applications and audit trail from Express backend
  const loadInitialData = async () => {
    try {
      const [appsRes, ledgerRes] = await Promise.all([
        fetchApplications().catch(() => ({ success: false })),
        fetchAuditLedger().catch(() => ({ success: false }))
      ]);

      if (appsRes?.data) {
        setApplications(appsRes.data);
        if (appsRes.simulation) {
          setSimulationState(appsRes.simulation);
        }
      }
      if (ledgerRes?.data) {
        setAuditLedger(ledgerRes.data);
      }
    } catch (err) {
      console.error("Failed to load initial backend data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // State Machine transition handler
  const handleTransition = async (id, action, reason = null) => {
    try {
      const actorId = currentRole === 'OFFICER' ? 'RO-Officer-Dr-Srivastav' : 'College-Principal';
      const result = await transitionApplication(id, action, actorId, reason);

      if (result.success) {
        // Update application in local state
        setApplications(prev => 
          prev.map(app => app.id === id ? result.data : app)
        );

        // Append block to ledger in real time
        if (result.block) {
          setAuditLedger(prev => [...prev, result.block]);
        }
      }
    } catch (err) {
      alert(`Transition error: ${err.message}`);
    }
  };

  // Revert modal confirmation
  const handleConfirmRevert = async (id, reason) => {
    await handleTransition(id, 'REVERT', reason);
  };

  // Document Upload handler from College view
  const handleUploadDocument = async (applicationId, docName) => {
    try {
      await uploadDocument(applicationId, docName);
      // Refresh ledger to include document verification block
      const updatedLedger = await fetchAuditLedger();
      if (updatedLedger?.data) {
        setAuditLedger(updatedLedger.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 30-Day Fast Forward simulation handler
  const handleFastForward = async (days = 30) => {
    try {
      const res = await simulateFastForward(days);
      if (res.success) {
        setApplications(res.applications);
        setSimulationState({
          isSimulated: true,
          daysForwarded: res.daysForwarded,
          escalations: res.escalations || []
        });

        // Refresh audit trail for simulation block
        const updatedLedger = await fetchAuditLedger();
        if (updatedLedger?.data) {
          setAuditLedger(updatedLedger.data);
        }
      }
    } catch (err) {
      alert(`Simulation error: ${err.message}`);
    }
  };

  // Reset simulation handler
  const handleResetSimulation = async () => {
    try {
      const res = await simulateReset();
      if (res.success) {
        setApplications(res.applications);
        setSimulationState({
          isSimulated: false,
          daysForwarded: 0,
          escalations: []
        });

        const updatedLedger = await fetchAuditLedger();
        if (updatedLedger?.data) {
          setAuditLedger(updatedLedger.data);
        }
      }
    } catch (err) {
      alert(`Reset error: ${err.message}`);
    }
  };

  const handleDismissEscalation = (id) => {
    setSimulationState(prev => ({
      ...prev,
      escalations: prev.escalations.filter(e => e.id !== id)
    }));
  };

  // Find college's own application (Maharashtra Institute of Tech & AI)
  const collegeApp = applications.find(a => a.id === "AICTE-2026-WZ-9401") || applications[0];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* Top Navbar (Only when in College view, since RegionalOfficerCommandCenter has its own minimal navigation) */}
      {currentRole === 'COLLEGE' && (
        <Navbar
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          simulationState={simulationState}
          ledgerCount={auditLedger.length}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500 space-y-3 font-mono text-xs">
            <div className="w-6 h-6 rounded-full border-2 border-zinc-500 border-t-transparent animate-spin" />
            <span>Connecting to AICTE Approval Engine...</span>
          </div>
        ) : (
          <>
            {currentRole === 'COLLEGE' ? (
              <CollegeAdminDashboard
                application={collegeApp}
                simulationState={simulationState}
                onUploadDocument={handleUploadDocument}
                onResubmitApplication={(id) => handleTransition(id, 'APPROVE')}
              />
            ) : (
              <RegionalOfficerCommandCenter
                applications={applications}
                auditLedger={auditLedger}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                currentRole={currentRole}
                setCurrentRole={setCurrentRole}
                simulationState={simulationState}
                onTransition={handleTransition}
              />
            )}
          </>
        )}
      </main>

      {/* Clean SaaS Footer */}
      <footer className="border-t border-white/10 bg-[#09090b] py-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AICTE Approval Workflow Engine • Western Regional Bureau</span>
          <span className="text-zinc-500">Government of India • Ministry of Education</span>
        </div>
      </footer>

      {/* Modals & Floating Overlays */}
      <RevertModal
        isOpen={!!revertModalApp}
        onClose={() => setRevertModalApp(null)}
        application={revertModalApp}
        onConfirmRevert={handleConfirmRevert}
      />

      {/* Simulated WhatsApp / SMS Escalations */}
      <EscalationToasts
        escalations={simulationState.escalations}
        onDismiss={handleDismissEscalation}
      />

      {/* Floating Developer Tools / Simulation Panel (Bottom Left) */}
      <TimeTravelPanel
        simulationState={simulationState}
        onFastForward={handleFastForward}
        onResetSimulation={handleResetSimulation}
      />

      {/* Floating AI-Powered APH Assistant Widget (Bottom Right) */}
      <AphChatWidget />

    </div>
  );
}
