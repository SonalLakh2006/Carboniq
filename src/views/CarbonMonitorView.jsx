import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Clock
} from 'lucide-react';
import { HOURLY_EMISSIONS, SIMULATED_SENSORS } from '../data/mockData';

export default function CarbonMonitorView({ _onOpenAnomalyModal }) {
  const [data, setData] = useState(HOURLY_EMISSIONS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [spikeInjected, setSpikeInjected] = useState(true);
  const [lastTick, setLastTick] = useState('Just now');

  // Simulated live telemetry tick
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setLastTick(new Date().toLocaleTimeString());
    }, 4000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Inject or clear simulated peak spike
  const toggleSpike = () => {
    if (spikeInjected) {
      // Remove spike
      const smoothed = data.map(item => item.hour === '14:00' ? { ...item, actual: 14.8, isAnomaly: false } : item);
      setData(smoothed);
      setSpikeInjected(false);
    } else {
      // Re-inject spike
      const spiked = data.map(item => item.hour === '14:00' ? { ...item, actual: 24.8, isAnomaly: true } : item);
      setData(spiked);
      setSpikeInjected(true);
    }
  };

  const resetBaseline = () => {
    setData(HOURLY_EMISSIONS);
    setSpikeInjected(true);
  };

  return (
    <div className="carbon-monitor-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Activity size={24} style={{ color: 'var(--emerald-primary)' }} />
            Real-Time Carbon Monitor
          </h2>
          <p className="page-subtitle">
            Sub-hourly telemetry aggregation from simulated edge meters and facility subsystems.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className={`btn ${isStreaming ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setIsStreaming(!isStreaming)}
          >
            {isStreaming ? <Pause size={15} /> : <Play size={15} />}
            {isStreaming ? 'Pause Telemetry' : 'Resume Telemetry'}
          </button>
          <button 
            className={`btn ${spikeInjected ? 'btn-secondary' : 'btn-outline-emerald'}`}
            onClick={toggleSpike}
            title="Inject simulated load anomaly to test AI detection"
          >
            <AlertTriangle size={15} style={{ color: spikeInjected ? 'var(--rose-anomaly)' : 'var(--amber-warning)' }} />
            {spikeInjected ? 'Clear 14:00 Spike' : 'Inject Load Spike (+25%)'}
          </button>
          <button className="icon-button" onClick={resetBaseline} title="Reset Baseline">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Stream Status Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '10px 16px', 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-card)', 
        borderRadius: 'var(--radius-md)', 
        marginBottom: '20px',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="status-dot-green" style={{ animation: isStreaming ? 'pulse-danger 2s infinite' : 'none' }}></span>
          <span>Telemetry Status: <strong>{isStreaming ? 'Active Simulated Stream' : 'Stream Paused'}</strong></span>
          <span style={{ color: 'var(--text-dim)' }}>|</span>
          <span style={{ color: 'var(--text-muted)' }}>Sampling Rate: <strong>1 sec virtual tick (Modbus/MQTT)</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
          <Clock size={14} />
          <span>Last Ingest: {lastTick}</span>
        </div>
      </div>

      {/* Real-time Multi-Series Chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              Time-Series Carbon Emission Rate (kg CO₂e/hr)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Decomposed by subsystem streams: Grid Electricity, Auxiliary Fuel, Transport, and HVAC
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span> Net Total
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38bdf8' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }}></span> Electricity
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></span> Fuel
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
              <span style={{ width: 8, height: 2, background: '#64748b' }}></span> Baseline
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#475569" fontSize={11} tickLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={[0, 28]} />
              <Tooltip 
                contentStyle={{ background: '#0f172a', border: '1px solid var(--border-card)', borderRadius: '8px', fontSize: '0.8rem' }} 
              />
              <Line type="monotone" dataKey="actual" name="Net Emissions (kg/hr)" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="electricity" name="Electricity" stroke="#38bdf8" strokeWidth={2} strokeDasharray="3 3" dot={false} />
              <Line type="monotone" dataKey="fuel" name="Fuel" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="baseline" name="Expected Norm" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              
              {spikeInjected && (
                <ReferenceLine 
                  x="14:00" 
                  stroke="#ef4444" 
                  strokeDasharray="3 3" 
                  label={{ value: 'Spike Detected (14:00)', fill: '#ef4444', fontSize: 11, position: 'top' }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Subsystem Telemetry Feeds */}
      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px' }}>
        Live Sensor Feeds & Activity Rates (Simulated Hardware)
      </h3>
      
      <div className="dash-grid-3">
        {SIMULATED_SENSORS.slice(0, 3).map((sensor) => (
          <div key={sensor.id} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>{sensor.id}</span>
              <span style={{ 
                fontSize: '0.7rem', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                background: sensor.status === 'Online' ? 'var(--emerald-subtle)' : 'var(--rose-subtle)',
                color: sensor.status === 'Online' ? 'var(--emerald-primary)' : 'var(--rose-anomaly)',
                fontWeight: 700 
              }}>
                {sensor.status}
              </span>
            </div>
            
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              {sensor.name}
            </div>
            
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-primary)', margin: '8px 0' }}>
              {sensor.currentReading} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{sensor.unit}</span>
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '8px' }}>
              <span>Emission Rate:</span>
              <strong style={{ color: 'var(--text-main)' }}>{sensor.co2Rate} kg CO₂e/hr</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="disclaimer-banner">
        <span>ℹ️ <strong>Simulated Telemetry:</strong> In a deployed production setup, these streams originate from Modbus/BACnet smart power meters and MQTT IoT gateways. For this academic demonstration, readings are generated deterministically.</span>
      </div>
    </div>
  );
}
