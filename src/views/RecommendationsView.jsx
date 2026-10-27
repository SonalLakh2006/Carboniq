import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Sliders, 
  Filter
} from 'lucide-react';
import { AI_RECOMMENDATIONS } from '../data/mockData';

export default function RecommendationsView({ onNavigateToTab, onShowToast }) {
  const [recommendations, setRecommendations] = useState(
    AI_RECOMMENDATIONS.map(r => ({ ...r, status: 'Open' }))
  );
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const toggleStatus = (id) => {
    const updated = recommendations.map(rec => {
      if (rec.id === id) {
        const nextStatus = rec.status === 'Open' ? 'In Review' : rec.status === 'In Review' ? 'Implemented' : 'Open';
        if (onShowToast) {
          onShowToast(`${rec.id} status updated to: ${nextStatus}`);
        }
        return { ...rec, status: nextStatus };
      }
      return rec;
    });
    setRecommendations(updated);
  };

  const filteredList = recommendations.filter(r => {
    if (selectedFilter === 'ALL') return true;
    return r.priority === selectedFilter;
  });

  return (
    <div className="recommendations-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Lightbulb size={24} style={{ color: 'var(--purple-ai)' }} />
            Actionable AI Recommendations
          </h2>
          <p className="page-subtitle">
            Prioritized operational interventions transforming emission data into measurable decarbonization actions.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-primary" onClick={() => onNavigateToTab('simulator')}>
            <Sliders size={15} />
            Test in What-If Simulator
          </button>
        </div>
      </div>

      {/* Aggregate Impact Potential Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)', 
        border: '1px solid rgba(16, 185, 129, 0.3)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '20px 24px', 
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
            <Sparkles size={14} />
            Cumulative Decarbonization Potential
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
            Up to 155 kg CO₂e/day Estimated Potential Reduction
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Implementing these 4 operational interventions can yield an estimated <strong>12.4% reduction</strong> in total facility footprint with zero or minimal capital expenditure.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ padding: '12px 16px', background: 'rgba(10, 14, 23, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>High Priority</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--rose-anomaly)' }}>1 Action</div>
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(10, 14, 23, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Medium Priority</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber-warning)' }}>2 Actions</div>
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(10, 14, 23, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Active/Implemented</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-primary)' }}>
              {recommendations.filter(r => r.status === 'Implemented').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> Filter Priority:
          </span>
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
            <button 
              key={p}
              onClick={() => setSelectedFilter(p)}
              style={{ 
                padding: '4px 12px', 
                borderRadius: 'var(--radius-full)', 
                border: '1px solid',
                borderColor: selectedFilter === p ? 'var(--emerald-primary)' : 'var(--border-card)',
                background: selectedFilter === p ? 'var(--emerald-subtle)' : 'transparent',
                color: selectedFilter === p ? 'var(--emerald-primary)' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {p === 'ALL' ? 'All Priorities' : `${p} Priority`}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          Showing {filteredList.length} of {recommendations.length} recommendations
        </span>
      </div>

      {/* Recommendations Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredList.map((rec) => {
          const priorityColor = rec.priority === 'HIGH' ? 'var(--rose-anomaly)' : rec.priority === 'MEDIUM' ? 'var(--amber-warning)' : 'var(--cyan-accent)';
          const priorityBg = rec.priority === 'HIGH' ? 'var(--rose-subtle)' : rec.priority === 'MEDIUM' ? 'var(--amber-subtle)' : 'var(--cyan-subtle)';

          return (
            <div 
              key={rec.id} 
              className="card"
              style={{ 
                border: `1px solid ${rec.status === 'Implemented' ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-card)'}`,
                background: rec.status === 'Implemented' ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg-card)'
              }}
            >
              {/* Header: ID, Priority, Category, Status */}
              <div className="card-header" style={{ marginBottom: '14px', borderBottom: '1px solid var(--border-card)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: 700, 
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {rec.id}
                  </span>

                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    color: priorityColor, 
                    background: priorityBg, 
                    padding: '3px 10px', 
                    borderRadius: '4px',
                    border: `1px solid ${priorityColor}33`
                  }}>
                    {rec.priority} PRIORITY
                  </span>

                  <span style={{ fontSize: '0.75rem', color: 'var(--purple-ai)', background: 'var(--purple-subtle)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {rec.category}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: rec.status === 'Implemented' ? 'var(--emerald-primary)' : rec.status === 'In Review' ? 'var(--amber-warning)' : 'var(--text-muted)' 
                  }}>
                    Status: {rec.status}
                  </span>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => toggleStatus(rec.id)}
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    {rec.status === 'Open' ? 'Mark In Review' : rec.status === 'In Review' ? 'Mark Implemented' : 'Reopen'}
                  </button>
                </div>
              </div>

              {/* 4-Part Structure: Problem, Reason, Recommended Action, Potential Impact */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--rose-anomaly)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    🚨 Detected Problem
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    {rec.problem}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--amber-warning)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    🔍 Underlying Cause / Reason
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {rec.reason}
                  </div>
                </div>
              </div>

              {/* Recommended Action & Impact */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.05)', 
                border: '1px solid rgba(16, 185, 129, 0.2)', 
                borderRadius: 'var(--radius-md)', 
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Recommended AI Intervention:
                </div>
                <div style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>
                  {rec.action}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Potential Estimated Impact:</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--emerald-primary)', fontWeight: 700, marginTop: '2px' }}>
                      {rec.potentialImpact}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Feasibility & Cost:</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '2px' }}>
                      {rec.feasibility}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => onNavigateToTab('simulator')}
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  <Sliders size={13} />
                  Simulate in What-If Engine
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner" style={{ marginTop: '24px' }}>
        <span>ℹ️ <strong>Academic Prototype Note:</strong> Recommendations and savings figures represent scenario-based estimates calculated from simulated tariff and equipment parameters. Real-world implementations require engineering audits and regional utility tariff validation.</span>
      </div>
    </div>
  );
}
