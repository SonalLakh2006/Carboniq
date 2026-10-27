import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Eye
} from 'lucide-react';
import { KPI_DATA, EMISSION_SOURCES, WHY_EMISSIONS_CHANGED } from '../data/mockData';

export default function ReportsView({ onOpenReportModal, onShowToast }) {
  const [reportType, setReportType] = useState('weekly');

  const handleDownloadCSV = () => {
    // Generate simple simulated CSV content
    const csvRows = [
      ['Timestamp', 'Hour', 'Electricity (kWh)', 'Fuel (L)', 'Transport (km)', 'Total CO2e (kg)', 'Status'],
      ['2026-09-15 00:00', '00:00', '4.5', '0.3', '0', '4.8', 'Normal'],
      ['2026-09-15 04:00', '04:00', '4.2', '0.2', '0', '4.5', 'Normal'],
      ['2026-09-15 08:00', '08:00', '11.1', '0.8', '5.7', '12.4', 'Normal'],
      ['2026-09-15 12:00', '12:00', '13.1', '0.9', '6.6', '14.8', 'Normal'],
      ['2026-09-15 14:00', '14:00', '25.1', '1.2', '8.5', '24.8', 'ANOMALY_SPIKE'],
      ['2026-09-15 18:00', '18:00', '10.1', '0.7', '5.2', '11.5', 'Normal'],
      ['2026-09-15 22:00', '22:00', '5.0', '0.3', '1.4', '5.4', 'Normal'],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CarbonIQ_Simulated_Telemetry_${reportType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onShowToast) {
      onShowToast(`Downloaded simulated telemetry dataset: CarbonIQ_${reportType}.csv`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <FileText size={24} style={{ color: 'var(--blue-info)' }} />
            Executive Sustainability Reports
          </h2>
          <p className="page-subtitle">
            Auditable carbon accounting summaries, compliance digests, and executive action plans.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handleDownloadCSV}>
            <Download size={15} />
            Export Simulated CSV
          </button>
          <button className="btn btn-primary" onClick={onOpenReportModal}>
            <Eye size={15} />
            Preview Full Executive Report
          </button>
        </div>
      </div>

      {/* Period Selection Cards */}
      <div className="dash-grid-3" style={{ marginBottom: '24px' }}>
        <div 
          className="card" 
          onClick={() => setReportType('daily')}
          style={{ 
            cursor: 'pointer', 
            border: `1px solid ${reportType === 'daily' ? 'var(--emerald-primary)' : 'var(--border-card)'}`,
            background: reportType === 'daily' ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
          }}
        >
          <div className="card-header">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DAILY DIGEST</span>
            <span className="card-badge">24h Scope</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Daily Shift Emission Audit
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Sub-hourly electrical load variances, anomaly incident logs, and shift handover metrics.
          </p>
          <div style={{ marginTop: '14px', fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 600 }}>
            {reportType === 'daily' ? '✓ Selected for generation' : 'Click to select'}
          </div>
        </div>

        <div 
          className="card" 
          onClick={() => setReportType('weekly')}
          style={{ 
            cursor: 'pointer', 
            border: `1px solid ${reportType === 'weekly' ? 'var(--emerald-primary)' : 'var(--border-card)'}`,
            background: reportType === 'weekly' ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
          }}
        >
          <div className="card-header">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-primary)' }}>WEEKLY COMPLIANCE</span>
            <span className="card-badge" style={{ background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)' }}>Recommended</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Weekly Carbon Executive Summary
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Total 1,248 kg CO₂e footprint, Scope 1/2/3 breakdown, root-cause attribution, and forecast trajectory.
          </p>
          <div style={{ marginTop: '14px', fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 600 }}>
            {reportType === 'weekly' ? '✓ Selected for generation' : 'Click to select'}
          </div>
        </div>

        <div 
          className="card" 
          onClick={() => setReportType('monthly')}
          style={{ 
            cursor: 'pointer', 
            border: `1px solid ${reportType === 'monthly' ? 'var(--emerald-primary)' : 'var(--border-card)'}`,
            background: reportType === 'monthly' ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
          }}
        >
          <div className="card-header">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>MONTHLY ESG</span>
            <span className="card-badge">30-Day Aggregation</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Monthly Corporate ESG Statement
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Cumulative decarbonization targets, regulatory framework benchmarks (GHG Protocol), and CapEx ROI.
          </p>
          <div style={{ marginTop: '14px', fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 600 }}>
            {reportType === 'monthly' ? '✓ Selected for generation' : 'Click to select'}
          </div>
        </div>
      </div>

      {/* Report Preview Surface */}
      <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', borderRadius: '4px', fontWeight: 700 }}>
                CARBONIQ REPORT PREVIEW
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                DOC REF: CIR-2026-W37
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              GreenTech Manufacturing — Weekly Carbon Audit Report
            </h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Reporting Window: September 08 – September 14, 2026 | Prepared for: Sustainability Steering Committee
            </div>
          </div>

          <button className="btn btn-secondary" onClick={handlePrint} title="Print document">
            <Printer size={15} />
            Print Report
          </button>
        </div>

        {/* Section 1: Executive KPI Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--emerald-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            1. Key Carbon Accounting Metrics
          </h4>
          <div className="dash-grid-equal">
            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Carbon Footprint (Weekly)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0' }}>
                {KPI_DATA.totalFootprint} {KPI_DATA.totalFootprintUnit}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--rose-anomaly)', fontWeight: 600 }}>
                +8.4% compared with previous baseline
              </div>
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carbon Intensity Factor</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0' }}>
                {KPI_DATA.carbonIntensity} {KPI_DATA.carbonIntensityUnit}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Based on 2,840 kWh electricity consumption
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Emission Sources Breakdown */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cyan-accent)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            2. Source Activity & Scope Decomposition
          </h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vector</th>
                <th>Scope Classification</th>
                <th>Consumption Volume</th>
                <th>Emission Factor</th>
                <th>Footprint (kg CO₂e)</th>
                <th>Share %</th>
              </tr>
            </thead>
            <tbody>
              {EMISSION_SOURCES.map((source, idx) => (
                <tr key={idx}>
                  <td><strong>{source.name}</strong></td>
                  <td><span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{source.scope}</span></td>
                  <td>{source.consumption}</td>
                  <td>{source.factor}</td>
                  <td style={{ fontWeight: 700, color: source.isDominant ? 'var(--rose-anomaly)' : 'var(--text-main)' }}>
                    {source.co2e} kg
                  </td>
                  <td style={{ fontWeight: 700 }}>{source.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: AI Intelligence Digest */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--purple-ai)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            3. AI Intelligence & Anomaly Findings
          </h4>
          <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700, marginBottom: '6px' }}>
              Multi-Factor Root-Cause Summary (Confidence: {WHY_EMISSIONS_CHANGED.confidence}%):
            </div>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6 }}>
              {WHY_EMISSIONS_CHANGED.aiInterpretation}
            </p>
          </div>
        </div>

        {/* Sign-Off Block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-card)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          <div>
            <strong>Report Prepared by:</strong> CARBONIQ Automated Reporting Engine v1.2 (Academic Prototype)
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>Audited Date:</strong> {new Date().toLocaleDateString()} | Demo Facility Verification
          </div>
        </div>
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Academic Prototype Reporting Note:</strong> Reports conform to standard GHG Protocol Corporate Standards layout (Scope 1 direct, Scope 2 electricity indirect, Scope 3 transport). All figures originate from simulated academic scenarios.</span>
      </div>
    </div>
  );
}
