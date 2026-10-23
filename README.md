# AICTE Sovereign — Approval Workflow Automation Platform
> **Enterprise Business Process Management (BPM) Prototype**  
> Designed with Apple, Stripe & Uber aesthetic benchmarks. High-contrast Dark Mode, frosted glassmorphism, Framer Motion physics, cryptographic blockchain audit trail, and AI RAG Assistant.

---

## 🚀 Live System Architecture

The platform runs as a high-fidelity tripartite microservice architecture:

| Component | Technology | Local Port | Proxy Route |
| :--- | :--- | :--- | :--- |
| **Frontend** | React (Vite, Pure JS/JSX, Tailwind, Framer Motion) | `http://localhost:5175` | N/A |
| **Backend Core** | Node.js, Express.js (ES Modules, Pure JS) | `http://localhost:5100` | `/api/*` |
| **AI / Microservice** | Python 3.13, FastAPI, Uvicorn, Vector Search | `http://localhost:8000` | `/api/aph-assistant/*` |

---

## 💎 Core Components Implemented

### 1. Dual-Perspective Authentication & Layout
- **Toggle seamlessly** in the top navigation between:
  - **College Admin View**:
    - **Visual Progress Bar**: Real-time lifecycle stepper synced with the state machine (`Scrutiny` → `EVC Queue` → `SAC Final` → `LoA Sanction`).
    - **Statutory Compliance Deadlines**: Tracks registered land lease tenure, Fire Safety NOC (Form-5), Faculty-to-Student Cadre Ratio (1:20), and campus built-up area.
    - **Cryptographic Document Upload Zone**: Drag-and-drop file uploader with live SHA-256 checksum sealing that stamps proof directly into the blockchain ledger.
    - **Deficiency Rectification Notice**: If an application is reverted by an officer, a high-priority alert displays the mandatory rejection reason with a 1-click "Submit Rectification & Resume Scrutiny" trigger.
  - **AICTE Regional Officer View**:
    - **KPI Command Center**: Tracks assigned dockets, SLA breaches, issued Letters of Approval (LoA), and blockchain ledger block count.
    - **EVC Geographic Clusters**: Interactive spatial inspection map with Ant Colony route optimization and video geotagging compliance.

### 2. Dynamic State Machine Sandbox (Kanban View)
- Eliminates stale data tables in favor of a fluid, physics-driven Kanban board.
- **Workflow Columns**:
  1. `Scrutiny Committee` (Stage 1)
  2. `EVC Inspection Queue` (Stage 2)
  3. `SAC Final Sanction` (Stage 3)
  4. `Approval Sanctioned (LoA)` (Certified)
- **Fluid Framer Motion Transitions**: When an officer approves an application, the card slides smoothly across columns via layout animations.
- **Final Approval Celebration**: Approving at SAC Final triggers festive confetti and generates the official AICTE Letter of Approval (LoA).
- **Revert Modal**: Clicking *Revert* opens a frosted glassmorphism modal requiring a mandatory reason for deficiency. Features quick-select standard AICTE APH clauses (Fire NOC expired, Cadre imbalance, Land lease < 30 years).

### 3. Tamper-Proof Audit Ledger (Blockchain View)
- Immutable state transition ledger mimicking a sovereign blockchain.
- **Visual Cryptographic Chain**: Vertical glowing neon links connect blocks with `PrevHash → CurrentHash` pointers.
- **Monospaced Cyan/Emerald Hashes**: Displays truncated SHA-256 hashes (e.g., `0xa288ecf66e...7f05d876`) with 1-click copy-to-clipboard.
- **Real-Time Chain Re-Verification**: Interactive "Re-verify Chain Integrity" button recalculating all Merkle block hashes in real time.

### 4. "Time-Travel" Simulation Panel (DevTools for Judges)
- Accessible via the floating neon badge in the **bottom-left corner** (`Time-Travel Simulation ⚡`).
- **Simulate: Fast Forward 30 Days**:
  - Immediately hits `POST /api/simulate/fast-forward`.
  - Instantly detects expired land leases and SLA deadline breaches.
  - Fires high-contrast red glow borders (`glow-border-alert`) and pulses across affected cards.
  - Generates simulated **WhatsApp & SMS Escalation Notices** on screen dispatched to the College Principal and AICTE Member Secretary.
- **Reset to Real-Time**: Restores all files and timers back to baseline.

### 5. AI-Powered APH Assistant Widget (RAG Chat)
- Floating in the **bottom-right corner** with a sleek glowing launcher.
- Minimalist, glassmorphic iMessage/ChatGPT design.
- Integrates with the **FastAPI Python microservice** (`POST /api/aph-assistant/query`).
- Pre-indexed vector search over official clauses of the **AICTE Approval Process Handbook (APH 2024–27)**:
  - Faculty-Student Cadre Ratios (Clause 3.4.1)
  - Land Tenure & 30-Year Registered Lease (Clause 2.1.3)
  - EVC Inspection Protocols & Video Geotagging (Clause 4.2.8)
  - Standing Appellate Committee Appeal Protocol (Clause 5.1.2)
  - Emerging Technologies / AI Intake expansion (Clause 7.2.4)
- Returns structured citations with chapter, clause numbers, and relevance match confidence.

---

## 🛠️ How to Run

### Option 1: Quick Launch (All Services)
Double-click `run_all.bat` or run:
```bash
./run_all.bat
```

### Option 2: Individual Terminal Commands
```bash
# Terminal 1 - Express Backend
cd backend
npm install
node server.js

# Terminal 2 - FastAPI AI Microservice
cd ai-service
pip install -r requirements.txt
python app.py

# Terminal 3 - React Frontend
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open your browser at: **`http://localhost:5175`** (or the port Vite outputs).
