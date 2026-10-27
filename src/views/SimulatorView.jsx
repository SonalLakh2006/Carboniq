import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  TrendingDown, 
  Zap, 
  Flame, 
  Truck, 
  Sun, 
  Save, 
  DollarSign
} from 'lucide-react';

// Baseline weekly emissions breakdown (total = 1,320 kg CO2e unmitigated forecast)
const BASELINE = {
  electricity: 686, // 52%
  fuel: 238, // 18%
  transport: 158, // 12%
  hvac: 132, // 10%
  operations: 79, // 6%
  other: 27, // 2%
  total: 1320,
};

export default function SimulatorView({ onShowToast }) {
  // Scenario levers state
  const [electricityReduction, setElectricityReduction] = useState(10); // %
  const [fuelReduction, setFuelReduction] = useState(15); // %
  const [transportReduction, setTransportReduction] = useState(10); // %
  const [renewableContribution, setRenewableContribution] = useState(20); // %
  const [loadShiftPeak, setLoadShiftPeak] = useState(12); // %

  // Dynamically calculate scenario emissions
  const scenarioResult = useMemo(() => {
    // Electricity reduced directly by energy efficiency + offset by renewable share + load shifting efficiency
    const elecEffectiveReduction = Math.min(electricityReduction + (renewableContribution * 0.5) + (loadShiftPeak * 0.3), 60);
    const elecSaved = (BASELINE.electricity * elecEffectiveReduction) / 100;
    
    // Fuel saved
    const fuelSaved = (BASELINE.fuel * fuelReduction) / 100;
    
    // Transport saved
    const transportSaved = (BASELINE.transport * transportReduction) / 100;
    
    // HVAC benefit from load shift
    const hvacSaved = (BASELINE.hvac * (loadShiftPeak * 0.4)) / 100;

    const totalSaved = elecSaved + fuelSaved + transportSaved + hvacSaved;
    const projectedTotal = Math.max(BASELINE.total - totalSaved, 0);
    const reductionPercent = (totalSaved / BASELINE.total) * 100;

    // Financial tariff savings estimate (~$0.14/kWh equivalent)
    const estimatedCostSavings = (elecSaved * 2.1) + (fuelSaved * 1.8);

    return {
      projectedTotal: Math.round(projectedTotal),
      totalSaved: Math.round(totalSaved),
      reductionPercent: reductionPercent.toFixed(1),
      elecSaved: Math.round(elecSaved),
      fuelSaved: Math.round(fuelSaved),
      transportSaved: Math.round(transportSaved),
      estimatedCostSavings: Math.round(estimatedCostSavings),
    };
  }, [electricityReduction, fuelReduction, transportReduction, renewableContribution, loadShiftPeak]);

  // Preset Handlers
  const applyPreset = (name) => {
    if (name === 'default') {
      setElectricityReduction(10);
      setFuelReduction(15);
      setTransportReduction(10);
      setRenewableContribution(20);
      setLoadShiftPeak(12);
      if (onShowToast) onShowToast('Applied Preset: Balanced Recommendation Scenario');
    } else if (name === 'zerocapex') {
      setElectricityReduction(12);
      setFuelReduction(5);
      setTransportReduction(18);
      setRenewableContribution(5);
      setLoadShiftPeak(20);
      if (onShowToast) onShowToast('Applied Preset: Zero-CapEx Operational Shifting');
    } else if (name === 'aggressive') {
      setElectricityReduction(25);
      setFuelReduction(25);
      setTransportReduction(25);
      setRenewableContribution(45);
      setLoadShiftPeak(22);
      if (onShowToast) onShowToast('Applied Preset: Aggressive Decarbonization');
    } else if (name === 'reset') {
      setElectricityReduction(0);
      setFuelReduction(0);
      setTransportReduction(0);
      setRenewableContribution(0);
      setLoadShiftPeak(0);
      if (onShowToast) onShowToast('Reset all sliders to current baseline (0% reduction)');
    }
  };

  const handleSaveScenario = () => {
    if (onShowToast) {
      onShowToast(`Scenario saved: -${scenarioResult.totalSaved} kg CO₂e (${scenarioResult.reductionPercent}% cut)`);
    }
  };

  return (
    <div className="simulator-view">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Sliders size={24} style={{ color: 'var(--emerald-primary)' }} />
            What-If Decarbonization Scenario Simulator
          </h2>
          <p className="page-subtitle">
            <em>“What if we change our current behaviour?”</em> — Interactive sensitivity modeling for executive decision-making.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => applyPreset('reset')}>
            <RotateCcw size={15} />
            Reset Sliders
          </button>
          <button className="btn btn-primary" onClick={handleSaveScenario}>
            <Save size={15} />
            Save Scenario
          </button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Quick Scenario Presets:
        </span>
        <button 
          className="btn btn-secondary" 
          onClick={() => applyPreset('default')}
          style={{ padding: '5px 12px', fontSize: '0.78rem' }}
        >
          Balanced AI Targets (-10% Elec, -15% Fuel)
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => applyPreset('zerocapex')}
          style={{ padding: '5px 12px', fontSize: '0.78rem' }}
        >
          Zero-CapEx Operational Shift
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => applyPreset('aggressive')}
          style={{ padding: '5px 12px', fontSize: '0.78rem' }}
        >
          Aggressive Clean Transition (-25%)
        </button>
      </div>

      {/* Main Simulator Layout: Levers on Left, Comparison on Right */}
      <div className="simulator-container">
        {/* Sliders Form Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              Adjust Decarbonization Levers
            </div>
            <span className="card-badge">5 Active Variables</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Slide any control to instantly re-estimate projected emissions across GreenTech Manufacturing:
          </p>

          {/* Lever 1: Electricity Reduction */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">
                <Zap size={15} style={{ color: 'var(--emerald-primary)' }} />
                Reduce Electricity Consumption
              </span>
              <span className="slider-value">-{electricityReduction}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="1"
              value={electricityReduction}
              onChange={(e) => setElectricityReduction(Number(e.target.value))}
              className="custom-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0% (Status Quo)</span>
              <span>15% (Chiller Reset + LED)</span>
              <span>30% (Aggressive Retrofit)</span>
            </div>
          </div>

          {/* Lever 2: Fuel Reduction */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">
                <Flame size={15} style={{ color: 'var(--amber-warning)' }} />
                Reduce Diesel & Natural Gas Fuel
              </span>
              <span className="slider-value">-{fuelReduction}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="1"
              value={fuelReduction}
              onChange={(e) => setFuelReduction(Number(e.target.value))}
              className="custom-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0%</span>
              <span>15% (Genset Throttling)</span>
              <span>30%</span>
            </div>
          </div>

          {/* Lever 3: Transportation Emissions */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">
                <Truck size={15} style={{ color: 'var(--cyan-accent)' }} />
                Reduce Transportation & Logistics
              </span>
              <span className="slider-value">-{transportReduction}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="1"
              value={transportReduction}
              onChange={(e) => setTransportReduction(Number(e.target.value))}
              className="custom-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0%</span>
              <span>15% (Route Batching)</span>
              <span>30% (EV Fleet Switch)</span>
            </div>
          </div>

          {/* Lever 4: Renewable Energy Contribution */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">
                <Sun size={15} style={{ color: 'var(--emerald-primary)' }} />
                Increase Renewable / Solar Contribution
              </span>
              <span className="slider-value">+{renewableContribution}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              step="1"
              value={renewableContribution}
              onChange={(e) => setRenewableContribution(Number(e.target.value))}
              className="custom-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0% (Grid Only)</span>
              <span>25% (Rooftop Solar 50kWp)</span>
              <span>50% (PPA Contract)</span>
            </div>
          </div>

          {/* Lever 5: Operational Peak Load Shifting */}
          <div className="slider-group" style={{ marginBottom: 0 }}>
            <div className="slider-header">
              <span className="slider-label">
                <Sliders size={15} style={{ color: 'var(--purple-ai)' }} />
                Peak Hour Operational Load Shifting
              </span>
              <span className="slider-value">{loadShiftPeak}% Shift</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="25" 
              step="1"
              value={loadShiftPeak}
              onChange={(e) => setLoadShiftPeak(Number(e.target.value))}
              className="custom-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0%</span>
              <span>12% (Reschedule Batch Wash)</span>
              <span>25% (Full Off-Peak Shift)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Recalculation Results Card */}
        <div className="sim-comparison-card">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                DYNAMIC SCENARIO PROJECTION
              </span>
              <span className="sim-diff-badge">
                <TrendingDown size={14} />
                -{scenarioResult.reductionPercent}% Net Cut
              </span>
            </div>

            {/* Current vs Scenario Projected Footprint */}
            <div className="sim-metric-box">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Current Projected Baseline</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                {BASELINE.total} <span style={{ fontSize: '0.8rem' }}>kg CO₂e</span>
              </div>
            </div>

            <div className="sim-metric-box" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Scenario Projected Footprint
              </div>
              <div className="sim-metric-val">
                {scenarioResult.projectedTotal} <span style={{ fontSize: '0.9rem', color: 'var(--emerald-primary)' }}>kg CO₂e</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--emerald-primary)', fontWeight: 600, marginTop: '2px' }}>
                Estimated saving: {scenarioResult.totalSaved} kg CO₂e / week
              </div>
            </div>

            {/* Savings Breakdown by Vector */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
                Vector Contribution to Savings:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
                  <span>• Electricity & Renewables:</span>
                  <strong style={{ color: 'var(--emerald-primary)' }}>-{scenarioResult.elecSaved} kg CO₂e</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
                  <span>• Fuel Conservation:</span>
                  <strong style={{ color: 'var(--amber-warning)' }}>-{scenarioResult.fuelSaved} kg CO₂e</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
                  <span>• Logistics & Transport:</span>
                  <strong style={{ color: 'var(--cyan-accent)' }}>-{scenarioResult.transportSaved} kg CO₂e</strong>
                </div>
              </div>
            </div>

            {/* Financial ROI Estimate */}
            <div style={{ marginTop: '18px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
                <DollarSign size={14} />
                Estimated Tariff & Fuel Cost Reduction:
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                ~${scenarioResult.estimatedCostSavings} / week <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>(~${scenarioResult.estimatedCostSavings * 52}/yr)</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.4 }}>
              * Scenario estimate – not a guaranteed real-world reduction. Demonstrates how AI predictive modeling empowers facility managers to test hypotheses before committing operational changes.
            </div>
          </div>
        </div>
      </div>

      {/* Honest Academic Disclaimer */}
      <div className="disclaimer-banner" style={{ marginTop: '24px' }}>
        <span>ℹ️ <strong>Academic Sensitivity Model:</strong> In this prototype, what-if sensitivity calculations are derived from linear activity elasticities and CEA grid factor constants. In an enterprise deployment, this module would run multi-variable non-linear optimization algorithms considering tariff peak charge structures, machine ramp constraints, and shift agreements.</span>
      </div>
    </div>
  );
}
