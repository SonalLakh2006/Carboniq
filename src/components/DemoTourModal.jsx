import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Target, 
  ExternalLink,
  Presentation
} from 'lucide-react';
import { GUIDED_DEMO_STEPS } from '../data/mockData';

export default function DemoTourModal({ isOpen, onClose, onSelectTab }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;
  const step = GUIDED_DEMO_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < GUIDED_DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      onSelectTab(GUIDED_DEMO_STEPS[nextIdx].targetSection);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      onSelectTab(GUIDED_DEMO_STEPS[prevIdx].targetSection);
    }
  };

  const jumpToStep = (idx) => {
    setCurrentStepIdx(idx);
    onSelectTab(GUIDED_DEMO_STEPS[idx].targetSection);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tour-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              background: 'var(--emerald-subtle)', 
              color: 'var(--emerald-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <Presentation size={20} />
            </div>
            <div>
              <div className="tour-step-counter">
                SEMINAR DEMO GUIDE • STEP {step.step} OF {GUIDED_DEMO_STEPS.length}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {step.title}
              </h3>
            </div>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Indicator Dots */}
        <div style={{ padding: '0 24px' }}>
          <div className="tour-indicator-dots">
            {GUIDED_DEMO_STEPS.map((s, idx) => (
              <div 
                key={idx} 
                className={`tour-dot ${idx === currentStepIdx ? 'active' : ''}`}
                onClick={() => jumpToStep(idx)}
                style={{ cursor: 'pointer' }}
                title={`Jump to Step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="modal-body">
          {/* Tagline / Question Pill */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '4px 12px', 
            borderRadius: 'var(--radius-full)', 
            background: 'rgba(16, 185, 129, 0.1)', 
            color: 'var(--emerald-primary)', 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            marginBottom: '16px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <Target size={14} />
            {step.tagline}
          </div>

          {/* Presenter Speech Script */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.7)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '18px', 
            border: '1px solid var(--border-card)', 
            marginBottom: '20px' 
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'var(--cyan-accent)', 
              fontWeight: 700, 
              marginBottom: '8px' 
            }}>
              <Sparkles size={14} />
              Suggested 30-Second Presenter Pitch:
            </div>
            <p style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.7, fontStyle: 'italic' }}>
              “{step.script}”
            </p>
          </div>

          {/* Quick Jump Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Target Screen Active: <strong>{step.targetSection.toUpperCase()}</strong></span>
            <button 
              onClick={() => onSelectTab(step.targetSection)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--emerald-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600 }}
            >
              Focus View Behind <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button 
            className="btn btn-secondary" 
            onClick={handlePrev} 
            disabled={currentStepIdx === 0}
            style={{ opacity: currentStepIdx === 0 ? 0.4 : 1, cursor: currentStepIdx === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Exit Tour
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentStepIdx === GUIDED_DEMO_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
