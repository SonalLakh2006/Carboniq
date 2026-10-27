import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  Sliders, 
  ArrowUpRight, 
  ArrowDownRight, 
  Lightbulb, 
  BrainCircuit
} from 'lucide-react';
import { FORECAST_DATA } from '../data/mockData';

// Custom chart tooltip for the forecast declared outside render
function CustomForecastTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ 
        background: '#0f172a', 
        border: '1px solid var(--border-card)', 
        borderRadius: '8px', 
        padding: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)' 
      }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
          TIMEFRAME: {label}
        </div>
        {data.actualHistorical !== null && (
          <div style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '2px' }}>
            Historical Baseline: <strong>{data.actualHistorical} kg CO₂e</strong>
          </div>
        )}
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--amber-warning)', marginBottom: '2px' }}>
          Unmitigated Projection: <strong>{data.projected} kg CO₂e</strong>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
          Confidence Range: {data.lowerBound} – {data.upperBound} kg CO₂e
        </div>
        {data.mitigatedScenario && (
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald-primary)', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            Mitigated Scenario: <strong>{data.mitigatedScenario} kg CO₂e</strong> (-{Math.round(data.projected - data.mitigatedScenario)} kg)
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default function ForecastView({ onNavigateToTab, onShowToast }) {
  const [showMitigated, setShowMitigated] = useState(true);

  const handleToggleMitigated = () => {
    setShowMitigated(!showMitigated);
    if (onShowToast) {
      onShowToast(!showMitigated ? 'Displaying Mitigated AI Scenario comparison' : 'Hiding Mitigated Scenario comparison');
    }
  };

  return (
    <div className="forecast-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <TrendingUp size={24} style={{ color: 'var(--amber-warning)' }} />
            AI Predictive Emission Forecast
          </h2>
          <p className="page-subtitle">
            Time-series projection modeling expected carbon emissions across the upcoming 7-day operational cycle.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className={`btn ${showMitigated ? 'btn-primary' : 'btn-secondary'}`}
            onClick={handleToggleMitigated}
          >
            <Sparkles size={15} />
            {showMitigated ? 'Hide Mitigated Curve' : 'Overlay Mitigated Scenario'}
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigateToTab('simulator')}>
            <Sliders size={15} />
            What-If Simulator
          </button>
        </div>
      </div>

      {/* KPI Forecast Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Forecast Horizon</span>
            <div className="kpi-icon-box" style={{ background: 'var(--blue-subtle)', color: 'var(--blue-info)' }}>
              <Calendar size={16} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{FORECAST_DATA.timeframe}</span>
          </div>
          <span className="kpi-trend trend-neutral">Rolling 7-day projection window</span>
        </div>

        <div className="kpi-card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <div className="kpi-top">
            <span className="kpi-label">Projected 7-Day Total</span>
            <div className="kpi-icon-box" style={{ background: 'var(--amber-subtle)', color: 'var(--amber-warning)' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{FORECAST_DATA.expectedFootprint}</span>
            <span className="kpi-unit">kg CO₂e</span>
          </div>
          <span className="kpi-trend trend-up-red">
            <ArrowUpRight size={14} />
            {FORECAST_DATA.projectedChangePercent} vs current week
          </span>
        </div>

        <div className="kpi-card" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div className="kpi-top">
            <span className="kpi-label">Mitigated Target Potential</span>
            <div className="kpi-icon-box" style={{ background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)' }}>
              <Sparkles size={16} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">1,172</span>
            <span className="kpi-unit">kg CO₂e</span>
          </div>
          <span className="kpi-trend trend-down-green">
            <ArrowDownRight size={14} />
            -11.2% (-148 kg CO₂e saved)
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Forecast Model Status</span>
            <div className="kpi-icon-box" style={{ background: 'var(--purple-subtle)', color: 'var(--purple-ai)' }}>
              <BrainCircuit size={16} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">89%</span>
            <span className="kpi-unit">Confidence</span>
          </div>
          <span className="kpi-trend trend-neutral">Heuristic Seasonal Autoregressive</span>
        </div>
      </div>

      {/* Main Forecast Chart Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              7-Day Predictive Emission Trajectory vs Mitigated Pathway
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Shaded band indicates 90% confidence interval under simulated ambient temperature variations
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--amber-warning)', fontWeight: 600 }}>
              <span style={{ width: 10, height: 3, background: 'var(--amber-warning)', display: 'inline-block' }}></span>
              Projected (Unmitigated)
            </span>
            {showMitigated && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 600, marginLeft: '8px' }}>
                <span style={{ width: 10, height: 3, background: 'var(--emerald-primary)', display: 'inline-block' }}></span>
                Mitigated Pathway
              </span>
            )}
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: '100%', height: 340, marginTop: '12px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={FORECAST_DATA.forecastPoints} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                {/* Confidence band gradient */}
                <linearGradient id="forecastBandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                </linearGradient>
                {/* Mitigated curve gradient */}
                <linearGradient id="mitigatedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.08)" />
              <XAxis dataKey="day" stroke="var(--text-dim)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-dim)" fontSize={11} domain={[150, 220]} tickLine={false} />
              <Tooltip content={<CustomForecastTooltip />} />

              {/* Upper & Lower Confidence Interval Band */}
              <Area 
                type="monotone" 
                dataKey="upperBound" 
                stroke="transparent" 
                fill="url(#forecastBandGrad)" 
                name="Upper Bound"
              />
              <Area 
                type="monotone" 
                dataKey="lowerBound" 
                stroke="transparent" 
                fill="transparent" 
                name="Lower Bound"
              />

              {/* Primary Projected Line */}
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="var(--amber-warning)" 
                strokeWidth={3} 
                dot={{ r: 4, fill: 'var(--amber-warning)', strokeWidth: 2, stroke: '#0f172a' }}
                activeDot={{ r: 6 }}
                name="Unmitigated Projection"
              />

              {/* Mitigated Line if active */}
              {showMitigated && (
                <Line 
                  type="monotone" 
                  dataKey="mitigatedScenario" 
                  stroke="var(--emerald-primary)" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: 'var(--emerald-primary)', strokeWidth: 2, stroke: '#0f172a' }}
                  activeDot={{ r: 6 }}
                  name="Mitigated Scenario"
                />
              )}

              {/* Day 1 separator */}
              <ReferenceLine x="Day +1" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 2" label={{ value: 'Today', fill: '#94a3b8', fontSize: 10, position: 'top' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Narrative Banner */}
        <div style={{ 
          marginTop: '16px', 
          padding: '14px 18px', 
          background: 'rgba(255,255,255,0.02)', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--amber-warning)' }}>Trend Projection:</strong> If current operations continue without chiller throttling or shift rebalancing, weekly emissions will increase to <strong>1,320 kg CO₂e (+5.8%)</strong> due to forecast ambient summer heat.
          </div>
          <button className="btn btn-primary" onClick={() => onNavigateToTab('recommendations')} style={{ padding: '7px 14px', fontSize: '0.8rem' }}>
            <Lightbulb size={14} />
            Review Recommended Interventions
          </button>
        </div>
      </div>

      {/* Daily Forecast Breakdown Table */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <Calendar size={18} style={{ color: 'var(--cyan-accent)' }} />
            Daily Forecast Matrix (Simulated Data)
          </div>
          <span className="card-badge">7-Day Schedule</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Unmitigated (kg CO₂e)</th>
                <th>Expected Band</th>
                <th>Mitigated Scenario</th>
                <th>Potential Daily Saving</th>
                <th>Primary Drivers</th>
              </tr>
            </thead>
            <tbody>
              {FORECAST_DATA.forecastPoints.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.day}</strong></td>
                  <td style={{ color: 'var(--amber-warning)', fontWeight: 700 }}>
                    {row.projected} kg
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {row.lowerBound} – {row.upperBound} kg
                  </td>
                  <td style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>
                    {row.mitigatedScenario} kg
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--emerald-primary)', 
                      background: 'var(--emerald-subtle)', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      fontWeight: 700 
                    }}>
                      -{Math.round(row.projected - row.mitigatedScenario)} kg ({Math.round(((row.projected - row.mitigatedScenario) / row.projected) * 100)}%)
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {idx === 0 ? 'Current Friday Shift Overlap' : idx <= 4 ? 'High HVAC Chiller Load (Ambient 34°C)' : 'Weekend Reduced Operations'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Prototype Prediction Disclaimer:</strong> This forecast is simulated for demonstration purposes using a statistical autoregressive rolling pattern. In an enterprise system, predictions would be driven by an LSTM or Prophet ML model trained on historical telemetry, weather forecasts, and ERP production schedules.</span>
      </div>
    </div>
  );
}
