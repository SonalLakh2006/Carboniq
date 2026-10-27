import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ReferenceLine 
} from 'recharts';
import { 
  Zap, 
  Flame, 
  Activity, 
  Gauge, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { 
  HOURLY_EMISSIONS, 
  WEEKLY_EMISSIONS, 
  MONTHLY_EMISSIONS, 
  EMISSION_SOURCES, 
  ANOMALY_INCIDENT, 
  WHY_EMISSIONS_CHANGED,
  AI_RECOMMENDATIONS 
} from '../data/mockData';

// Custom chart tooltip declared outside render
function CustomOverviewTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isHour = Boolean(data.hour);
    const isDay = Boolean(data.day);
    const keyName = isHour ? 'HOUR' : isDay ? 'DAY' : 'PERIOD';

    return (
      <div style={{ 
        background: '#0f172a', 
        border: '1px solid var(--border-card)', 
        borderRadius: '8px', 
        padding: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)' 
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
          {keyName}: {label}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--emerald-primary)' }}>
          Actual: {payload[0].value} kg CO₂e
        </div>
        {payload[1] && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Baseline: {payload[1].value} kg CO₂e
          </div>
        )}
        {data.isAnomaly && (
          <div style={{ 
            marginTop: '6px', 
            padding: '4px 8px', 
            background: 'var(--rose-subtle)', 
            color: 'var(--rose-anomaly)', 
            borderRadius: '4px', 
            fontSize: '0.72rem', 
            fontWeight: 700 
          }}>
            ⚠️ {data.anomalyTitle || 'Spike Detected'}
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default function OverviewView({ 
  timeframe, 
  onOpenAnomalyModal, 
  onOpenWhyChangedModal, 
  onNavigateToTab 
}) {
  // Select chart dataset based on selected timeframe
  let chartData = HOURLY_EMISSIONS;
  let xKey = 'hour';
  let chartTitle = "Today's Hourly Carbon Emission Profile (kg CO₂e/hr)";

  if (timeframe === '7d') {
    chartData = WEEKLY_EMISSIONS;
    xKey = 'day';
    chartTitle = "7-Day Historical Emission Profile vs Baseline (kg CO₂e/day)";
  } else if (timeframe === '30d') {
    chartData = MONTHLY_EMISSIONS;
    xKey = 'period';
    chartTitle = "30-Day Aggregated Emission Trend (kg CO₂e/period)";
  }

  return (
    <div className="overview-view">
      {/* Philosophy Banner */}
      <div className="philosophy-banner">
        <div className="philosophy-steps">
          <span className="phil-step">1. MEASURE</span>
          <span className="phil-arrow">→</span>
          <span className="phil-step">2. UNDERSTAND</span>
          <span className="phil-arrow">→</span>
          <span className="phil-step">3. PREDICT</span>
          <span className="phil-arrow">→</span>
          <span className="phil-step" style={{ background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)' }}>
            4. ACT
          </span>
        </div>
        <div className="phil-quote">
          “From Carbon Data to Intelligent Action.”
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <MetricCard 
          label="Total Carbon Footprint"
          value="1,248"
          unit="kg CO₂e"
          trend={8.4}
          isIncrease={true}
          period="vs 7d avg"
          icon={Activity}
          iconColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.12)"
          subtext="Simulated weekly total (Demo Data)"
        />
        <MetricCard 
          label="Today's Emissions"
          value="184"
          unit="kg CO₂e"
          trend={12.1}
          isIncrease={true}
          period="vs daily norm"
          icon={Flame}
          iconColor="#f59e0b"
          iconBg="rgba(245, 158, 11, 0.12)"
          subtext="Afternoon shift surge detected"
        />
        <MetricCard 
          label="Energy Consumption"
          value="2,840"
          unit="kWh"
          trend={6.2}
          isIncrease={true}
          period="vs baseline"
          icon={Zap}
          iconColor="#06b6d4"
          iconBg="rgba(6, 182, 212, 0.12)"
          subtext="Total grid & auxiliary power"
        />
        <MetricCard 
          label="Carbon Intensity"
          value="0.44"
          unit="kg CO₂e/kWh"
          trend={2.3}
          isIncrease={true}
          period="grid mix factor"
          icon={Gauge}
          iconColor="#8b5cf6"
          iconBg="rgba(139, 92, 246, 0.12)"
          subtext="Regional grid factor applied"
        />
      </div>

      {/* Active Anomaly Alert Banner */}
      <div className="anomaly-banner">
        <div className="anomaly-banner-left">
          <div className="anomaly-icon-pulsing">
            <AlertTriangle size={22} />
          </div>
          <div>
            <div className="anomaly-banner-title">
              ⚠ Anomaly Detected: Electricity emissions are 21% above expected range
              <span style={{ fontSize: '0.72rem', background: 'var(--rose-anomaly)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>
                HIGH PRIORITY
              </span>
            </div>
            <div className="anomaly-banner-desc">
              Expected: <strong>{ANOMALY_INCIDENT.expected} kg CO₂e</strong> • Observed: <strong>{ANOMALY_INCIDENT.observed} kg CO₂e</strong> at 14:00 shift changeover (Chiller #2 thermal runaway).
            </div>
          </div>
        </div>
        <button className="btn-investigate" onClick={onOpenAnomalyModal}>
          <span>Investigate Anomaly</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Main Visuals Row: Time Series Area Chart & Donut Sources */}
      <div className="dash-grid-2">
        {/* Interactive Emission Trend Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Activity size={17} style={{ color: 'var(--emerald-primary)' }} />
                {chartTitle}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Continuous telemetry comparison against expected historical baseline
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></span> Actual
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ width: 10, height: 2, background: '#64748b' }}></span> Baseline
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey={xKey} 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false}
                  domain={['dataMin - 2', 'dataMax + 4']}
                />
                <Tooltip content={<CustomOverviewTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#actualGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#64748b" 
                  strokeWidth={1.5} 
                  strokeDasharray="4 4" 
                  fill="transparent" 
                />
                {/* 14:00 Spike reference point if on today's view */}
                {timeframe === 'today' && (
                  <ReferenceLine 
                    x="14:00" 
                    stroke="#ef4444" 
                    strokeDasharray="3 3" 
                    label={{ value: 'Spike 14:00', fill: '#ef4444', fontSize: 10, position: 'top' }} 
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-card)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <span>Telemetry source: Simulated Smart Incomer Meter (3s update frequency)</span>
            <button 
              onClick={() => onNavigateToTab('monitor')}
              style={{ background: 'transparent', border: 'none', color: 'var(--emerald-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
            >
              Open Live Monitor <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Major Emission Sources Donut */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              Major Emission Sources
            </div>
            <span className="card-badge">Breakdown</span>
          </div>

          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EMISSION_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {EMISSION_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name, item) => [`${val}% (${item.payload.co2e} kg CO₂e)`, item.payload.name]}
                  contentStyle={{ background: '#0f172a', border: '1px solid var(--border-card)', borderRadius: '8px', fontSize: '0.78rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sources Summary List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {EMISSION_SOURCES.slice(0, 3).map((src, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: src.color }}></span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{src.name}</span>
                  {src.isDominant && (
                    <span style={{ fontSize: '0.65rem', padding: '1px 5px', borderRadius: '3px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', fontWeight: 700 }}>
                      Dominant
                    </span>
                  )}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{src.percentage}%</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right', marginTop: '12px' }}>
            <button 
              onClick={() => onNavigateToTab('sources')}
              style={{ background: 'transparent', border: 'none', color: 'var(--emerald-primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              View All 6 Sources <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Signature "Why Did Emissions Change?" & Action Cards Row */}
      <div className="dash-grid-2">
        {/* Signature "Why did emissions change?" Feature Card */}
        <div className="why-changed-card">
          <div className="why-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="ai-chip">
                  <Sparkles size={13} />
                  AI REASONING ENGINE
                </span>
                <span className="confidence-chip">Confidence: {WHY_EMISSIONS_CHANGED.confidence}%</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Why did emissions change?
              </h3>
            </div>
            <button 
              onClick={onOpenWhyChangedModal}
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              View Decomposition
            </button>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            {WHY_EMISSIONS_CHANGED.summary}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {WHY_EMISSIONS_CHANGED.drivers.slice(0, 2).map((d, i) => (
              <div key={i} className="driver-bar-item">
                <div className="driver-info">
                  <span className="driver-name">{d.source} ({d.role})</span>
                  <span className="driver-val" style={{ color: d.sharePct > 50 ? 'var(--rose-anomaly)' : 'var(--amber-warning)' }}>
                    {d.deltaPercent} ({d.deltaCo2e})
                  </span>
                </div>
                <div className="driver-track">
                  <div className={`driver-fill ${d.fillClass}`} style={{ width: `${d.sharePct}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="ai-explanation-box">
            <strong>AI Operational Interpretation: </strong>
            {WHY_EMISSIONS_CHANGED.aiInterpretation}
          </div>
        </div>

        {/* Priority AI Actionable Recommendation */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div className="card-title">
                <Lightbulb size={17} style={{ color: 'var(--amber-warning)' }} />
                Top AI Recommendation
              </div>
              <span className="nav-badge badge-alert">HIGH PRIORITY</span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Problem Identified
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                {AI_RECOMMENDATIONS[0].problem}
              </div>
            </div>

            <div style={{ marginBottom: '14px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>
                Recommended Action:
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.5 }}>
                {AI_RECOMMENDATIONS[0].action}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--cyan-accent)' }}>
              <Sparkles size={14} />
              <span>{AI_RECOMMENDATIONS[0].potentialImpact}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1, fontSize: '0.8rem', justifyContent: 'center' }}
              onClick={() => onNavigateToTab('simulator')}
            >
              Simulate in What-If
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.8rem' }}
              onClick={() => onNavigateToTab('recommendations')}
            >
              All Actions
            </button>
          </div>
        </div>
      </div>

      {/* Academic Transparency Note */}
      <div className="disclaimer-banner">
        <span>🛡️ <strong>Academic Proof-of-Concept:</strong> All measurements, anomalies, and AI reasoning display simulated demo scenarios for GreenTech Manufacturing. System architecture supports live IoT sensors and cloud time-series DB in future production phases.</span>
      </div>
    </div>
  );
}
