import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Wrench, 
  Sliders, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ANOMALY_INCIDENT } from '../data/mockData';

export default function AnomalyView({ 
  onOpenWhyChangedModal, 
  onNavigateToTab, 
  onShowToast 
}) {
  const [checklist, setChecklist] = useState(ANOMALY_INCIDENT.checklist);
  const [acknowledged, setAcknowledged] = useState(false);

  const toggleCheck = (idx) => {
    const updated = [...checklist];
    updated[idx].done = !updated[idx].done;
    setChecklist(updated);
    if (onShowToast) {
      onShowToast(updated[idx].done ? `Task marked completed: ${updated[idx].task}` : `Task reopened: ${updated[idx].task}`);
    }
  };

  const handleAcknowledge = () => {
    setAcknowledged(!acknowledged);
    if (onShowToast) {
      onShowToast(acknowledged ? 'Incident status reverted to Active Investigating' : 'Incident marked as Acknowledged by Plant Manager');
    }
  };

  return (
    <div className="anomaly-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <AlertTriangle size={24} style={{ color: 'var(--rose-anomaly)' }} />
            Anomaly Detection & Incident Response
          </h2>
          <p className="page-subtitle">
            Automated statistical variance detection flagging abnormal carbon emissions before month-end billing audits.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="prototype-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose-anomaly)', display: 'inline-block' }}></span>
            Simulated Sensor Anomaly
          </span>
          <button 
            className={`btn ${acknowledged ? 'btn-outline-emerald' : 'btn-secondary'}`}
            onClick={handleAcknowledge}
          >
            <ShieldCheck size={16} style={{ color: acknowledged ? 'var(--emerald-primary)' : 'var(--text-muted)' }} />
            {acknowledged ? 'Incident Acknowledged' : 'Acknowledge Incident'}
          </button>
        </div>
      </div>

      {/* Main Incident Spotlight Card */}
      <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', marginBottom: '24px' }}>
        <div className="card-header" style={{ borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="anomaly-icon-pulsing">
              <AlertTriangle size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Active High-Severity Alert • Incident ID: {ANOMALY_INCIDENT.id}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {ANOMALY_INCIDENT.title}
              </h3>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              padding: '4px 10px', 
              background: acknowledged ? 'var(--emerald-subtle)' : 'var(--rose-subtle)', 
              color: acknowledged ? 'var(--emerald-primary)' : 'var(--rose-anomaly)', 
              borderRadius: '4px', 
              fontWeight: 700, 
              border: `1px solid ${acknowledged ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` 
            }}>
              {acknowledged ? 'ACKNOWLEDGED' : 'ACTIVE INVESTIGATION'}
            </span>
            <span className="confidence-chip" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px' }}>
              Inference Confidence: {ANOMALY_INCIDENT.confidence}%
            </span>
          </div>
        </div>

        {/* Expected vs Observed Telemetry Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '20px 0' }}>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Expected Baseline Range</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0' }}>
              {ANOMALY_INCIDENT.expected} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>kg CO₂e</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Historical 7-day rolling median profile</div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)', fontWeight: 600, textTransform: 'uppercase' }}>Observed Peak Reading</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--rose-anomaly)', margin: '4px 0' }}>
              {ANOMALY_INCIDENT.observed} <span style={{ fontSize: '0.85rem', color: 'var(--rose-anomaly)' }}>kg CO₂e</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)' }}>+31 kg CO₂e surge above upper tolerance limit</div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--amber-warning)', fontWeight: 600, textTransform: 'uppercase' }}>Calculated Deviation</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--amber-warning)', margin: '4px 0' }}>
              {ANOMALY_INCIDENT.deviation}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--amber-warning)' }}>Z-Score &gt; 3.2 (Statistical Outlier)</div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--purple-ai)', fontWeight: 600, textTransform: 'uppercase' }}>Incident Window</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '8px 0 4px' }}>
              {ANOMALY_INCIDENT.timestamp}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Coincides with afternoon shift transition</div>
          </div>
        </div>

        {/* Root-Cause Attribution Summary */}
        <div className="ai-explanation-box" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--purple-ai)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
            <Sparkles size={16} />
            AI Root-Cause Diagnosis:
          </div>
          <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>
            {ANOMALY_INCIDENT.possibleCause}
          </p>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--emerald-primary)' }}>
            <strong>Recommended Immediate Action:</strong> {ANOMALY_INCIDENT.recommendedAction}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button className="btn btn-secondary" onClick={onOpenWhyChangedModal}>
            <HelpCircle size={15} style={{ color: 'var(--purple-ai)' }} />
            View Mathematical Attribution Breakdown
          </button>
          <button className="btn btn-primary" onClick={() => onNavigateToTab('simulator')}>
            <Sliders size={15} />
            Simulate Corrective Shifting
          </button>
        </div>
      </div>

      {/* Two-Column Section: Affected Sub-systems & Incident Chronology */}
      <div className="dash-grid-equal">
        {/* Affected Equipment Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Wrench size={18} style={{ color: 'var(--cyan-accent)' }} />
              Telemetry Sub-Panel Deviation Breakdown
            </div>
            <span className="card-badge">3 Sensors Alerting</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Sub-meter readings correlated during the 14:00 surge window:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ANOMALY_INCIDENT.equipmentBreakdown.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '12px 14px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)', fontWeight: 600, marginTop: '2px' }}>
                    Status: {item.status}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--rose-anomaly)' }}>
                    {item.deltaKg}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.deltaPct} vs baseline
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(6, 182, 212, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--cyan-accent)', fontWeight: 700, marginBottom: '4px' }}>
              💡 System Insight:
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Central Chiller Unit #2 alone accounts for over 59% of the net abnormal surge. Throttling or resetting this unit eliminates the majority of the spike.
            </div>
          </div>
        </div>

        {/* Corrective Action Checklist */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={18} style={{ color: 'var(--emerald-primary)' }} />
              Mitigation & Verification Checklist
            </div>
            <span className="card-badge">{checklist.filter(c => c.done).length} / {checklist.length} Completed</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Recommended plant operational procedures to resolve and verify the anomaly:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => toggleCheck(idx)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 14px', 
                  background: item.done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)', 
                  border: `1px solid ${item.done ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-card)'}`, 
                  borderRadius: 'var(--radius-md)', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={item.done} 
                  onChange={() => {}} 
                  style={{ width: 18, height: 18, accentColor: 'var(--emerald-primary)', cursor: 'pointer' }}
                />
                <span style={{ 
                  fontSize: '0.85rem', 
                  color: item.done ? 'var(--emerald-primary)' : 'var(--text-main)', 
                  textDecoration: item.done ? 'line-through' : 'none',
                  flex: 1 
                }}>
                  {item.task}
                </span>
                {item.done && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>
                    RESOLVED
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Chronological Incident Audit Log */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} style={{ color: 'var(--text-dim)' }} />
              Incident Chronology:
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>• <strong>13:45</strong> — Baseline electrical draw stable at 14.2 kg CO₂e/hr.</div>
              <div>• <strong>14:00</strong> — Spike to 24.8 kg CO₂e/hr recorded on Chiller Submeter #2.</div>
              <div>• <strong>14:02</strong> — Anomaly Engine flags +21.4% deviation exceeding 3σ statistical control limit.</div>
              <div>• <strong>14:05</strong> — Automated root-cause correlation attributes 59% share to Chiller #2 lockup.</div>
              <div>• <strong>14:15</strong> — Advisory alert published to CARBONIQ dashboard.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Academic Prototype Note:</strong> In this demonstration, anomaly detection is triggered via a transparent rule-based statistical threshold (rolling 7-day μ ± 2.5σ). In a production system, this would be replaced with unsupervised ML (Isolation Forests or Autoencoder neural networks) trained on multi-month continuous operational telemetry.</span>
      </div>
    </div>
  );
}
