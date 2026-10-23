const BACKEND_BASE = '/api';
const AI_SERVICE_BASE = '/api/aph-assistant';

// Fallback in case proxy fails or standalone fetch
const API_URL = import.meta.env.VITE_API_URL || BACKEND_BASE;
const AI_URL = import.meta.env.VITE_AI_URL || AI_SERVICE_BASE;

export async function fetchApplications() {
  try {
    const res = await fetch(`${API_URL}/applications`);
    if (!res.ok) throw new Error('Failed to fetch applications');
    return await res.json();
  } catch (err) {
    console.error('Error fetching applications:', err);
    throw err;
  }
}

export async function transitionApplication(id, action, actorId, reason = null) {
  try {
    const res = await fetch(`${API_URL}/applications/${id}/transition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, actorId, reason })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Transition failed');
    }
    return data;
  } catch (err) {
    console.error('Error in state transition:', err);
    throw err;
  }
}

export async function fetchAuditLedger() {
  try {
    const res = await fetch(`${API_URL}/audit-ledger`);
    if (!res.ok) throw new Error('Failed to fetch audit ledger');
    return await res.json();
  } catch (err) {
    console.error('Error fetching audit ledger:', err);
    throw err;
  }
}

export async function simulateFastForward(days = 30) {
  try {
    const res = await fetch(`${API_URL}/simulate/fast-forward`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days })
    });
    if (!res.ok) throw new Error('Failed to run simulation');
    return await res.json();
  } catch (err) {
    console.error('Error running simulation:', err);
    throw err;
  }
}

export async function simulateReset() {
  try {
    const res = await fetch(`${API_URL}/simulate/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to reset simulation');
    return await res.json();
  } catch (err) {
    console.error('Error resetting simulation:', err);
    throw err;
  }
}

export async function fetchKpis() {
  try {
    const res = await fetch(`${API_URL}/kpis`);
    if (!res.ok) throw new Error('Failed to fetch KPIs');
    return await res.json();
  } catch (err) {
    console.error('Error fetching KPIs:', err);
    throw err;
  }
}

export async function uploadDocument(applicationId, documentName) {
  try {
    const res = await fetch(`${API_URL}/upload-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, documentName })
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return await res.json();
  } catch (err) {
    console.error('Error uploading document:', err);
    throw err;
  }
}

export async function queryAphAssistant(query, context = null, history = []) {
  try {
    const res = await fetch(`${AI_URL}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, context, history })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Failed to query APH assistant');
    }
    return await res.json();
  } catch (err) {
    console.error('Error querying APH assistant:', err);
    throw err;
  }
}
