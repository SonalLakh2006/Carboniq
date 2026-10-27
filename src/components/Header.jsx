import React from 'react';
import { 
  Play, 
  Bell, 
  Calendar, 
  Building2, 
  ChevronDown, 
  AlertCircle,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { FACILITIES } from '../data/mockData';

export default function Header({ 
  selectedFacility, 
  onSelectFacility, 
  timeframe, 
  setTimeframe, 
  onOpenDemoTour,
  onOpenAnomalyModal,
  activeAnomalyCount = 1
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* Facility Selector */}
        <div className="facility-badge" title="Switch Demo Facility">
          <Building2 size={16} className="status-dot-green" />
          <select 
            value={selectedFacility.id} 
            onChange={(e) => {
              const fac = FACILITIES.find(f => f.id === e.target.value);
              if (fac) onSelectFacility(fac);
            }}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-main)', 
              fontWeight: 600, 
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {FACILITIES.map(fac => (
              <option key={fac.id} value={fac.id} style={{ background: '#131c31', color: '#f8fafc' }}>
                {fac.name}
              </option>
            ))}
          </select>
          <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
        </div>

        {/* Prototype Transparency Tag */}
        <div className="prototype-tag" title="Academic Proof of Concept with simulated datasets">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber-warning)', display: 'inline-block' }}></span>
          Demo Data / Academic Prototype
        </div>
      </div>

      <div className="header-right">
        {/* Timeframe Selector */}
        <div className="timeframe-selector">
          <button 
            className={`time-btn ${timeframe === 'today' ? 'active' : ''}`}
            onClick={() => setTimeframe('today')}
          >
            Today
          </button>
          <button 
            className={`time-btn ${timeframe === '7d' ? 'active' : ''}`}
            onClick={() => setTimeframe('7d')}
          >
            7 Days
          </button>
          <button 
            className={`time-btn ${timeframe === '30d' ? 'active' : ''}`}
            onClick={() => setTimeframe('30d')}
          >
            30 Days
          </button>
        </div>

        {/* 3-Min Seminar Demo Tour Button */}
        <button 
          className="btn-demo-tour" 
          onClick={onOpenDemoTour}
          title="Launch 3-5 Minute Presentation Guide"
        >
          <Play size={14} fill="#ffffff" />
          <span>3-Min Demo Tour</span>
        </button>

        {/* Notifications Icon with active anomaly counter */}
        <button 
          className="icon-button" 
          onClick={onOpenAnomalyModal}
          title="Active Anomaly Notifications"
        >
          <Bell size={17} />
          {activeAnomalyCount > 0 && (
            <span className="notification-count">{activeAnomalyCount}</span>
          )}
        </button>

        {/* Academic Role / User Pill */}
        <div className="user-profile" title="Second-Year CSE Seminar Prototype">
          <div className="user-avatar">
            <GraduationCap size={15} />
          </div>
          <div>
            <div className="user-name">CSE Seminar Demo</div>
            <div className="user-role">Student Presenter</div>
          </div>
        </div>
      </div>
    </header>
  );
}
