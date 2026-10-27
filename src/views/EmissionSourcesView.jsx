import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis 
} from 'recharts';
import { 
  PieChart as PieIcon, 
  Calculator
} from 'lucide-react';
import { EMISSION_SOURCES, CALCULATION_FACTORS } from '../data/mockData';

export default function EmissionSourcesView() {
  const [selectedRegion, setSelectedRegion] = useState(CALCULATION_FACTORS[0]);
  const [customKwh, setCustomKwh] = useState(500);

  // Computed footprint based on formula: Activity Data × Emission Factor = Estimated CO2e
  const computedCo2e = (customKwh * selectedRegion.gridFactor).toFixed(1);

  return (
    <div className="emission-sources-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <PieIcon size={24} style={{ color: 'var(--emerald-primary)' }} />
            Emission Sources & Carbon Accounting
          </h2>
          <p className="page-subtitle">
            Source-level activity breakdown, Scope classification, and transparent emission factor calculations.
          </p>
        </div>
      </div>

      {/* Top Visuals: Donut Chart & Category Bar Breakdown */}
      <div className="dash-grid-2">
        {/* Donut Chart */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              Proportional Contribution (Weekly Total)
            </div>
            <span className="card-badge">1,248 kg CO₂e Total</span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EMISSION_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="percentage"
                >
                  {EMISSION_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name, item) => [`${val}% (${item.payload.co2e} kg CO₂e)`, item.payload.name]}
                  contentStyle={{ background: '#0f172a', border: '1px solid var(--border-card)', borderRadius: '8px', fontSize: '0.8rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Dominant Contributor Highlight */}
          <div style={{ 
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.3)', 
            borderRadius: 'var(--radius-md)', 
            padding: '12px 16px', 
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--emerald-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                Dominant Emission Vector
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Grid Electricity Consumption — 52% (649 kg CO₂e)
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scope 2 Purchased</span>
          </div>
        </div>

        {/* Absolute CO2e Bar Chart */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              Absolute Emissions by Source (kg CO₂e)
            </div>
            <span className="card-badge">Categorical View</span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EMISSION_SOURCES} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} />
                <Tooltip 
                  formatter={(val) => [`${val} kg CO₂e`, 'Emissions']}
                  contentStyle={{ background: '#0f172a', border: '1px solid var(--border-card)', borderRadius: '8px', fontSize: '0.8rem' }}
                />
                <Bar dataKey="co2e" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {EMISSION_SOURCES.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '8px' }}>
            Source breakdown clarifies where operational decarbonization yields maximum return.
          </div>
        </div>
      </div>

      {/* Comprehensive Activity Data Table */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            Source Activity Data & Factor Attribution
          </div>
          <span className="card-badge">GHG Protocol Aligned</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Source Name</th>
                <th>Scope</th>
                <th>Measured Activity Data</th>
                <th>Emission Factor Applied</th>
                <th>Calculated Footprint</th>
                <th>Share %</th>
              </tr>
            </thead>
            <tbody>
              {EMISSION_SOURCES.map((src, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: src.color }}></span>
                      {src.name}
                      {src.isDominant && (
                        <span style={{ fontSize: '0.65rem', padding: '1px 5px', borderRadius: '3px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)' }}>
                          Primary
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-muted)'
                    }}>
                      {src.scope}
                    </span>
                  </td>
                  <td>{src.consumption}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{src.factor}</td>
                  <td>
                    <strong style={{ color: src.isDominant ? 'var(--emerald-primary)' : 'var(--text-main)' }}>
                      {src.co2e} kg CO₂e
                    </strong>
                  </td>
                  <td>
                    <strong>{src.percentage}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conceptual Calculation Sandbox: Activity Data x Emission Factor = Estimated CO2e */}
      <div className="card" style={{ border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div className="card-header">
          <div className="card-title">
            <Calculator size={18} style={{ color: 'var(--cyan-accent)' }} />
            Carbon Calculation Sandbox: Conceptual Formula Demonstration
          </div>
          <span className="card-badge" style={{ color: 'var(--cyan-accent)' }}>Interactive Formula</span>
        </div>

        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          padding: '14px 18px', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-card)', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Core Formula:</div>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '1rem', 
            fontWeight: 700, 
            color: 'var(--cyan-accent)',
            background: 'rgba(6, 182, 212, 0.1)',
            padding: '4px 12px',
            borderRadius: '6px'
          }}>
            Activity Data (kWh) × Regional Emission Factor (kg CO₂e/kWh) = Estimated Footprint (kg CO₂e)
          </div>
        </div>

        <div className="dash-grid-2">
          {/* Controls */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                1. Select Regional Grid Emission Standard (Demo Factor):
              </label>
              <select 
                value={selectedRegion.region}
                onChange={(e) => {
                  const factor = CALCULATION_FACTORS.find(f => f.region === e.target.value);
                  if (factor) setSelectedRegion(factor);
                }}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'var(--bg-card-elevated)', 
                  border: '1px solid var(--border-card)', 
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              >
                {CALCULATION_FACTORS.map((f, i) => (
                  <option key={i} value={f.region}>
                    {f.region} — {f.gridFactor} {f.unit}
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                {selectedRegion.description}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                <span>2. Activity Electricity Consumption:</span>
                <span style={{ color: 'var(--cyan-accent)', fontFamily: 'var(--font-mono)' }}>{customKwh} kWh</span>
              </div>
              <input 
                type="range" 
                min={100} 
                max={2000} 
                step={50} 
                value={customKwh} 
                onChange={(e) => setCustomKwh(Number(e.target.value))}
                className="custom-slider"
              />
            </div>
          </div>

          {/* Interactive Result Card */}
          <div style={{ 
            background: 'var(--bg-card-elevated)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '20px', 
            border: '1px solid rgba(6, 182, 212, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Calculated CO₂e Output
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--cyan-accent)', margin: '6px 0' }}>
              {computedCo2e} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>kg CO₂e</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Formula breakdown: <strong>{customKwh} kWh</strong> × <strong>{selectedRegion.gridFactor} kg/kWh</strong> = <strong>{computedCo2e} kg CO₂e</strong>
            </div>
          </div>
        </div>

        <div className="disclaimer-banner" style={{ marginTop: '16px' }}>
          <span>ℹ️ <strong>Academic Clarity:</strong> Universal emission factors do NOT exist; grid factors vary dynamically by regional energy mix. CARBONIQ is designed to support regional API integrations (e.g. WattTime, ElectricityMaps) in future iterations.</span>
        </div>
      </div>
    </div>
  );
}
