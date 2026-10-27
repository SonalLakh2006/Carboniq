import React from 'react';
import { Sparkles, X, TrendingUp, Lightbulb, CheckCircle, HelpCircle } from 'lucide-react';
import { WHY_EMISSIONS_CHANGED } from '../data/mockData';

export default function WhyChangedModal({ isOpen, onClose, onNavigateToRecommendations }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              background: 'var(--purple-subtle)', 
              color: 'var(--purple-ai)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--purple-ai)', fontWeight: 700, letterSpacing: '0.05em' }}>
                SIGNATURE REASONING ENGINE • {WHY_EMISSIONS_CHANGED.engineVersion}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {WHY_EMISSIONS_CHANGED.headline}
              </h3>
            </div>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Summary Banner */}
          <div style={{ 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-card)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '16px', 
            marginBottom: '20px' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Factor Decomposition Summary</span>
              <span className="confidence-chip">Confidence: {WHY_EMISSIONS_CHANGED.confidence}%</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {WHY_EMISSIONS_CHANGED.summary}
            </p>
          </div>

          {/* Drivers List */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
              Relative Contribution by Emission Source
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {WHY_EMISSIONS_CHANGED.drivers.map((driver, idx) => (
                <div key={idx} className="driver-bar-item">
                  <div className="driver-info">
                    <span className="driver-name">
                      {driver.source}
                      <span style={{ 
                        fontSize: '0.7rem', 
                        marginLeft: '8px', 
                        padding: '1px 6px', 
                        borderRadius: '4px',
                        background: driver.sharePct > 50 ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
                        color: driver.sharePct > 50 ? 'var(--rose-anomaly)' : 'var(--text-muted)'
                      }}>
                        {driver.role}
                      </span>
                    </span>
                    <span className="driver-val" style={{ 
                      color: driver.deltaPercent.startsWith('+') ? (driver.sharePct > 50 ? 'var(--rose-anomaly)' : 'var(--amber-warning)') : 'var(--emerald-primary)' 
                    }}>
                      {driver.deltaPercent} ({driver.deltaCo2e})
                    </span>
                  </div>
                  <div className="driver-track">
                    <div 
                      className={`driver-fill ${driver.fillClass}`} 
                      style={{ width: `${Math.min(Math.abs(driver.sharePct), 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Interpretation Box */}
          <div className="ai-explanation-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: 'var(--purple-ai)', fontWeight: 700, fontSize: '0.78rem' }}>
              <HelpCircle size={15} />
              AI Operational Interpretation:
            </div>
            {WHY_EMISSIONS_CHANGED.aiInterpretation}
          </div>

          <div className="disclaimer-banner" style={{ marginTop: '16px' }}>
            <span>ℹ️ <strong>Demonstration Note:</strong> Shows how multi-factor attribution isolates operational causes so management can act on the root source rather than guessing.</span>
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
              if (onNavigateToRecommendations) onNavigateToRecommendations();
            }}
          >
            <Lightbulb size={15} />
            View Suggested Interventions
          </button>
        </div>
      </div>
    </div>
  );
}
