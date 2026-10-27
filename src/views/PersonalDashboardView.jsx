import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  PieChart, Pie, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import {
  Leaf, TrendingDown, TrendingUp, ArrowRight, Sparkles, AlertTriangle,
  Target, Plus, ChevronRight, Info, RotateCcw
} from 'lucide-react';
import { DASHBOARD_CATEGORIES, EMISSION_FACTORS } from '../data/emissionFactors';

function getMonth(dateStr) {
  return dateStr ? dateStr.slice(0, 7) : '';
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0f172a', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, padding: '10px 14px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ fontSize: '0.85rem', color: p.color || '#10b981', fontWeight: 700 }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value} kg CO₂e
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function PersonalDashboardView({ activities, settings, onNavigateToTab }) {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Available months from activity data
  const availableMonths = useMemo(() => {
    const months = new Set(activities.map(a => getMonth(a.date)).filter(Boolean));
    return Array.from(months).sort().reverse();
  }, [activities]);

  // Current month stats
  const currentMonthActivities = useMemo(() =>
    activities.filter(a => getMonth(a.date) === selectedMonth),
    [activities, selectedMonth]
  );

  const totalCo2e = useMemo(() =>
    currentMonthActivities.reduce((sum, a) => sum + (a.co2e || 0), 0),
    [currentMonthActivities]
  );

  // Previous month for comparison
  const prevMonth = useMemo(() => {
    const [y, m] = selectedMonth.split('-').map(Number);
    const prev = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`;
    return prev;
  }, [selectedMonth]);

  const prevMonthTotal = useMemo(() => {
    return activities.filter(a => getMonth(a.date) === prevMonth).reduce((sum, a) => sum + (a.co2e || 0), 0);
  }, [activities, prevMonth]);

  const percentChange = prevMonthTotal > 0 ? ((totalCo2e - prevMonthTotal) / prevMonthTotal) * 100 : null;

  // Category breakdown for selected month
  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    Object.entries(DASHBOARD_CATEGORIES).forEach(([key, cat]) => {
      const total = currentMonthActivities
        .filter(a => cat.keys.includes(a.categoryId))
        .reduce((sum, a) => sum + (a.co2e || 0), 0);
      if (total > 0 || key === 'electricity') {
        breakdown[key] = { ...cat, total: parseFloat(total.toFixed(2)) };
      }
    });
    return Object.values(breakdown);
  }, [currentMonthActivities]);

  // Monthly trend (last 6 months)
  const monthlyTrend = useMemo(() => {
    const months = {};
    activities.forEach(a => {
      const m = getMonth(a.date);
      if (!m) return;
      months[m] = (months[m] || 0) + (a.co2e || 0);
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, total]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        total: parseFloat(total.toFixed(1)),
        isSelected: month === selectedMonth,
      }));
  }, [activities, selectedMonth]);

  // AI Insights (rule-based)
  const insights = useMemo(() => {
    const result = [];

    // Top category insight
    const sorted = [...categoryBreakdown].sort((a, b) => b.total - a.total);
    if (sorted[0] && sorted[0].total > 0) {
      result.push({
        type: 'dominant',
        title: `${sorted[0].label} is your largest source`,
        body: `It accounts for ${totalCo2e > 0 ? ((sorted[0].total / totalCo2e) * 100).toFixed(0) : 0}% of this month's estimated emissions (${sorted[0].total.toFixed(1)} kg CO₂e). Reducing electricity use or switching to renewables would have the highest impact.`,
        icon: '📊',
        color: sorted[0].color,
      });
    }

    // Month-over-month change
    if (percentChange !== null) {
      if (percentChange > 15) {
        result.push({
          type: 'warning',
          title: `Emissions up ${percentChange.toFixed(0)}% vs last month`,
          body: `This month's total is noticeably higher than ${prevMonth}. Check if there were one-off activities like a flight or unusual energy use.`,
          icon: '⚠️',
          color: '#ef4444',
        });
      } else if (percentChange < -10) {
        result.push({
          type: 'positive',
          title: `Great progress — down ${Math.abs(percentChange).toFixed(0)}% vs last month!`,
          body: `Your footprint dropped compared with last month. Keep it up with consistent changes in travel and energy use.`,
          icon: '🎉',
          color: '#10b981',
        });
      }
    }

    // Target check
    if (settings.monthlyTarget && totalCo2e > 0) {
      const pct = (totalCo2e / settings.monthlyTarget) * 100;
      if (pct > 80) {
        result.push({
          type: 'target',
          title: pct > 100 ? 'Monthly target exceeded' : `${pct.toFixed(0)}% of monthly target used`,
          body: pct > 100
            ? `You've surpassed your ${settings.monthlyTarget} kg CO₂e target. Consider offsetting or reducing activities next month.`
            : `You're approaching your ${settings.monthlyTarget} kg CO₂e monthly target. Be mindful of remaining activities.`,
          icon: '🎯',
          color: pct > 100 ? '#ef4444' : '#f59e0b',
        });
      }
    }

    // Quick win suggestions
    if (categoryBreakdown.find(c => c.total > 20 && c.label === 'Transport')) {
      result.push({
        type: 'suggestion',
        title: 'Reduce transport emissions',
        body: 'Try combining trips, using public transport, or shifting to cycling for short journeys. Batch errands can cut travel emissions by 20–40%.',
        icon: '🚲',
        color: '#06b6d4',
      });
    }

    return result.slice(0, 4);
  }, [categoryBreakdown, totalCo2e, percentChange, prevMonth, settings]);

  const targetPct = settings.monthlyTarget > 0 ? Math.min((totalCo2e / settings.monthlyTarget) * 100, 100) : 0;

  const pieColors = categoryBreakdown.map(c => c.color);

  const monthLabel = (m) => {
    try {
      return new Date(m + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch { return m; }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Leaf size={24} style={{ color: 'var(--emerald-primary)' }} />
            Personal Carbon Dashboard
          </h2>
          <p className="page-subtitle">
            Your estimated greenhouse gas footprint — based on logged activities × emission factors.
            <span style={{ color: 'var(--amber-warning)', marginLeft: 8 }}>⚠ Illustrative estimates, not certified data.</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-main)',
              borderRadius: 'var(--radius-md)', padding: '8px 14px', fontSize: '0.85rem', cursor: 'pointer',
              outline: 'none'
            }}
          >
            {availableMonths.length === 0 && <option value={selectedMonth}>{monthLabel(selectedMonth)}</option>}
            {availableMonths.map(m => (
              <option key={m} value={m}>{monthLabel(m)}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={() => onNavigateToTab('activity-log')}>
            <Plus size={15} /> Log Activity
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {/* Total */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total This Month</span>
            <div className="kpi-icon-box" style={{ background: 'rgba(16,185,129,0.12)' }}>
              <Leaf size={16} style={{ color: '#10b981' }} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{totalCo2e.toFixed(1)}</span>
            <span className="kpi-unit">kg CO₂e</span>
          </div>
          {percentChange !== null && (
            <div className={`kpi-trend ${percentChange > 0 ? 'trend-up-red' : 'trend-down-green'}`}>
              {percentChange > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}% vs last month
            </div>
          )}
          <div className="kpi-subtext">Estimated · {currentMonthActivities.length} activities logged</div>
        </div>

        {/* Category leader */}
        {categoryBreakdown.slice(0, 3).map((cat) => (
          <div className="kpi-card" key={cat.label}>
            <div className="kpi-top">
              <span className="kpi-label">{cat.label}</span>
              <div className="kpi-icon-box" style={{ background: `${cat.color}18` }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color }} />
              </div>
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value" style={{ fontSize: '1.5rem' }}>{cat.total.toFixed(1)}</span>
              <span className="kpi-unit">kg CO₂e</span>
            </div>
            <div className="kpi-subtext">
              {totalCo2e > 0 ? ((cat.total / totalCo2e) * 100).toFixed(0) : 0}% of total · Estimated
            </div>
          </div>
        ))}

        {/* Monthly target */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Monthly Target</span>
            <Target size={16} style={{ color: '#f59e0b' }} />
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ fontSize: '1.5rem', color: targetPct > 80 ? '#ef4444' : '#f59e0b' }}>
              {targetPct.toFixed(0)}%
            </span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, marginTop: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${targetPct}%`, background: targetPct > 80 ? '#ef4444' : '#10b981', borderRadius: 9999, transition: 'width 0.4s' }} />
          </div>
          <div className="kpi-subtext">{totalCo2e.toFixed(0)} / {settings.monthlyTarget} kg CO₂e goal</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dash-grid-2" style={{ marginBottom: 24 }}>
        {/* Monthly Trend */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Monthly Emission Trend</div>
            <span className="card-badge">Last 6 months · Estimated</span>
          </div>
          {monthlyTrend.length >= 2 ? (
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total" name="Total" radius={[4, 4, 0, 0]}>
                    {monthlyTrend.map((entry, idx) => (
                      <Cell key={idx} fill={entry.isSelected ? '#10b981' : 'rgba(16,185,129,0.35)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', flexDirection: 'column', gap: 8 }}>
              <Info size={22} />
              <span style={{ fontSize: '0.82rem' }}>Log activities across multiple months to see trend.</span>
            </div>
          )}
          <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-card)', paddingTop: 10 }}>
            All values are illustrative estimates based on activity amount × emission factor.
          </div>
        </div>

        {/* Category Breakdown Pie */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Category Breakdown</div>
            <span className="card-badge">{monthLabel(selectedMonth)}</span>
          </div>
          {categoryBreakdown.length > 0 && totalCo2e > 0 ? (
            <>
              <div style={{ width: '100%', height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="total">
                      {categoryBreakdown.map((cat, idx) => (
                        <Cell key={idx} fill={cat.color} stroke="#0f172a" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v.toFixed(1)} kg CO₂e`]} contentStyle={{ background: '#0f172a', border: '1px solid rgba(148,163,184,0.15)', borderRadius: 8, fontSize: '0.78rem' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {categoryBreakdown.filter(c => c.total > 0).map((cat, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-main)' }}>{cat.label}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                      {cat.total.toFixed(1)} kg <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>({totalCo2e > 0 ? ((cat.total / totalCo2e) * 100).toFixed(0) : 0}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', flexDirection: 'column', gap: 8 }}>
              <Info size={22} />
              <span style={{ fontSize: '0.82rem' }}>No activities logged for this month yet.</span>
              <button className="btn btn-primary" style={{ fontSize: '0.78rem' }} onClick={() => onNavigateToTab('activity-log')}>
                <Plus size={13} /> Add Activity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Demo Insights */}
      {insights.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <div className="card-title">
              <Sparkles size={17} style={{ color: '#8b5cf6' }} />
              Demo AI Insights
            </div>
            <span className="nav-badge badge-demo">Rule-based · No external AI</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {insights.map((ins, i) => (
              <div key={i} style={{ padding: '14px 16px', background: `${ins.color}10`, border: `1px solid ${ins.color}28`, borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.1rem' }}>{ins.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: ins.color }}>{ins.title}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{ins.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            💡 Demo insights are generated by transparent rule-based logic, not an external AI service.
          </div>
        </div>
      )}

      {/* Previous Month Comparison */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">Month-over-Month Comparison</div>
          <span className="card-badge">Estimated</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{monthLabel(prevMonth)}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{prevMonthTotal.toFixed(1)}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>kg CO₂e</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(16,185,129,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{monthLabel(selectedMonth)}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: percentChange !== null && percentChange > 0 ? '#ef4444' : '#10b981' }}>{totalCo2e.toFixed(1)}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>kg CO₂e</div>
          </div>
        </div>
        {percentChange !== null && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.88rem', fontWeight: 700, color: percentChange > 0 ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {percentChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}% change month-over-month
          </div>
        )}
      </div>

      {/* Navigate to log */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={() => onNavigateToTab('activity-log')}>
          View Activity Log <ChevronRight size={14} />
        </button>
        <button className="btn btn-primary" onClick={() => onNavigateToTab('reports')}>
          Generate Report <ArrowRight size={14} />
        </button>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-banner" style={{ marginTop: 24 }}>
        <span>ℹ️ <strong>Transparency Note:</strong> All emission estimates use illustrative factors (DEFRA 2024, CEA India 2022, IPCC AR6). Actual emissions depend on your specific energy mix, vehicle type, and local conditions. These figures are for awareness and learning — not certified carbon accounting.</span>
      </div>
    </div>
  );
}
