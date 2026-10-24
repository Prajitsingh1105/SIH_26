import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import OverviewDashboard from './components/OverviewDashboard';
import ApplicationManagement from './components/ApplicationManagement';
import WorkflowMonitor from './components/WorkflowMonitor';
import OfficerWorkbench from './components/OfficerWorkbench';
import InstitutionPortal from './components/InstitutionPortal';
import EvcManagement from './components/EvcManagement';
import ComplianceCenter from './components/ComplianceCenter';
import SlaEscalationCenter from './components/SlaEscalationCenter';
import SmartWorkloadBalancing from './components/SmartWorkloadBalancing';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import GeoOptimizedRouting from './components/GeoOptimizedRouting';
import AuditLedgerExplorer from './components/AuditLedgerExplorer';
import AphAiAssistant from './components/AphAiAssistant';
import NotificationsCenter from './components/NotificationsCenter';
import ReportsAndExports from './components/ReportsAndExports';
import AdminModules from './components/AdminModules';
import SihDemoScenarios from './components/SihDemoScenarios';
import ApplicationDetailModal from './components/ApplicationDetailModal';

import {
  getApplications,
  createApplication,
  transitionApplication,
  getOfficers,
  autoAssignOfficer,
  getComplianceDocuments,
  verifyComplianceDocument,
  getSlaOverview,
  simulateSlaBreach,
  getEvcVisits,
  submitEvcReport,
  optimizeRoute,
  getAuditLedger,
  verifyAuditLedger,
  tamperTestAudit,
  askAphAssistant,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  resetDemoData
} from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [activeRole, setActiveRole] = useState('REGIONAL_HEAD');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary State Data
  const [applications, setApplications] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [evcVisits, setEvcVisits] = useState([]);
  const [complianceDocs, setComplianceDocs] = useState([]);
  const [auditLedger, setAuditLedger] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Responsive Sidebar Controls
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setIsDesktopCollapsed(prev => !prev);
    } else {
      setMobileSidebarOpen(prev => !prev);
    }
  };

  // Load initial data
  const loadData = async () => {
    try {
      const [appsRes, offRes, evcRes, docsRes, auditRes, notifRes] = await Promise.all([
        getApplications(),
        getOfficers(),
        getEvcVisits(),
        getComplianceDocuments(),
        getAuditLedger(),
        getNotifications()
      ]);

      setApplications(appsRes.applications || []);
      setOfficers(offRes || []);
      setEvcVisits(evcRes || []);
      setComplianceDocs(docsRes || []);
      setAuditLedger(auditRes || []);
      setNotifications(notifRes || []);
    } catch (e) {
      console.error('Data load error:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Workflow Actions
  const handleApprove = async (app) => {
    const actor = activeRole === 'REGIONAL_HEAD' ? 'Dr. R.K. Srivastava' : 'Scrutiny Evaluator';
    const res = await transitionApplication(app.id, 'APPROVE', actor, activeRole);
    if (res && res.success) {
      setApplications(prev => prev.map(a => a.id === app.id ? res.application : a));
      showToast(`Docket ${app.id} approved and transitioned to next statutory stage!`);
      // Update audit ledger
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
  };

  const handleRevert = async (appId, reason) => {
    const actor = activeRole === 'REGIONAL_HEAD' ? 'Dr. R.K. Srivastava' : 'Scrutiny Officer';
    const res = await transitionApplication(appId, 'REVERT', actor, activeRole, reason);
    if (res && res.success) {
      setApplications(prev => prev.map(a => a.id === appId ? res.application : a));
      showToast(`Deficiency notice served for Docket ${appId}! 10-day rectification window opened.`);
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
  };

  const handleResubmit = async (appId, explanation) => {
    const res = await transitionApplication(appId, 'RESUBMIT', 'Institution Registrar', 'INSTITUTION_USER', explanation);
    if (res && res.success) {
      setApplications(prev => prev.map(a => a.id === appId ? res.application : a));
      showToast(`Rectification response submitted for Docket ${appId}! Moved to Reverification.`);
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
  };

  const handleCreateApplication = async (data) => {
    const created = await createApplication(data);
    if (created) {
      setApplications(prev => [created, ...prev]);
      showToast(`Application Docket ${created.id} submitted to AICTE!`);
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
  };

  // 2. Smart Workload Balancing
  const handleAutoAssign = async () => {
    const res = await autoAssignOfficer();
    if (res && res.success) {
      setApplications(prev => prev.map(a => a.id === res.applicationId ? { ...a, assignedOfficer: res.assignedOfficer.name, assignedOfficerId: res.assignedOfficer.id } : a));
      setOfficers(prev => prev.map(o => o.id === res.assignedOfficer.id ? { ...o, activeDockets: res.assignedOfficer.activeDockets } : o));
      showToast(`Docket ${res.applicationId} automatically assigned to ${res.assignedOfficer.name}!`);
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
    return res;
  };

  // 3. Compliance Verification
  const handleVerifyDocument = async (docId, verifier) => {
    const res = await verifyComplianceDocument(docId, verifier);
    if (res && res.success) {
      setComplianceDocs(prev => prev.map(d => d.id === docId ? res.document : d));
      showToast(`Document ${docId} verified and recorded to audit chain!`);
    }
  };

  // 4. SLA Breach Simulation
  const handleSimulateBreach = async () => {
    const res = await simulateSlaBreach();
    if (res && res.success) {
      setApplications(prev => prev.map(a => a.id === res.application.id ? res.application : a));
      if (res.notification) {
        setNotifications(prev => [res.notification, ...prev]);
      }
      showToast(`Statutory SLA Breach triggered for Docket ${res.application.id}! Emergency SMS alert dispatched.`);
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
    return res;
  };

  // 5. EVC Report Submission
  const handleSubmitEvcReport = async (visitId, reportData) => {
    const res = await submitEvcReport(visitId, reportData);
    if (res && res.success) {
      setEvcVisits(prev => prev.map(v => v.id === visitId ? res.visit : v));
      showToast(`EVC Inspection Report submitted for Visit ${visitId}! Forwarded to Standing Appellate Committee.`);
      const newLedger = await getAuditLedger();
      setAuditLedger(newLedger);
    }
  };

  // 6. Audit Operations
  const handleVerifyLedger = async () => {
    const res = await verifyAuditLedger();
    showToast(`Cryptographic audit ledger verified: 100% hash chain integrity confirmed!`);
    return res;
  };

  const handleTamperTest = async () => {
    return await tamperTestAudit();
  };

  // 7. APH Assistant
  const handleAskAph = async (q) => {
    return await askAphAssistant(q);
  };

  // 8. Notifications
  const handleMarkNotificationRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsRead = async () => {
    await markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read.");
  };

  // 9. Reset Demo Data
  const handleResetDemo = async () => {
    await resetDemoData();
    await loadData();
    showToast("SIH Demo environment reset to initial seeded state!");
  };

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      {/* Left Responsive Sidebar (Drawer on mobile, Collapsible on desktop) */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        activeRole={activeRole} 
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isDesktopCollapsed={isDesktopCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar with Toggle Button */}
        <TopHeader
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onResetDemo={handleResetDemo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentView={setCurrentView}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-navy-900 text-white px-4 py-2.5 rounded-xl shadow-modal text-xs font-semibold flex items-center gap-2 border border-teal/30 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Scrollable Page View Container */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === 'overview' && (
              <OverviewDashboard 
                applications={applications} 
                onSelectApplication={setSelectedApplication}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView === 'applications' && (
              <ApplicationManagement 
                applications={applications} 
                onSelectApplication={setSelectedApplication}
                onApprove={handleApprove}
                onRevert={handleRevert}
              />
            )}

            {currentView === 'workflow_monitor' && (
              <WorkflowMonitor 
                applications={applications} 
                onSelectApplication={setSelectedApplication}
              />
            )}

            {currentView === 'officer_workbench' && (
              <OfficerWorkbench 
                applications={applications} 
                onApprove={handleApprove}
                onRevert={handleRevert}
                onSelectApplication={setSelectedApplication}
              />
            )}

            {currentView === 'institution_portal' && (
              <InstitutionPortal 
                applications={applications} 
                onCreateApplication={handleCreateApplication}
                onResubmitApplication={handleResubmit}
              />
            )}

            {currentView === 'evc_management' && (
              <EvcManagement 
                evcVisits={evcVisits} 
                onSubmitReport={handleSubmitEvcReport}
              />
            )}

            {currentView === 'compliance_center' && (
              <ComplianceCenter 
                complianceDocs={complianceDocs} 
                onVerifyDocument={handleVerifyDocument}
              />
            )}

            {currentView === 'sla_escalations' && (
              <SlaEscalationCenter 
                applications={applications} 
                onSimulateBreach={handleSimulateBreach}
                onSelectApplication={setSelectedApplication}
              />
            )}

            {currentView === 'workload_balancing' && (
              <SmartWorkloadBalancing 
                officers={officers} 
                applications={applications} 
                onAutoAssign={handleAutoAssign}
              />
            )}

            {currentView === 'predictive_analytics' && (
              <PredictiveAnalytics />
            )}

            {currentView === 'geo_routing' && (
              <GeoOptimizedRouting />
            )}

            {currentView === 'audit_ledger' && (
              <AuditLedgerExplorer 
                ledger={auditLedger} 
                onVerifyLedger={handleVerifyLedger}
                onTamperTest={handleTamperTest}
              />
            )}

            {currentView === 'aph_assistant' && (
              <AphAiAssistant onAskQuestion={handleAskAph} />
            )}

            {currentView === 'notifications' && (
              <NotificationsCenter 
                notifications={notifications} 
                onMarkRead={handleMarkNotificationRead}
                onMarkAllRead={handleMarkAllNotificationsRead}
                onSelectApplication={setSelectedApplication}
              />
            )}

            {currentView === 'reports' && (
              <ReportsAndExports 
                applications={applications} 
                officers={officers} 
                complianceDocs={complianceDocs}
              />
            )}

            {['user_roles', 'workflow_config', 'sla_config', 'integrations', 'system_activity'].includes(currentView) && (
              <AdminModules viewType={currentView} />
            )}

            {currentView === 'sih_demo' && (
              <SihDemoScenarios 
                setCurrentView={setCurrentView}
                onSimulateBreach={handleSimulateBreach}
                onAutoAssign={handleAutoAssign}
                onVerifyLedger={handleVerifyLedger}
                onTamperTest={handleTamperTest}
                onResetDemo={handleResetDemo}
              />
            )}
          </div>
        </main>
      </div>

      {/* Application Detail Dossier Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onApprove={handleApprove}
          onRevert={handleRevert}
        />
      )}
    </div>
  );
}
