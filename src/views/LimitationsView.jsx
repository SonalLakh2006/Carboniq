import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Rocket, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  Layers, 
  Lock, 
  Cpu, 
  Database,
  ArrowRight
} from 'lucide-react';

export default function LimitationsView() {
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' | 'limitations' | 'future'

  const LIMITATIONS = [
    {
      title: 'Input Data Quality & Dependency',
      severity: 'High Impact',
      color: 'var(--rose-anomaly)',
      desc: 'The accuracy of any carbon calculation is strictly bounded by the fidelity of incoming telemetry. Missing sensor pings, packet drops, or inaccurate sub-meter calibration directly alter calculated CO₂e totals.'
    },
    {
      title: 'Regional Emission Factor Variances',
      severity: 'Moderate Impact',
      color: 'var(--amber-warning)',
      desc: 'Grid emission factors (e.g. India CEA 0.71 kg/kWh vs UK DEFRA 0.207 kg/kWh) vary by time of day, season, and power grid dispatch mix. Static factors provide an approximation rather than continuous marginal emissions.'
    },
    {
      title: 'Cold-Start Requirement for Machine Learning',
      severity: 'Technical Constraint',
      color: 'var(--cyan-accent)',
      desc: 'Advanced supervised ML models require 6 to 12 months of labeled seasonal operational data before reliable anomaly and predictive patterns can be established without false positive alert fatigue.'
    },
    {
      title: 'Physical Infrastructure & Integration Overhead',
      severity: 'Deployment Challenge',
      color: 'var(--purple-ai)',
      desc: 'Deploying in brownfield legacy industrial factories requires physical RS-485 wiring, current transformer (CT) clamps, safety shutdowns, and network isolation from critical plant SCADA systems.'
    },
    {
      title: 'Industrial Data Privacy & IP Governance',
      severity: 'Security Consideration',
      color: 'var(--blue-info)',
      desc: 'Detailed energy telemetry can reveal proprietary factory production rates, shift schedules, and batch sizes to competitors if cloud transmission is unencrypted or multi-tenant isolation is breached.'
    }
  ];

  const FUTURE_SCOPE = [
    {
      title: 'Physical Edge Gateway Deployment',
      timeline: 'Phase 1 (6–12 Months)',
      desc: 'Install physical LoRaWAN / Modbus RTU gateway hardware on campus electrical panels and auxiliary chiller units to replace simulated feeds with live telemetry.'
    },
    {
      title: 'Deep Learning Forecasting (LSTM / Transformers)',
      timeline: 'Phase 2 (12–18 Months)',
      desc: 'Transition from transparent heuristic regression to recurrent LSTM neural networks that ingest local microclimate weather forecasts and factory ERP production queues.'
    },
    {
      title: 'Blockchain-Anchored Carbon Credit Verification',
      timeline: 'Phase 3 (18–24 Months)',
      desc: 'Generate cryptographic zero-knowledge hashes of audited hourly emissions on a public/consortium ledger to enable automated, tamper-proof carbon credit certification.'
    },
    {
      title: 'Generative AI Sustainability Copilot',
      timeline: 'Phase 3 (Ongoing)',
      desc: 'Natural language conversational interface enabling facility managers to ask: “What drove yesterday’s peak in Plant 2?” and receive instant verified diagnostic charts.'
    },
    {
      title: 'Autonomous BMS Closed-Loop Control',
      timeline: 'Long-Term Vision',
      desc: 'Two-way integration enabling the AI engine to directly command building management systems (BMS) to throttle variable frequency drives (VFDs) during peak grid carbon intensity windows.'
    }
  ];

  return (
    <div className="limitations-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <ShieldAlert size={24} style={{ color: 'var(--amber-warning)' }} />
            Academic Limitations & Future Scope
          </h2>
          <p className="page-subtitle">
            Transparent disclosure of technical boundaries, honest academic constraints, and future engineering roadmap.
          </p>
        </div>

        <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
          <button 
            className={`time-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Prototype vs Production
          </button>
          <button 
            className={`time-btn ${activeTab === 'limitations' ? 'active' : ''}`}
            onClick={() => setActiveTab('limitations')}
          >
            System Limitations
          </button>
          <button 
            className={`time-btn ${activeTab === 'future' ? 'active' : ''}`}
            onClick={() => setActiveTab('future')}
          >
            Future Scope Roadmap
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'comparison' && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <div className="card-title">
              Clear Separation: Current Prototype vs Future Production System
            </div>
            <span className="card-badge">Honesty Matrix</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            In adherence to strict academic seminar integrity, this matrix explicitly differentiates what the prototype currently demonstrates from future commercial deliverables:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>System Dimension</th>
                  <th style={{ width: '38%', color: 'var(--cyan-accent)' }}>CURRENT PROTOTYPE (Seminar Demonstration)</th>
                  <th style={{ width: '40%', color: 'var(--emerald-primary)' }}>FUTURE PRODUCTION SYSTEM (Commercial Roadmap)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Data Ingestion</strong></td>
                  <td>Simulated IoT streams emulating electrical, fuel, and fleet meters (GreenTech Manufacturing dataset).</td>
                  <td>Certified physical Modbus RTU/TCP meters, BACnet BMS gateways, and cellular OBD-II fleet dongles.</td>
                </tr>
                <tr>
                  <td><strong>AI / ML Analytics</strong></td>
                  <td>Transparent heuristic & statistical variance engine (3σ rolling window decomposition, 87% confidence).</td>
                  <td>Trained unsupervised Isolation Forests / Autoencoders + LSTM multivariate time-series neural networks.</td>
                </tr>
                <tr>
                  <td><strong>Carbon Calculation</strong></td>
                  <td>Formulaic Scope 1/2/3 accounting using CEA / EPA / DEFRA regional grid emission factor constants.</td>
                  <td>Dynamic sub-hourly marginal grid carbon intensity APIs (e.g. WattTime, ElectricityMaps).</td>
                </tr>
                <tr>
                  <td><strong>Decision Support</strong></td>
                  <td>Interactive What-If sensitivity simulator with preset levers and scenario estimates.</td>
                  <td>Mixed-integer linear programming (MILP) optimization solver coupled to automated BMS dispatch.</td>
                </tr>
                <tr>
                  <td><strong>Audit & Compliance</strong></td>
                  <td>Simulated GHG Protocol executive reports, CSV telemetry export, and printable audit sheets.</td>
                  <td>Third-party verified ISO 14064 compliance reports, blockchain cryptographic ledger, and ESG filing exports.</td>
                </tr>
                <tr>
                  <td><strong>Deployment Scope</strong></td>
                  <td>Academic browser web application for 3–5 min seminar presentation to students and faculty.</td>
                  <td>High-availability microservices Kubernetes cluster with enterprise RBAC and multi-facility tenants.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'limitations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--amber-warning)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--amber-warning)', marginBottom: '6px' }}>
              <AlertTriangle size={18} />
              Honest Engineering Limitations Identified During Prototyping
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Addressing these constraints is essential for an engineering seminar evaluation:
            </p>
          </div>

          {LIMITATIONS.map((lim, idx) => (
            <div key={idx} className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: `${lim.color}20`, color: lim.color, borderRadius: '4px', fontWeight: 700 }}>
                    {lim.severity}
                  </span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {lim.title}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {lim.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'future' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--emerald-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--emerald-primary)', marginBottom: '6px' }}>
              <Rocket size={18} />
              Future Engineering & Commercial Development Roadmap
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Phase-wise progression from proof-of-concept to enterprise industrial deployment:
            </p>
          </div>

          {FUTURE_SCOPE.map((item, idx) => (
            <div key={idx} className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', borderRadius: '4px', fontWeight: 700 }}>
                    {item.timeline}
                  </span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.title}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Honest Academic Callout */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Academic Integrity Confirmation:</strong> This platform does not claim real-world industrial energy reduction achievements. All calculations, predictions, and recommendations are demonstrated conceptually for educational and design evaluation.</span>
      </div>
    </div>
  );
}
