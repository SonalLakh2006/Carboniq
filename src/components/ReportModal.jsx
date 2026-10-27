import React from 'react';
import { 
  FileText, 
  X, 
  Printer, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Leaf, 
  AlertTriangle 
} from 'lucide-react';
import { KPI_DATA, EMISSION_SOURCES, WHY_EMISSIONS_CHANGED, AI_RECOMMENDATIONS } from '../data/mockData';

export default function ReportModal({ isOpen, onClose, facilityName = 'GreenTech Manufacturing – Demo Facility' }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '820px' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: '8px', 
              background: 'var(--blue-subtle)', 
              color: 'var(--blue-info)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--blue-info)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                EXECUTIVE AUDIT REPORT • GHG PROTOCOL COMPLIANT LAYOUT
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Weekly Carbon Footprint & Decarbonization Audit
              </h3>
            </div>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Report Content Body */}
        <div className="modal-body" style={{ background: '#0b101c', padding: '28px' }}>
          {/* Document Masthead */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            paddingBottom: '20px', 
            borderBottom: '2px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
                  <Leaf size={15} />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.05em', color: '#ffffff' }}>
                  CARBONIQ
                </span>
                <span style={{ fontSize: '0.7rem', padding: '1px 6px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', borderRadius: '4px' }}>
                  Demo Audit
                </span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                {facilityName}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Reporting Period: Past 7 Days (Simulated Operational Week)
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#94a3b8' }}>
              <div><strong>Audit Report Ref:</strong> CQ-2026-0915-W</div>
              <div><strong>Generated Date:</strong> {new Date().toLocaleDateString()}</div>
              <div><strong>Standard:</strong> ISO 14064-1 / GHG Protocol</div>
            </div>
          </div>

          {/* Section 1: Executive KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Gross Footprint</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>
                1,248 <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>kg CO₂e</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--rose-anomaly)' }}>+8.4% vs baseline average</div>
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Energy Consumed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>
                2,840 <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>kWh</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Electricity main incomer meter</div>
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Carbon Intensity</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--emerald-primary)', margin: '4px 0' }}>
                0.44 <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>kg/kWh</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Within industrial light benchmark</div>
            </div>
          </div>

          {/* Section 2: Source Breakdown Table */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--emerald-primary)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Source Accounting Breakdown
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>Activity Source</th>
                  <th style={{ padding: '8px 10px' }}>Scope</th>
                  <th style={{ padding: '8px 10px' }}>Activity Volume</th>
                  <th style={{ padding: '8px 10px' }}>CO₂e Footprint</th>
                  <th style={{ padding: '8px 10px' }}>Share %</th>
                </tr>
              </thead>
              <tbody>
                {EMISSION_SOURCES.map((s, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '8px 10px', color: '#94a3b8' }}>{s.scope}</td>
                    <td style={{ padding: '8px 10px' }}>{s.consumption}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700 }}>{s.co2e} kg</td>
                    <td style={{ padding: '8px 10px' }}>{s.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: AI Diagnosis Summary */}
          <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.25)', marginBottom: '24px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--purple-ai)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              AI Multi-Factor Attribution & Anomaly Finding
            </div>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6 }}>
              {WHY_EMISSIONS_CHANGED.aiInterpretation}
            </p>
          </div>

          {/* Section 4: Prioritized Recommendations */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-accent)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Prioritized Decarbonization Action Plan
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {AI_RECOMMENDATIONS.slice(0, 3).map((rec, idx) => (
                <div key={idx} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: rec.priority === 'HIGH' ? 'var(--rose-anomaly)' : 'var(--amber-warning)', marginRight: '8px' }}>
                      [{rec.priority}]
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#f8fafc', fontWeight: 600 }}>
                      {rec.action}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>
                    {rec.potentialImpact.split(' ')[1]} {rec.potentialImpact.split(' ')[2]} {rec.potentialImpact.split(' ')[3]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign-Off Footer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#94a3b8' }}>
            <div>
              <strong>Audit Generated:</strong> CARBONIQ Autonomous Engine v1.2 (Demo Data)
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong>Signature:</strong> <em>[Digital Facility Lead Verification]</em>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Preview
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={15} />
            Print / Save to PDF
          </button>
        </div>
      </div>
    </div>
  );
}
