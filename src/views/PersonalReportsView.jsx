import React, { useState, useMemo } from 'react';
import { Download, FileText, Printer, Settings, Globe, Target, Shield, Trash2, RotateCcw } from 'lucide-react';
import { EMISSION_FACTORS, DASHBOARD_CATEGORIES } from '../data/emissionFactors';
import { DEFAULT_SETTINGS } from '../data/useActivityStore';

function getMonth(dateStr) { return dateStr ? dateStr.slice(0, 7) : ''; }

function monthLabel(m) {
  try { return new Date(m + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); }
  catch { return m; }
}

export default function PersonalReportsView({ activities, settings, onUpdateSettings, onClearData, onResetDemo, onShowToast }) {
  const [tab, setTab] = useState('report');
  const [reportMonth, setReportMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // ---- Settings state ----
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  const handleSettingsSave = () => {
    onUpdateSettings(settingsForm);
    if (onShowToast) onShowToast('Settings saved successfully!');
  };

  // ---- Report logic ----
  const availableMonths = useMemo(() => {
    const months = new Set(activities.map(a => getMonth(a.date)).filter(Boolean));
    return Array.from(months).sort().reverse();
  }, [activities]);

  const monthActivities = useMemo(() =>
    activities.filter(a => getMonth(a.date) === reportMonth),
    [activities, reportMonth]
  );

  const totalCo2e = useMemo(() => monthActivities.reduce((sum, a) => sum + (a.co2e || 0), 0), [monthActivities]);

  const categoryTotals = useMemo(() => {
    return Object.entries(DASHBOARD_CATEGORIES).map(([key, cat]) => {
      const total = monthActivities
        .filter(a => cat.keys.includes(a.categoryId))
        .reduce((sum, a) => sum + (a.co2e || 0), 0);
      return { ...cat, key, total: parseFloat(total.toFixed(2)) };
    }).filter(c => c.total > 0);
  }, [monthActivities]);

  const prevMonth = useMemo(() => {
    const [y, m] = reportMonth.split('-').map(Number);
    return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`;
  }, [reportMonth]);

  const prevTotal = useMemo(() =>
    activities.filter(a => getMonth(a.date) === prevMonth).reduce((sum, a) => sum + (a.co2e || 0), 0),
    [activities, prevMonth]
  );

  const changePercent = prevTotal > 0 ? ((totalCo2e - prevTotal) / prevTotal * 100) : null;

  const handleDownloadCSV = () => {
    const rows = [
      ['Date', 'Category', 'Amount', 'Unit', 'Emission Factor', 'Factor Source', 'Estimated CO2e (kg)', 'Note', 'Demo?'],
      ...monthActivities.map(a => [
        a.date,
        EMISSION_FACTORS[a.categoryId]?.label || a.categoryId,
        a.amount,
        a.unit,
        a.factorValue,
        a.factorSource,
        a.co2e?.toFixed(3) || '0',
        a.note || '',
        a.isDemo ? 'Yes (Demo)' : 'No',
      ])
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CarbonIQ_${reportMonth}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast(`Downloaded: CarbonIQ_${reportMonth}.csv`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <FileText size={24} style={{ color: 'var(--blue-info)' }} />
            Reports & Settings
          </h2>
          <p className="page-subtitle">View your carbon footprint report, export data, and configure your preferences.</p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: 4, width: 'fit-content' }}>
        {[['report', 'Monthly Report'], ['settings', 'Settings']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: '7px 18px', borderRadius: 'var(--radius-sm)', border: 'none', fontSize: '0.85rem', fontWeight: 600,
              background: tab === id ? 'var(--bg-card-elevated)' : 'transparent',
              color: tab === id ? 'var(--text-main)' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.15s'
            }}
          >{label}</button>
        ))}
      </div>

      {tab === 'report' && (
        <>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <select
              value={reportMonth}
              onChange={e => setReportMonth(e.target.value)}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 14px', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
            >
              {availableMonths.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
            </select>
            <button className="btn btn-secondary" onClick={handleDownloadCSV}>
              <Download size={15} /> Export CSV
            </button>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <Printer size={15} /> Print
            </button>
          </div>

          {/* Report card */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', borderRadius: 4, fontWeight: 700 }}>CARBONIQ REPORT</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Illustrative Estimates</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                Personal Carbon Footprint Report — {monthLabel(reportMonth)}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Location setting: <strong>{settings.location}</strong> · Generated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'Total Estimated', value: `${totalCo2e.toFixed(1)} kg CO₂e`, color: '#10b981' },
                { label: 'Activities Logged', value: monthActivities.length, color: '#06b6d4' },
                { label: 'vs Previous Month', value: changePercent !== null ? `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%` : 'N/A', color: changePercent > 0 ? '#ef4444' : '#10b981' },
                { label: 'Monthly Target', value: settings.monthlyTarget ? `${settings.monthlyTarget} kg CO₂e` : 'Not set', color: '#f59e0b' },
              ].map((kpi, i) => (
                <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6 }}>{kpi.label}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
                </div>
              ))}
            </div>

            {/* Category breakdown table */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-accent)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Category Breakdown</h4>
            <table className="data-table" style={{ marginBottom: 28 }}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Estimated CO₂e (kg)</th>
                  <th>Share (%)</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {categoryTotals.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-dim)', padding: 20 }}>No data for this month.</td></tr>
                ) : categoryTotals.map((cat, i) => (
                  <tr key={i}>
                    <td><strong style={{ color: cat.color }}>{cat.label}</strong></td>
                    <td style={{ fontWeight: 700 }}>{cat.total.toFixed(2)}</td>
                    <td>{totalCo2e > 0 ? ((cat.total / totalCo2e) * 100).toFixed(1) : 0}%</td>
                    <td>{monthActivities.filter(a => cat.keys.includes(a.categoryId)).length}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid var(--border-card)' }}>
                  <td><strong>Total</strong></td>
                  <td><strong style={{ color: '#10b981' }}>{totalCo2e.toFixed(2)}</strong></td>
                  <td>100%</td>
                  <td>{monthActivities.length}</td>
                </tr>
              </tbody>
            </table>

            {/* Full activity list */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--purple-ai)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>Detailed Activity Ledger</h4>
            <table className="data-table" style={{ marginBottom: 20 }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Factor</th>
                  <th>Est. CO₂e</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {monthActivities.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-dim)', padding: 20 }}>No activities logged for this month.</td></tr>
                ) : monthActivities.map((a, i) => (
                  <tr key={i}>
                    <td>{a.date}</td>
                    <td>{EMISSION_FACTORS[a.categoryId]?.label || a.categoryId} {a.isDemo && <span style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 700 }}>(DEMO)</span>}</td>
                    <td>{a.amount} {a.unit}</td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{a.factorValue} {a.factorUnit?.replace('kg CO2e/', '')} × · {a.factorSource}</td>
                    <td style={{ fontWeight: 700 }}>{(a.co2e || 0).toFixed(3)} kg</td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{a.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-card)', paddingTop: 14 }}>
              Generated by CARBONIQ Academic Prototype · All figures are illustrative estimates for awareness purposes only. Not suitable for regulatory or compliance reporting.
            </div>
          </div>
        </>
      )}

      {tab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Location */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Globe size={17} style={{ color: 'var(--cyan-accent)' }} /> Location & Grid Factor</div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Your location determines which electricity grid emission factor is used. This has the largest impact on electricity-related estimates.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Region</label>
                <select
                  value={settingsForm.location}
                  onChange={e => setSettingsForm(s => ({ ...s, location: e.target.value }))}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-card)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px', fontSize: '0.9rem', outline: 'none' }}
                >
                  {['India', 'US', 'UK', 'EU', 'Global Avg'].map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>Distance Unit</label>
                <select
                  value={settingsForm.distanceUnit}
                  onChange={e => setSettingsForm(s => ({ ...s, distanceUnit: e.target.value }))}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-card)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px', fontSize: '0.9rem', outline: 'none' }}
                >
                  <option value="km">Kilometres (km)</option>
                  <option value="miles">Miles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Target */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Target size={17} style={{ color: '#f59e0b' }} /> Monthly Emissions Target</div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Set a personal monthly target (kg CO₂e) to track progress on the dashboard.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="number"
                min={0}
                value={settingsForm.monthlyTarget}
                onChange={e => setSettingsForm(s => ({ ...s, monthlyTarget: parseFloat(e.target.value) }))}
                style={{ background: 'var(--bg-input)', border: '1px solid var(--border-card)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px', fontSize: '0.9rem', outline: 'none', width: 160 }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>kg CO₂e / month</span>
            </div>
            <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              For reference: the average Indian household emits ~150–200 kg CO₂e/month from daily activities (illustrative estimate).
            </div>
          </div>

          {/* Data Privacy */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Shield size={17} style={{ color: '#10b981' }} /> Data Privacy</div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              All data is stored locally in your browser (localStorage). No data is sent to any server. This is a client-side only prototype.
            </p>
            <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              🔒 <strong style={{ color: 'var(--text-main)' }}>Local Only:</strong> Your activity data never leaves your device.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={onResetDemo} className="btn btn-secondary">
                <RotateCcw size={14} /> Reset to Demo Data
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete ALL activity data? This cannot be undone.')) {
                    onClearData();
                    if (onShowToast) onShowToast('All activity data cleared.');
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                <Trash2 size={14} /> Clear All Data
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={handleSettingsSave}>
              Save Settings
            </button>
          </div>
        </div>
      )}

      <div className="disclaimer-banner" style={{ marginTop: 24 }}>
        <span>ℹ️ <strong>Academic Prototype:</strong> All emission estimates are illustrative and use simplified factors. Not suitable for regulatory, compliance, or official carbon accounting purposes.</span>
      </div>
    </div>
  );
}
