import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Zap, 
  Flame, 
  Truck, 
  Thermometer, 
  Sun, 
  RefreshCw, 
  Code, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SIMULATED_SENSORS } from '../data/mockData';

export default function SensorsView({ onShowToast }) {
  const [sensors, setSensors] = useState(SIMULATED_SENSORS);
  const [expandedSensorId, setExpandedSensorId] = useState('SENS-01');
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());
  const [isSimulatingLive, setIsSimulatingLive] = useState(true);

  // Simulated live telemetry micro-fluctuation
  useEffect(() => {
    if (!isSimulatingLive) return;
    const timer = setInterval(() => {
      setLastHeartbeat(new Date().toLocaleTimeString());
      setSensors(prev => prev.map(s => {
        // Minor realistic electrical noise (+/- 0.5%)
        const delta = (Math.random() - 0.5) * 0.8;
        return {
          ...s,
          currentReading: Number((s.currentReading + delta).toFixed(1)),
          lastUpdate: 'Just now (<1s)'
        };
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, [isSimulatingLive]);

  const toggleSensorExpansion = (id) => {
    setExpandedSensorId(expandedSensorId === id ? null : id);
  };

  const generateJsonPayload = (sensor) => {
    return JSON.stringify({
      gateway_id: "GW-GREENTECH-01",
      device_eui: sensor.id,
      timestamp: new Date().toISOString(),
      protocol: sensor.type.includes('Modbus') ? 'MODBUS_TCP' : 'MQTT_JSON',
      metrics: {
        raw_reading: sensor.currentReading,
        unit: sensor.unit,
        carbon_emission_rate_kg_per_hr: sensor.co2Rate,
        health: sensor.health,
        status: sensor.status
      },
      firmware_ver: "1.4.2-edge-sim"
    }, null, 2);
  };

  return (
    <div className="sensors-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Radio size={24} style={{ color: 'var(--cyan-accent)' }} />
            Simulated IoT Data Sources & Telemetry Panel
          </h2>
          <p className="page-subtitle">
            Edge sensor feeds and telemetry ingest points demonstrating future industrial hardware connectivity.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="prototype-tag" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--cyan-accent)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <Radio size={13} className="status-dot-green" />
            SIMULATED IoT DATA (Edge Emulation)
          </div>
          <button 
            className={`btn ${isSimulatingLive ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => {
              setIsSimulatingLive(!isSimulatingLive);
              if (onShowToast) onShowToast(isSimulatingLive ? 'Paused edge sensor telemetry stream' : 'Resumed live simulated sensor stream');
            }}
          >
            <RefreshCw size={14} className={isSimulatingLive ? 'spin-slow' : ''} />
            {isSimulatingLive ? 'Pause Stream' : 'Resume Live Ingest'}
          </button>
        </div>
      </div>

      {/* Stream Status Banner */}
      <div style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-card)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '14px 20px', 
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isSimulatingLive ? 'var(--emerald-primary)' : 'var(--amber-warning)', display: 'inline-block' }}></span>
            Ingest Pipeline: <strong>{isSimulatingLive ? 'ACTIVE (3s Refresh)' : 'PAUSED'}</strong>
          </div>
          <span style={{ color: 'var(--text-dim)' }}>|</span>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Last Gateway Ping: <strong>{lastHeartbeat}</strong>
          </div>
          <span style={{ color: 'var(--text-dim)' }}>|</span>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Active Feeds: <strong>5 of 5 Connected</strong>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', background: 'rgba(6, 182, 212, 0.08)', padding: '3px 10px', borderRadius: '4px' }}>
          Protocol Emulation: MQTT v5.0 / Modbus TCP over TLS
        </div>
      </div>

      {/* Sensors Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {sensors.map((sensor) => {
          const isExpanded = expandedSensorId === sensor.id;
          const isAlert = sensor.status.includes('Alert');

          return (
            <div 
              key={sensor.id} 
              className="card"
              style={{ 
                border: `1px solid ${isAlert ? 'rgba(239, 68, 68, 0.4)' : isExpanded ? 'rgba(6, 182, 212, 0.4)' : 'var(--border-card)'}`,
                background: isAlert ? 'rgba(239, 68, 68, 0.03)' : 'var(--bg-card)'
              }}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
                onClick={() => toggleSensorExpansion(sensor.id)}
              >
                {/* Left: Icon, Name, Type */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 'var(--radius-md)', 
                    background: isAlert ? 'var(--rose-subtle)' : 'var(--cyan-subtle)', 
                    color: isAlert ? 'var(--rose-anomaly)' : 'var(--cyan-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {sensor.id === 'SENS-01' ? <Zap size={20} /> :
                     sensor.id === 'SENS-02' ? <Flame size={20} /> :
                     sensor.id === 'SENS-03' ? <Truck size={20} /> :
                     sensor.id === 'SENS-04' ? <Thermometer size={20} /> :
                     <Sun size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {sensor.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', padding: '1px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                        {sensor.id}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {sensor.type} • Location: {sensor.location}
                    </div>
                  </div>
                </div>

                {/* Right: Reading, Unit, Status, Expand Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isAlert ? 'var(--rose-anomaly)' : 'var(--text-main)', fontFamily: 'var(--font-sans)' }}>
                      {sensor.currentReading} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sensor.unit}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isAlert ? 'var(--rose-anomaly)' : 'var(--emerald-primary)', fontWeight: 600 }}>
                      Rate: {sensor.co2Rate} kg CO₂e/hr
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '90px' }}>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: 700, 
                      color: isAlert ? 'var(--rose-anomaly)' : 'var(--emerald-primary)', 
                      background: isAlert ? 'var(--rose-subtle)' : 'var(--emerald-subtle)', 
                      padding: '3px 8px', 
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: isAlert ? 'var(--rose-anomaly)' : 'var(--emerald-primary)' }}></span>
                      {sensor.status}
                    </span>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '3px' }}>
                      {sensor.lastUpdate}
                    </div>
                  </div>

                  <div style={{ color: 'var(--text-muted)' }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* Expandable JSON Payload Inspector */}
              {isExpanded && (
                <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan-accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Code size={14} /> Edge Telemetry JSON Payload (Simulated MQTT Transmission):
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Emulating physical hardware schema
                    </span>
                  </div>

                  <pre style={{ 
                    background: '#070b13', 
                    padding: '14px', 
                    borderRadius: 'var(--radius-md)', 
                    fontSize: '0.78rem', 
                    fontFamily: 'var(--font-mono)', 
                    color: '#38bdf8', 
                    overflowX: 'auto',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    lineHeight: 1.5
                  }}>
                    {generateJsonPayload(sensor)}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Honest Academic Callout */}
      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Academic Honesty Notice:</strong> All 5 sensor streams displayed above are generated by our simulated telemetry engine. They illustrate how real Modbus RTU/TCP power analyzers, Coriolis fuel meters, and OBD-II telematics units will interface with CARBONIQ in future production phases without falsely claiming current physical hardware deployment.</span>
      </div>
    </div>
  );
}
