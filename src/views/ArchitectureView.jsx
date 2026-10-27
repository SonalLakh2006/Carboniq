import React, { useState } from 'react';
import { 
  Layers, 
  Radio, 
  Cloud, 
  Cpu, 
  BrainCircuit, 
  LayoutDashboard, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export default function ArchitectureView() {
  const [selectedLayer, setSelectedLayer] = useState('ai');

  const ARCH_LAYERS = [
    {
      id: 'sources',
      title: '1. DATA SOURCES & INGESTION',
      icon: Radio,
      color: 'var(--cyan-accent)',
      badge: 'Edge Layer',
      subtitle: 'Simulated IoT Sensors, Utility Smart Meters & Fleet Gateways',
      description: 'Collects operational activity data across electrical switchgear, boiler fuel lines, vehicle telematics, and thermal HVAC systems.',
      components: [
        'Modbus/TCP Power Meters (Main Incomer)',
        'Coriolis Fuel Mass Flow Gateways (Gensets)',
        'OBD-II Fleet GPS Telematics (Logistics)',
        'Building Management System (BMS BACnet)',
        'Utility Tariff & Grid Factor REST APIs'
      ],
      academicNote: 'Demonstrated via simulated sensor streams in this prototype; ready for real edge hardware gateways in future pilot.'
    },
    {
      id: 'cloud',
      title: '2. CLOUD INGESTION & DATA LAYER',
      icon: Cloud,
      color: 'var(--blue-info)',
      badge: 'Scalable Backbone',
      subtitle: 'MQTT Message Broker, Time-Series TSDB & Data Lakehouse',
      description: 'High-throughput stream buffering and immutable historical record storage designed to handle sub-second sensor ticks without data loss.',
      components: [
        'MQTT Broker (TLS Encryption & QoS 1)',
        'Time-Series Database (InfluxDB / TimescaleDB)',
        'Relational Master Data (PostgreSQL / SQLite)',
        'JWT Enterprise Role-Based Access Control'
      ],
      academicNote: 'Implemented as local lightweight mock state for prototype stability during live academic presentations.'
    },
    {
      id: 'processing',
      title: '3. DATA PROCESSING & NORMALIZATION',
      icon: Cpu,
      color: 'var(--amber-warning)',
      badge: 'Cleaning Engine',
      subtitle: 'Harmonization, Outlier Filtering & Carbon Accounting Formulation',
      description: 'Translates raw engineering units (kWh, Liters, km) into standard CO₂ equivalent using regional greenhouse gas emission factors.',
      components: [
        'Formula: Activity Data × Emission Factor = CO₂e',
        'Rolling Baseline Variance Calculation',
        'Unit Harmonization & Conversion Engine',
        'GHG Protocol Scope 1, 2, 3 Segregation'
      ],
      academicNote: 'Configurable factors (India CEA, US EPA, UK DEFRA) demonstrating transparent mathematical rigor.'
    },
    {
      id: 'ai',
      title: '4. AI & MACHINE LEARNING INTELLIGENCE',
      icon: BrainCircuit,
      color: 'var(--purple-ai)',
      badge: 'Core Differentiator',
      subtitle: 'Anomaly Detection, Predictive Forecasting & Root-Cause Attribution',
      description: 'The analytical brain of CARBONIQ that transforms passive telemetry monitoring into proactive, decision-grade operational intelligence.',
      components: [
        'Statistical Variance Anomaly Detection (3σ control limits)',
        'Multi-Factor Root-Cause Attribution (“Why Did Emissions Change?”)',
        'Autoregressive 7-Day Time-Series Predictive Forecasting',
        'Actionable Decarbonization Recommendation Generator'
      ],
      academicNote: 'Driven by transparent heuristic & statistical inference in prototype; targeted for LSTM / Isolation Forest ML in future work.'
    },
    {
      id: 'dashboard',
      title: '5. PRESENTATION & DASHBOARD LAYER',
      icon: LayoutDashboard,
      color: 'var(--emerald-primary)',
      badge: 'User Interface',
      subtitle: 'Responsive Executive Web Application & What-If Scenario Simulator',
      description: 'Modern, high-contrast, minimal SaaS interface communicating situational awareness within 5–10 seconds for plant managers and administrators.',
      components: [
        'React Single Page Architecture',
        'Interactive Recharts Time-Series Visualizations',
        'Dynamic What-If Decarbonization Simulator',
        'GHG Protocol Executive PDF/CSV Reporting Engine'
      ],
      academicNote: 'Fully responsive, clean neutral dark theme prioritizing clarity, data hierarchy, and accessibility.'
    },
    {
      id: 'action',
      title: '6. ACTION & OPERATIONAL INTERVENTION',
      icon: CheckCircle2,
      color: 'var(--emerald-primary)',
      badge: 'Impact',
      subtitle: 'Load Shifting, Work Orders & Sustainable Enterprise Governance',
      description: 'Closing the loop: from insight directly into verified operational action, tariff optimization, and certified carbon reduction.',
      components: [
        'Automated Peak Load Shifting Work Orders',
        'Logistics Fleet Batching Recommendations',
        'Chiller Setpoint Dynamic BMS Controls',
        'Executive ESG Compliance Sign-Off'
      ],
      academicNote: 'Validates the product philosophy: MEASURE → UNDERSTAND → PREDICT → RECOMMEND → ACT.'
    }
  ];

  const activeInfo = ARCH_LAYERS.find(l => l.id === selectedLayer) || ARCH_LAYERS[3];

  return (
    <div className="architecture-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Layers size={24} style={{ color: 'var(--cyan-accent)' }} />
            System Architecture & Technical Pipeline
          </h2>
          <p className="page-subtitle">
            End-to-end multi-tier engineering pipeline linking edge data sources to AI analytics and executive decision-making.
          </p>
        </div>

        <div className="prototype-tag">
          <Sparkles size={13} />
          Academic PoC System Design
        </div>
      </div>

      {/* Visual Pipeline Stepper */}
      <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div className="card-header" style={{ marginBottom: '20px' }}>
          <div className="card-title">
            Interactive Multi-Tier Architectural Pipeline
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click any layer to inspect technical details</span>
        </div>

        {/* Responsive Pipeline Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {ARCH_LAYERS.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = selectedLayer === layer.id;

            return (
              <div 
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                style={{ 
                  padding: '16px 12px', 
                  borderRadius: 'var(--radius-md)', 
                  background: isSelected ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)', 
                  border: `1px solid ${isSelected ? layer.color : 'var(--border-card)'}`, 
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? `0 0 15px -3px ${layer.color}44` : 'none'
                }}
              >
                <div style={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%', 
                  background: `${layer.color}18`, 
                  color: layer.color,
                  margin: '0 auto 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: layer.color, textTransform: 'uppercase', marginBottom: '2px' }}>
                  STEP {idx + 1}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {layer.title.split('. ')[1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Layer Inspection Card */}
      <div className="card" style={{ border: `1px solid ${activeInfo.color}44`, marginBottom: '24px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 'var(--radius-md)', 
              background: `${activeInfo.color}20`, 
              color: activeInfo.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <activeInfo.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: activeInfo.color, fontWeight: 700, textTransform: 'uppercase' }}>
                {activeInfo.badge}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {activeInfo.title}
              </h3>
            </div>
          </div>

          <span className="card-badge" style={{ color: activeInfo.color, borderColor: `${activeInfo.color}44` }}>
            {activeInfo.subtitle}
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '20px' }}>
          {activeInfo.description}
        </p>

        {/* Components List */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
            Key Architecture Modules & Interfaces:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
            {activeInfo.components.map((comp, cIdx) => (
              <div 
                key={cIdx} 
                style={{ 
                  padding: '10px 14px', 
                  borderRadius: 'var(--radius-sm)', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid var(--border-card)',
                  fontSize: '0.82rem',
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: activeInfo.color }}></span>
                {comp}
              </div>
            ))}
          </div>
        </div>

        {/* Academic Note */}
        <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: activeInfo.color }}>Implementation Status:</strong> {activeInfo.academicNote}
        </div>
      </div>

      {/* Technology Pillar Badges */}
      <div className="dash-grid-equal" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BrainCircuit size={18} style={{ color: 'var(--purple-ai)' }} />
              AI & Machine Learning Pillar
            </div>
            <span className="card-badge">Algorithms</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <div>• <strong>Current Prototype:</strong> Rolling statistical baseline calculation, variance detection (3σ), and multi-factor vector contribution decomposition.</div>
            <div style={{ marginTop: '8px' }}>• <strong>Future Roadmap:</strong> Isolation Forest and Autoencoder unsupervised anomaly detection, combined with LSTM neural networks for weather-correlated forecasting.</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <ShieldCheck size={18} style={{ color: 'var(--emerald-primary)' }} />
              Enterprise Security & Governance
            </div>
            <span className="card-badge">Zero Trust</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <div>• <strong>Current Prototype:</strong> Isolated simulated data structures ensuring no sensitive industrial intellectual property is exposed.</div>
            <div style={{ marginTop: '8px' }}>• <strong>Future Roadmap:</strong> TLS 1.3 encrypted MQTT edge ingestion, role-based access control (RBAC), and optional blockchain anchoring for tamper-proof carbon audit compliance.</div>
          </div>
        </div>
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>System Architecture Overview:</strong> This architecture demonstrates modular separation of concerns where edge sensors, ingestion brokers, analytics processors, and presentation dashboards can be developed, tested, and scaled independently.</span>
      </div>
    </div>
  );
}
