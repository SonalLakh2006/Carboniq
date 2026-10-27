import React, { useState } from 'react';
import { 
  Compass, 
  Heart, 
  Target, 
  Lightbulb, 
  Cpu, 
  TestTube, 
  RotateCw, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function DesignThinkingView() {
  const [activeStage, setActiveStage] = useState(3); // Default on Stage 4: Prototype

  const STAGES = [
    {
      step: 1,
      name: 'EMPATHIZE',
      icon: Heart,
      color: '#ec4899',
      title: '1. Empathize with Industrial & Facility Operators',
      question: 'What friction points do sustainability and plant managers experience?',
      summary: 'Conducted field research and stakeholder discovery with factory managers, college campus administrators, and environmental officers.',
      findings: [
        'Carbon audits rely on historical utility electricity bills arriving 30 to 45 days after the emissions occurred.',
        'Data collection is heavily manual, spreadsheet-driven, error-prone, and disconnected across departments.',
        'Current tools report raw totals (kg CO₂e) but offer zero explanation of root causes or operational remedies.'
      ],
      seminarTip: '“We found that managers do not lack environmental motivation—they lack real-time visibility and actionable operational insights.”'
    },
    {
      step: 2,
      name: 'DEFINE',
      icon: Target,
      color: '#f59e0b',
      title: '2. Define the Core Engineering Problem Statement',
      question: 'How might we convert passive carbon accounting into proactive decision intelligence?',
      summary: 'Synthesized stakeholder interviews into four fundamental user queries that traditional software fails to answer.',
      findings: [
        'Core Product Philosophy: Move from WHAT happened to WHY, WHAT NEXT, and WHAT TO DO.',
        'Eliminate the latency between emission spikes and corrective maintenance.',
        'Provide decision-makers with quantified scenario simulation before operational changes are implemented.'
      ],
      seminarTip: '“Our problem definition was clear: Don’t build another static reporting dashboard. Build a closed-loop intelligence system.”'
    },
    {
      step: 3,
      name: 'IDEATE',
      icon: Lightbulb,
      color: '#8b5cf6',
      title: '3. Ideate Multi-Disciplinary AI & IoT Solutions',
      question: 'What architectural combination produces rapid situational awareness?',
      summary: 'Explored and brainstormed system concepts across AI heuristics, edge IoT telemetry, time-series forecasting, and what-if simulation.',
      findings: [
        'Decomposed total footprint into distinct activity vectors (Electricity, Fuel, Transport, HVAC).',
        'Designed the signature “Why Did Emissions Change?” mathematical attribution model.',
        'Created an interactive What-If scenario engine allowing real-time sensitivity analysis.'
      ],
      seminarTip: '“During ideation, we realized that predictive forecasting and scenario simulation are the critical bridges between data and action.”'
    },
    {
      step: 4,
      name: 'PROTOTYPE',
      icon: Cpu,
      color: '#10b981',
      title: '4. Build the CARBONIQ Proof-of-Concept Prototype',
      question: 'How do we demonstrate the full lifecycle in a stable, honest seminar demonstration?',
      summary: 'Developed the CARBONIQ web application using React, Vite, and high-contrast minimal dark aesthetic.',
      findings: [
        'Built a complete interactive platform with realistic simulated sensor streams (GreenTech Manufacturing).',
        'Maintained strict academic honesty: all figures explicitly marked as Demo Data and Prototype Logic.',
        'Engineered an integrated 3-minute seminar demo tour with embedded presenter talking scripts.'
      ],
      seminarTip: '“Our prototype proves technical feasibility and user journey viability without making false claims of physical industrial deployment.”'
    },
    {
      step: 5,
      name: 'TEST',
      icon: TestTube,
      color: '#06b6d4',
      title: '5. Test, Evaluate & Iterative Refinement',
      question: 'Does the system communicate situational awareness within 5–10 seconds?',
      summary: 'Iterated through user walkthroughs with fellow CSE students, faculty mentors, and simulated operator workflows.',
      findings: [
        'Feedback: Simplified the overview cards to show dominant contributors at a single glance.',
        'Feedback: Added equipment sub-panel drilldown to the anomaly detection drawer for engineering credibility.',
        'Feedback: Linked recommendation cards directly to the What-If Simulator for seamless exploration.'
      ],
      seminarTip: '“Testing confirmed that user feedback must continuously loop back into defining better algorithms and refined prototype interactions.”'
    }
  ];

  const current = STAGES[activeStage];

  return (
    <div className="design-thinking-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Compass size={24} style={{ color: 'var(--emerald-primary)' }} />
            Design Thinking Methodology
          </h2>
          <p className="page-subtitle">
            The 5-stage human-centered engineering framework guiding the conceptualization and development of CARBONIQ.
          </p>
        </div>

        <div className="prototype-tag">
          <RotateCw size={13} />
          Iterative Feedback Loop
        </div>
      </div>

      {/* Circular / Iterative Process Stepper */}
      <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div className="card-header" style={{ marginBottom: '18px' }}>
          <div className="card-title">
            Circular Design Thinking Lifecycle
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Continuous feedback loops refine each stage</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStage === idx;

            return (
              <div 
                key={s.step}
                onClick={() => setActiveStage(idx)}
                style={{ 
                  padding: '16px 14px', 
                  borderRadius: 'var(--radius-md)', 
                  background: isSelected ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.02)', 
                  border: `1px solid ${isSelected ? s.color : 'var(--border-card)'}`, 
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? `0 0 16px -3px ${s.color}44` : 'none'
                }}
              >
                <div style={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%', 
                  background: `${s.color}18`, 
                  color: s.color,
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: s.color, textTransform: 'uppercase', marginBottom: '2px' }}>
                  STAGE {s.step}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {s.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="card" style={{ border: `1px solid ${current.color}44`, marginBottom: '24px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 'var(--radius-md)', 
              background: `${current.color}20`, 
              color: current.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <current.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: current.color, fontWeight: 700, textTransform: 'uppercase' }}>
                STAGE {current.step} OF 5
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {current.title}
              </h3>
            </div>
          </div>

          <span className="card-badge" style={{ color: current.color, borderColor: `${current.color}44` }}>
            {current.question}
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '20px' }}>
          {current.summary}
        </p>

        {/* Findings List */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
            Key Engineering Discoveries & Implementation Actions:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {current.findings.map((item, fIdx) => (
              <div 
                key={fIdx} 
                style={{ 
                  padding: '12px 14px', 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid var(--border-card)',
                  fontSize: '0.85rem',
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  lineHeight: 1.5
                }}
              >
                <CheckCircle2 size={16} style={{ color: current.color, marginTop: '2px', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seminar Presenter Pitch Prompt */}
        <div style={{ 
          padding: '14px 18px', 
          background: 'rgba(15, 23, 42, 0.7)', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Sparkles size={18} style={{ color: current.color, flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: '#f1f5f9', fontStyle: 'italic', lineHeight: 1.5 }}>
            <strong style={{ color: current.color, fontStyle: 'normal' }}>Seminar Speaking Prompt: </strong>
            {current.seminarTip}
          </div>
        </div>
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Academic Presentation Note:</strong> Design thinking emphasizes that engineering systems should be validated iteratively with end users. In this project, faculty and peer feedback directly shaped the UI clarity and decision-support workflow.</span>
      </div>
    </div>
  );
}
