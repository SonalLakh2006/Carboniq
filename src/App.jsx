import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AnomalyModal from './components/AnomalyModal';
import WhyChangedModal from './components/WhyChangedModal';
import DemoTourModal from './components/DemoTourModal';
import ReportModal from './components/ReportModal';

// Existing Industrial Views
import OverviewView from './views/OverviewView';
import CarbonMonitorView from './views/CarbonMonitorView';
import EmissionSourcesView from './views/EmissionSourcesView';
import AIInsightsView from './views/AIInsightsView';
import AnomalyView from './views/AnomalyView';
import ForecastView from './views/ForecastView';
import RecommendationsView from './views/RecommendationsView';
import SimulatorView from './views/SimulatorView';
import ReportsView from './views/ReportsView';
import SensorsView from './views/SensorsView';
import ArchitectureView from './views/ArchitectureView';
import DesignThinkingView from './views/DesignThinkingView';
import LimitationsView from './views/LimitationsView';

// NEW Personal Carbon Tracking Views
import PersonalDashboardView from './views/PersonalDashboardView';
import ActivityLogView from './views/ActivityLogView';
import PersonalReportsView from './views/PersonalReportsView';

import { FACILITIES } from './data/mockData';
import { useActivityStore } from './data/useActivityStore';

export default function App() {
  // Navigation & Facility State
  const [activeTab, setActiveTab] = useState('personal-dashboard');
  const [selectedFacility, setSelectedFacility] = useState(FACILITIES[0]);
  const [timeframe, setTimeframe] = useState('today');

  // Personal Activity Store (localStorage-backed)
  const {
    activities,
    settings,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity,
    resetToDemo,
    clearAllData,
    updateSettings,
  } = useActivityStore();

  // Modals
  const [isAnomalyModalOpen, setIsAnomalyModalOpen] = useState(false);
  const [isWhyChangedModalOpen, setIsWhyChangedModalOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    showToast(`Switched facility to: ${facility.name}`);
  };

  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
    showToast(`Updated timeframe to: ${tf === 'today' ? 'Today (Hourly)' : tf === '7d' ? 'Past 7 Days' : 'Past 30 Days'}`);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        activeAnomalyCount={1}
      />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header */}
        <Header 
          selectedFacility={selectedFacility}
          onSelectFacility={handleFacilityChange}
          timeframe={timeframe}
          setTimeframe={handleTimeframeChange}
          onOpenDemoTour={() => setIsDemoTourOpen(true)}
          onOpenAnomalyModal={() => setIsAnomalyModalOpen(true)}
          activeAnomalyCount={1}
        />

        {/* Viewport for Active Tab */}
        <main className="content-viewport">
          {activeTab === 'overview' && (
            <OverviewView 
              timeframe={timeframe}
              onOpenAnomalyModal={() => setIsAnomalyModalOpen(true)}
              onOpenWhyChangedModal={() => setIsWhyChangedModalOpen(true)}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'monitor' && (
            <CarbonMonitorView 
              onOpenAnomalyModal={() => setIsAnomalyModalOpen(true)}
            />
          )}

          {activeTab === 'sources' && (
            <EmissionSourcesView />
          )}

          {activeTab === 'insights' && (
            <AIInsightsView 
              onOpenWhyChangedModal={() => setIsWhyChangedModalOpen(true)}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'anomaly' && (
            <AnomalyView 
              onOpenWhyChangedModal={() => setIsWhyChangedModalOpen(true)}
              onNavigateToTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'forecast' && (
            <ForecastView 
              onNavigateToTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsView 
              onNavigateToTab={setActiveTab}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'simulator' && (
            <SimulatorView 
              onShowToast={showToast}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView 
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'sensors' && (
            <SensorsView 
              onShowToast={showToast}
            />
          )}

          {activeTab === 'architecture' && (
            <ArchitectureView />
          )}

          {activeTab === 'design-thinking' && (
            <DesignThinkingView />
          )}

          {activeTab === 'limitations' && (
            <LimitationsView />
          )}

          {/* ── NEW PERSONAL CARBON TRACKING VIEWS ── */}
          {activeTab === 'personal-dashboard' && isLoaded && (
            <PersonalDashboardView
              activities={activities}
              settings={settings}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'activity-log' && isLoaded && (
            <ActivityLogView
              activities={activities}
              settings={settings}
              onAddActivity={addActivity}
              onUpdateActivity={updateActivity}
              onDeleteActivity={deleteActivity}
              onResetDemo={() => { resetToDemo(); showToast('Demo data restored!'); }}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'personal-reports' && isLoaded && (
            <PersonalReportsView
              activities={activities}
              settings={settings}
              onUpdateSettings={updateSettings}
              onClearData={clearAllData}
              onResetDemo={() => { resetToDemo(); showToast('Demo data restored!'); }}
              onShowToast={showToast}
            />
          )}
        </main>

      </div>

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid var(--emerald-primary)',
          color: '#ffffff',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 9999,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideUp 0.2s ease-out'
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-primary)', display: 'inline-block' }}></span>
          {toastMessage}
        </div>
      )}

      {/* Modals & Overlays */}
      <AnomalyModal 
        isOpen={isAnomalyModalOpen}
        onClose={() => setIsAnomalyModalOpen(false)}
        onNavigateToSimulator={() => {
          setIsAnomalyModalOpen(false);
          setActiveTab('simulator');
        }}
      />

      <WhyChangedModal 
        isOpen={isWhyChangedModalOpen}
        onClose={() => setIsWhyChangedModalOpen(false)}
        onNavigateToRecommendations={() => {
          setIsWhyChangedModalOpen(false);
          setActiveTab('recommendations');
        }}
      />

      <DemoTourModal 
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        facilityName={selectedFacility.name}
      />
    </div>
  );
}
