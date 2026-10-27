import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  PieChart, 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  Sliders, 
  FileText, 
  Radio, 
  Layers, 
  Compass, 
  ShieldAlert,
  Leaf,
  ClipboardList,
  BarChart3,
  Settings
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeAnomalyCount = 1 }) {
  const navGroups = [
    {
      category: '🌿 Personal Tracking',
      items: [
        { id: 'personal-dashboard', label: 'My Dashboard', icon: Leaf, badge: 'NEW', badgeClass: 'badge-ai' },
        { id: 'activity-log', label: 'Activity Log', icon: ClipboardList },
        { id: 'personal-reports', label: 'Reports & Settings', icon: Settings },
      ]
    },
    {
      category: 'Industrial Monitor',
      items: [
        { id: 'overview', label: 'Facility Overview', icon: LayoutDashboard },
        { id: 'monitor', label: 'Carbon Monitor', icon: Activity },
        { id: 'sources', label: 'Emission Sources', icon: PieChart },
      ]
    },
    {
      category: 'AI Intelligence',
      items: [
        { id: 'insights', label: 'AI Insights', icon: Sparkles, badge: 'AI', badgeClass: 'badge-ai' },
        { id: 'anomaly', label: 'Anomaly Detection', icon: AlertTriangle, badge: activeAnomalyCount ? '1 Alert' : null, badgeClass: 'badge-alert' },
        { id: 'forecast', label: 'Emission Forecast', icon: TrendingUp },
        { id: 'recommendations', label: 'Recommendations', icon: Lightbulb, badge: '4 Actions', badgeClass: 'badge-demo' },
      ]
    },
    {
      category: 'Action & Operations',
      items: [
        { id: 'simulator', label: 'What-If Simulator', icon: Sliders, badge: 'Interactive', badgeClass: 'badge-ai' },
        { id: 'reports', label: 'Executive Reports', icon: FileText },
        { id: 'sensors', label: 'Simulated IoT Panel', icon: Radio, badge: '5 Feeds', badgeClass: 'badge-demo' },
      ]
    },
    {
      category: 'Seminar & Architecture',
      items: [
        { id: 'architecture', label: 'System Architecture', icon: Layers },
        { id: 'design-thinking', label: 'Design Thinking', icon: Compass },
        { id: 'limitations', label: 'Limitations & Scope', icon: ShieldAlert },
      ]
    }
  ];


  return (
    <aside className="app-sidebar">
      {/* Brand Identity */}
      <div className="sidebar-brand">
        <div className="brand-icon-box">
          <Leaf size={20} />
        </div>
        <div className="brand-info">
          <h1>
            CARBONIQ
            <span style={{ fontSize: '0.62rem', padding: '2px 6px', background: 'var(--emerald-subtle)', color: 'var(--emerald-primary)', borderRadius: '4px', border: '1px solid rgba(16,185,129,0.3)' }}>
              PoC
            </span>
          </h1>
          <div className="tagline">From Carbon Data to Intelligent Action</div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="sidebar-nav">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <div className="nav-category">{group.category}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className="nav-item-left">
                    <Icon size={18} style={{ color: isActive ? 'var(--emerald-primary)' : 'var(--text-muted)' }} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`nav-badge ${item.badgeClass || ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Academic Prototype Footer */}
      <div className="sidebar-footer">
        <div className="academic-badge">
          <div className="dot"></div>
          <div className="academic-text">
            <strong>2nd-Year CSE Seminar</strong>
            Academic Proof-of-Concept Prototype
          </div>
        </div>
      </div>
    </aside>
  );
}
