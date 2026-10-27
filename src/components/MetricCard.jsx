import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ 
  label, 
  value, 
  unit, 
  trend, 
  isIncrease, 
  period = 'vs previous period', 
  icon: Icon, 
  iconColor = '#10b981', 
  iconBg = 'rgba(16, 185, 129, 0.12)',
  subtext
}) {
  const isPositiveDirection = isIncrease ? false : true; // In emissions, increase is negative (bad), decrease is good!
  
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {Icon && (
          <div className="kpi-icon-box" style={{ background: iconBg, color: iconColor }}>
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="kpi-value-row">
        <span className="kpi-value">{value}</span>
        {unit && <span className="kpi-unit">{unit}</span>}
      </div>

      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span className={`kpi-trend ${isIncrease ? 'trend-up-red' : 'trend-down-green'}`}>
            {isIncrease ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isIncrease ? '+' : '-'}{Math.abs(trend)}%
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{period}</span>
        </div>
      )}

      {subtext && <div className="kpi-subtext">{subtext}</div>}
    </div>
  );
}
