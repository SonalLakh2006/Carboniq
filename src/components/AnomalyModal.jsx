import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Layers, 
  Sliders, 
  Wrench,
  Gauge
} from 'lucide-react';
import { ANOMALY_INCIDENT } from '../data/mockData';

export default function AnomalyModal({ isOpen, onClose, onNavigateToSimulator }) {
  const [checklist, setChecklist] = useState(ANOMALY_INCIDENT.checklist);

  if (!isOpen) return null;

  const toggleCheck = (idx) => {
    const updated = [...checklist];
    updated[idx].done = !updated[idx].done;
    setChecklist(updated);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(239, 68, 68, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              background: 'var(--rose-subtle)', 
              color: 'var(--rose-anomaly)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)', fontWeight: 700, letterSpacing: '0.05em' }}>
                AI ANOMALY INVESTIGATION • INCIDENT #{ANOMALY_INCIDENT.id}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Electricity-Related Emission Surge (+21.4%)
              </h3>
            </div>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Comparison Bar */}
          <div style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-card)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '18px', 
            marginBottom: '20px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Incident Window: <strong>{ANOMALY_INCIDENT.timestamp}</strong></span>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: 'var(--rose-anomaly)', 
                background: 'var(--rose-subtle)', 
                padding: '2px 8px', 
                borderRadius: '4px' 
              }}>
                Deviation: {ANOMALY_INCIDENT.deviation}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Expected Baseline Range</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-sans)' }}>
                  {ANOMALY_INCIDENT.expected} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>kg CO₂e</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Standard operating profile</div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)' }}>Observed Sensor Telemetry</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rose-anomaly)', fontFamily: 'var(--font-sans)' }}>
                  {ANOMALY_INCIDENT.observed} <span style={{ fontSize: '0.8rem', color: 'var(--rose-anomaly)' }}>kg CO₂e</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--rose-anomaly)' }}>+31 kg CO₂e surge above limit</div>
              </div>
            </div>
          </div>

          {/* Root Cause Hypothesis */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Gauge size={16} style={{ color: 'var(--amber-warning)' }} />
              AI Root-Cause Diagnosis (Simulated Inference)
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, background: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              {ANOMALY_INCIDENT.possibleCause}
            </p>
          </div>

          {/* Equipment Load Attribution */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} style={{ color: 'var(--emerald-primary)' }} />
              Equipment-Level Load Attribution
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ANOMALY_INCIDENT.equipmentBreakdown.map((eq, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '10px 14px', 
                  borderRadius: '8px', 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-card)' 
                }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>{eq.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Status: {eq.status}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rose-anomaly)' }}>{eq.deltaKg}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--rose-anomaly)' }}>{eq.deltaPct} above norm</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Checklist */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wrench size={16} style={{ color: 'var(--cyan-accent)' }} />
              Mitigation Checklist (Facility Operations)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {checklist.map((item, idx) => (
                <label 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 12px', 
                    borderRadius: '6px', 
                    background: item.done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)', 
                    border: '1px solid var(--border-card)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    color: item.done ? 'var(--emerald-primary)' : 'var(--text-muted)'
                  }}
                  onClick={() => toggleCheck(idx)}
                >
                  <input 
                    type="checkbox" 
                    checked={item.done} 
                    onChange={() => {}} 
                    style={{ accentColor: 'var(--emerald-primary)', cursor: 'pointer' }}
                  />
                  <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                    {item.task}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="disclaimer-banner" style={{ marginTop: '16px' }}>
            <span>ℹ️ <strong>Academic Note:</strong> This anomaly is generated using simulated sensor telemetry demonstrating how threshold & variance detection triggers operational alerts in real-world facilities.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              onClose();
              if (onNavigateToSimulator) onNavigateToSimulator();
            }}
          >
            <Sliders size={15} />
            Test Mitigation in Simulator
          </button>
        </div>
      </div>
    </div>
  );
}
