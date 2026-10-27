import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Sliders, 
  BrainCircuit
} from 'lucide-react';
import { WHY_EMISSIONS_CHANGED } from '../data/mockData';

export default function AIInsightsView({ onOpenWhyChangedModal, onNavigateToTab }) {
  return (
    <div className="ai-insights-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Sparkles size={24} style={{ color: 'var(--purple-ai)' }} />
            AI Insight & Root-Cause Intelligence Engine
          </h2>
          <p className="page-subtitle">
            Automated multi-factor attribution answering <em>“WHY did emissions change?”</em> rather than simple telemetry logging.
          </p>
        </div>

        <div className="ai-chip">
          <BrainCircuit size={15} />
          Prototype Inference Engine v1.2
        </div>
      </div>

      {/* Signature Insight Showcase */}
      <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.4)', marginBottom: '24px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              background: 'var(--purple-subtle)', 
              color: 'var(--purple-ai)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <HelpCircle size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--purple-ai)', fontWeight: 700, textTransform: 'uppercase' }}>
                Signature Core Feature
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {WHY_EMISSIONS_CHANGED.headline}
              </div>
            </div>
          </div>
          <span className="confidence-chip" style={{ fontSize: '0.8rem', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--purple-ai)', padding: '4px 10px', borderRadius: '4px' }}>
            Model Confidence: {WHY_EMISSIONS_CHANGED.confidence}%
          </span>
        </div>

        {/* Narrative & Summary */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          {WHY_EMISSIONS_CHANGED.summary} Traditional carbon software displays the net rise (+8.4%), leaving managers to speculate. CARBONIQ calculates the exact vector contributions below:
        </p>

        {/* Factor Decomposition Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {WHY_EMISSIONS_CHANGED.drivers.map((driver, idx) => (
            <div key={idx} className="driver-bar-item">
              <div className="driver-info">
                <span className="driver-name" style={{ fontSize: '0.88rem' }}>
                  {driver.source}
                  <span style={{ 
                    fontSize: '0.72rem', 
                    marginLeft: '10px', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    background: driver.sharePct > 50 ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
                    color: driver.sharePct > 50 ? 'var(--rose-anomaly)' : 'var(--text-muted)',
                    fontWeight: 700
                  }}>
                    {driver.role}
                  </span>
                </span>
                <span className="driver-val" style={{ 
                  fontSize: '0.9rem',
                  color: driver.deltaPercent.startsWith('+') ? (driver.sharePct > 50 ? 'var(--rose-anomaly)' : 'var(--amber-warning)') : 'var(--emerald-primary)' 
                }}>
                  {driver.deltaPercent} ({driver.deltaCo2e})
                </span>
              </div>
              <div className="driver-track" style={{ height: 8 }}>
                <div 
                  className={`driver-fill ${driver.fillClass}`} 
                  style={{ width: `${Math.min(Math.abs(driver.sharePct), 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Operational Context Card */}
        <div className="ai-explanation-box" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--purple-ai)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
            <Sparkles size={16} />
            Diagnostic Correlation Engine:
          </div>
          <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.7 }}>
            {WHY_EMISSIONS_CHANGED.aiInterpretation}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button className="btn btn-secondary" onClick={onOpenWhyChangedModal}>
            Inspect Mathematical Attribution
          </button>
          <button className="btn btn-primary" onClick={() => onNavigateToTab('simulator')}>
            <Sliders size={15} />
            Simulate Mitigation Actions
          </button>
        </div>
      </div>

      {/* Behind the Scenes: How the Prototype AI Logic Works */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BrainCircuit size={18} style={{ color: 'var(--emerald-primary)' }} />
            Prototype AI Inference Architecture
          </div>
          <span className="card-badge">Technical Transparency</span>
        </div>

        <div className="dash-grid-3">
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--emerald-primary)', fontWeight: 700, marginBottom: '4px' }}>
              STEP 1: TIME-SERIES DECOMPOSITION
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Separates daily cyclic baseline load from operational shift spikes using 7-day rolling window variance calculation.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--cyan-accent)', fontWeight: 700, marginBottom: '4px' }}>
              STEP 2: CORRELATION ENGINE
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Correlates electrical sub-panel telemetry against HVAC chiller power factor and transport dispatch schedules.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--purple-ai)', fontWeight: 700, marginBottom: '4px' }}>
              STEP 3: ACTIONABLE SYNTHESIS
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Translates mathematical attribution into plain-English operational guidance prioritized by impact and feasibility.
            </p>
          </div>
        </div>

        <div className="disclaimer-banner" style={{ marginTop: '16px' }}>
          <span>ℹ️ <strong>Honest Academic Note:</strong> For this second-year seminar prototype, a transparent rule-based statistical decomposition engine is implemented. In future work, this will be substituted with a trained Random Forest / LSTM neural network once sufficient real-world labeled industrial datasets are gathered.</span>
        </div>
      </div>
    </div>
  );
}
