// CARBONIQ – Comprehensive Simulated Demo Datasets & AI Logic Engine
// Note: All data represents simulated academic proof-of-concept scenarios for GreenTech Manufacturing.

export const FACILITIES = [
  { id: 'greentech', name: 'GreenTech Manufacturing – Demo Facility', type: 'Industrial Light Manufacturing', location: 'Demo Industrial Zone' },
  { id: 'apex', name: 'Apex Engineering Works – Unit 3 (Demo)', type: 'Heavy Precision Machining', location: 'Sector 4 Industrial Park' },
  { id: 'metro', name: 'Metro University – Engineering Block B (Demo)', type: 'Academic & Laboratory Campus', location: 'North Campus' },
];

export const KPI_DATA = {
  totalFootprint: 1248, // kg CO2e
  totalFootprintUnit: 'kg CO₂e',
  todayEmissions: 184, // kg CO2e
  todayEmissionsUnit: 'kg CO₂e',
  energyConsumption: 2840, // kWh
  energyConsumptionUnit: 'kWh',
  carbonIntensity: 0.44, // kg CO2e/kWh
  carbonIntensityUnit: 'kg CO₂e/kWh',
  trendPeriod: 'vs. previous 7-day average',
  trendPercent: 8.4, // +8.4%
  isIncrease: true,
  status: 'Anomaly Detected',
};

// Hourly emission profile for "Today" with an explicit anomaly spike at 14:00
export const HOURLY_EMISSIONS = [
  { hour: '00:00', actual: 4.8, baseline: 5.0, electricity: 3.2, fuel: 0.8, transport: 0.2, hvac: 0.6 },
  { hour: '02:00', actual: 4.2, baseline: 4.5, electricity: 2.9, fuel: 0.6, transport: 0.1, hvac: 0.6 },
  { hour: '04:00', actual: 4.5, baseline: 4.6, electricity: 3.0, fuel: 0.7, transport: 0.2, hvac: 0.6 },
  { hour: '06:00', actual: 7.2, baseline: 7.0, electricity: 4.5, fuel: 1.2, transport: 0.6, hvac: 0.9 },
  { hour: '08:00', actual: 12.4, baseline: 11.8, electricity: 7.8, fuel: 2.1, transport: 1.2, hvac: 1.3 },
  { hour: '10:00', actual: 15.6, baseline: 14.2, electricity: 9.8, fuel: 2.8, transport: 1.5, hvac: 1.5 },
  { hour: '12:00', actual: 14.8, baseline: 14.5, electricity: 9.2, fuel: 2.5, transport: 1.4, hvac: 1.7 },
  { hour: '14:00', actual: 24.8, baseline: 14.1, electricity: 17.6, fuel: 3.2, transport: 1.8, hvac: 2.2, isAnomaly: true, anomalyTitle: 'Emission spike detected – 14:00 (+76% spike)' },
  { hour: '16:00', actual: 16.2, baseline: 13.9, electricity: 10.4, fuel: 2.7, transport: 1.4, hvac: 1.7 },
  { hour: '18:00', actual: 11.5, baseline: 10.8, electricity: 7.1, fuel: 1.9, transport: 1.1, hvac: 1.4 },
  { hour: '20:00', actual: 7.8, baseline: 7.5, electricity: 4.9, fuel: 1.2, transport: 0.6, hvac: 1.1 },
  { hour: '22:00', actual: 5.4, baseline: 5.2, electricity: 3.5, fuel: 0.9, transport: 0.3, hvac: 0.7 },
];

// 7-day historical dataset (Total week = 1,248 kg CO2e)
export const WEEKLY_EMISSIONS = [
  { day: 'Mon', actual: 165, baseline: 162, electricity: 86, fuel: 30, transport: 20, hvac: 17, operations: 10, other: 2 },
  { day: 'Tue', actual: 172, baseline: 164, electricity: 89, fuel: 31, transport: 21, hvac: 18, operations: 10, other: 3 },
  { day: 'Wed', actual: 180, baseline: 168, electricity: 94, fuel: 32, transport: 22, hvac: 18, operations: 11, other: 3 },
  { day: 'Thu', actual: 194, baseline: 170, electricity: 105, fuel: 34, transport: 24, hvac: 17, operations: 11, other: 3 },
  { day: 'Fri (Today)', actual: 215, baseline: 172, electricity: 122, fuel: 36, transport: 25, hvac: 18, operations: 11, other: 3, isAnomaly: true },
  { day: 'Sat', actual: 164, baseline: 155, electricity: 80, fuel: 32, transport: 20, hvac: 19, operations: 10, other: 3 },
  { day: 'Sun', actual: 158, baseline: 150, electricity: 73, fuel: 30, transport: 18, hvac: 24, operations: 10, other: 3 },
];

// 30-day view aggregated by 5-day periods
export const MONTHLY_EMISSIONS = [
  { period: 'Day 1–5', actual: 820, baseline: 810, projected: 820 },
  { period: 'Day 6–10', actual: 845, baseline: 825, projected: 845 },
  { period: 'Day 11–15', actual: 870, baseline: 830, projected: 870 },
  { period: 'Day 16–20', actual: 910, baseline: 835, projected: 910 },
  { period: 'Day 21–25', actual: 935, baseline: 840, projected: 935 },
  { period: 'Day 26–30 (Current)', actual: 980, baseline: 845, projected: 980 },
];

// Breakdown of emission sources
export const EMISSION_SOURCES = [
  { name: 'Electricity', percentage: 52, co2e: 649, consumption: '927 kWh', factor: '0.70 kg/kWh', scope: 'Scope 2', color: '#10b981', isDominant: true },
  { name: 'Fuel', percentage: 18, co2e: 225, consumption: '84 L / 210 m³', factor: '2.68 kg/L', scope: 'Scope 1', color: '#f59e0b', isDominant: false },
  { name: 'Transportation', percentage: 12, co2e: 150, consumption: '714 km', factor: '0.21 kg/km', scope: 'Scope 3', color: '#06b6d4', isDominant: false },
  { name: 'Heating/Cooling (HVAC)', percentage: 10, co2e: 125, consumption: '178 kWh', factor: '0.70 kg/kWh', scope: 'Scope 2', color: '#8b5cf6', isDominant: false },
  { name: 'Operations & Tooling', percentage: 6, co2e: 75, consumption: '107 kWh', factor: '0.70 kg/kWh', scope: 'Scope 1', color: '#ec4899', isDominant: false },
  { name: 'Other / Ancillary', percentage: 2, co2e: 24, consumption: '34 kWh', factor: '0.70 kg/kWh', scope: 'Scope 2', color: '#64748b', isDominant: false },
];

// Anomaly incident details for the signature investigation
export const ANOMALY_INCIDENT = {
  id: 'ANOM-2026-0914',
  timestamp: 'Today, 14:00 - 15:00',
  title: 'Electricity-related emissions are 21% above the expected range',
  observed: 176, // kg CO2e
  expected: 145, // kg CO2e
  deviation: '+21.4%',
  severity: 'HIGH ALERT',
  status: 'Investigating',
  confidence: 87,
  possibleCause: 'Unusually high energy consumption during shift changeover; Chiller #2 duty cycle continuous lockup without variable speed throttling.',
  recommendedAction: 'Inspect high-load Chiller #2 subpanel and shift auxiliary batch wash cycle to post-18:00 off-peak hours.',
  equipmentBreakdown: [
    { name: 'Chiller Unit #2 (HVAC Central)', deltaKg: '+18.4 kg CO₂e', deltaPct: '+42%', status: 'Critical Surge' },
    { name: 'Milling Line B Drive Inverters', deltaKg: '+8.2 kg CO₂e', deltaPct: '+18%', status: 'High Duty' },
    { name: 'Main Shop Air Compressor #1', deltaKg: '+4.4 kg CO₂e', deltaPct: '+12%', status: 'Pressure Leak' },
  ],
  checklist: [
    { task: 'Verify temperature setpoint on Chiller #2 BMS panel', done: false },
    { task: 'Audit compressed air receiver tank for micro-leakage', done: false },
    { task: 'Reschedule unbatched delivery dispatch to morning window', done: true },
  ],
};

// Signature "Why Did Emissions Change?" decomposition
export const WHY_EMISSIONS_CHANGED = {
  headline: 'Why did emissions change?',
  summary: 'Total emissions increased by +8.4% (+97 kg CO₂e) compared with the previous baseline period.',
  confidence: 87,
  drivers: [
    { source: 'Electricity Consumption', deltaPercent: '+14%', deltaCo2e: '+82 kg CO₂e', role: 'Primary Contributor', fillClass: 'driver-fill-rose', sharePct: 82 },
    { source: 'Transportation & Logistics', deltaPercent: '+6%', deltaCo2e: '+18 kg CO₂e', role: 'Secondary Contributor', fillClass: 'driver-fill-amber', sharePct: 18 },
    { source: 'Fuel Consumption', deltaPercent: '+2%', deltaCo2e: '+4 kg CO₂e', role: 'Minor Contributor', fillClass: 'driver-fill-amber', sharePct: 4 },
    { source: 'HVAC Energy Efficiency', deltaPercent: '-4%', deltaCo2e: '-7 kg CO₂e', role: 'Offsetting Reduction', fillClass: 'driver-fill-emerald', sharePct: -7 },
  ],
  aiInterpretation: 'Most of the increase appears to be associated with higher electricity demand during afternoon peak operating hours (13:30–15:00) coinciding with industrial Chiller #2 duty cycle locks. Transportation also rose slightly due to 3 unscheduled afternoon dispatch runs.',
  engineVersion: 'Prototype Transparent Rule-Based Inference v1.2',
};

// AI Predictive Forecast Dataset (Next 7 Days)
export const FORECAST_DATA = {
  timeframe: 'Next 7 Days',
  trend: 'Increasing (+5.8%)',
  expectedFootprint: 1320,
  projectedChangePercent: '+5.8%',
  disclaimer: 'Prototype prediction based on simulated historical data.',
  forecastPoints: [
    { day: 'Day +1', actualHistorical: 184, projected: 186, upperBound: 194, lowerBound: 178, mitigatedScenario: 172 },
    { day: 'Day +2', actualHistorical: null, projected: 188, upperBound: 198, lowerBound: 179, mitigatedScenario: 170 },
    { day: 'Day +3', actualHistorical: null, projected: 191, upperBound: 202, lowerBound: 181, mitigatedScenario: 169 },
    { day: 'Day +4', actualHistorical: null, projected: 193, upperBound: 206, lowerBound: 182, mitigatedScenario: 167 },
    { day: 'Day +5', actualHistorical: null, projected: 195, upperBound: 209, lowerBound: 183, mitigatedScenario: 166 },
    { day: 'Day +6', actualHistorical: null, projected: 185, upperBound: 199, lowerBound: 174, mitigatedScenario: 160 },
    { day: 'Day +7', actualHistorical: null, projected: 182, upperBound: 195, lowerBound: 171, mitigatedScenario: 158 },
  ],
};

// Actionable AI Recommendations
export const AI_RECOMMENDATIONS = [
  {
    id: 'REC-01',
    priority: 'HIGH',
    problem: 'High electricity consumption during peak operational tariff hours (13:00 - 16:00).',
    reason: 'Non-critical batch autoclave runs and auxiliary charging overlap with industrial facility cooling peaks.',
    action: 'Shift selected non-critical operations to lower-demand periods (post 18:00 or morning 07:00–09:00) where operationally feasible.',
    potentialImpact: 'Estimated ~85 kg CO₂e/day footprint reduction (~6.8% total reduction) and up to $420/mo tariff reduction.',
    feasibility: 'Immediate (Operational Rescheduling, $0 CapEx)',
    category: 'Load Shifting',
    badgeClass: 'badge-alert',
  },
  {
    id: 'REC-02',
    priority: 'MEDIUM',
    problem: 'Repeated transportation-related emission spikes from unbatched fleet dispatches.',
    reason: 'Frequent single-order courier dispatches traversing peak city traffic corridors.',
    action: 'Consolidate outbound deliveries into twice-daily consolidated freight windows and prioritize regional EV courier routes.',
    potentialImpact: 'Potential ~30 kg CO₂e/day reduction (~20% cut in fleet transport emissions).',
    feasibility: '1–2 Weeks (Logistics Optimization)',
    category: 'Fleet Logistics',
    badgeClass: 'badge-ai',
  },
  {
    id: 'REC-03',
    priority: 'MEDIUM',
    problem: 'Central Chiller #2 thermal runaway under high afternoon ambient temperatures.',
    reason: 'Chilled water setpoint fixed at 6.0°C without dynamic wet-bulb reset.',
    action: 'Implement BMS reset strategy raising chilled water setpoint by 1.5°C during non-critical ambient intervals.',
    potentialImpact: 'Estimated ~22 kg CO₂e/day reduction in cooling energy.',
    feasibility: 'Immediate (BMS Configuration Change)',
    category: 'HVAC Optimization',
    badgeClass: 'badge-ai',
  },
  {
    id: 'REC-04',
    priority: 'LOW',
    problem: 'Solar PV rooftop generation exported to grid during low feed-in tariff windows.',
    reason: 'Factory pumping and battery storage systems charge after dark rather than during solar peak (11:00–14:00).',
    action: 'Automate heavy water pumping and backup UPS charging cycles during solar generation surplus.',
    potentialImpact: 'Estimated ~18 kg CO₂e/day indirect reduction.',
    feasibility: '1 Month (Automation Timer Integration)',
    category: 'Renewables Alignment',
    badgeClass: 'badge-demo',
  },
];

// Simulated IoT Telemetry Sensors
export const SIMULATED_SENSORS = [
  {
    id: 'SENS-01',
    name: 'Sensor 01 – Main Incomer Smart Electricity Meter',
    type: 'Electrical Multi-Function Meter (Modbus/TCP)',
    location: 'Main Substation Panel 1',
    currentReading: 380.4,
    unit: 'kW',
    co2Rate: 266.3, // kg/h
    status: 'Online',
    lastUpdate: 'Just now (Simulated 3s refresh)',
    voltage: '415 V',
    powerFactor: 0.94,
    health: 'Good',
  },
  {
    id: 'SENS-02',
    name: 'Sensor 02 – Diesel Genset & Gas Flow Monitor',
    type: 'Coriolis Fuel Mass Flow Meter',
    location: 'Auxiliary Power House',
    currentReading: 14.2,
    unit: 'L/h',
    co2Rate: 38.1,
    status: 'Online',
    lastUpdate: '10s ago',
    pressure: '2.4 bar',
    health: 'Normal',
  },
  {
    id: 'SENS-03',
    name: 'Sensor 03 – Vehicle Fleet OBD-II / GPS Gateway',
    type: 'Cellular IoT Telematics',
    location: '6 Active Delivery Vans',
    currentReading: 142.5,
    unit: 'km/h aggregate',
    co2Rate: 29.9,
    status: 'Online',
    lastUpdate: '5s ago',
    activeVehicles: 6,
    health: 'Good',
  },
  {
    id: 'SENS-04',
    name: 'Sensor 04 – Central HVAC & Chiller Submeter',
    type: 'Chilled Water BTU Thermal Submeter',
    location: 'Cooling Plant Room',
    currentReading: 142.1,
    unit: 'kW',
    co2Rate: 99.5,
    status: 'Alert (High Load)',
    lastUpdate: 'Just now',
    waterFlow: '180 GPM',
    health: 'Needs Attention',
  },
  {
    id: 'SENS-05',
    name: 'Sensor 05 – Rooftop Solar PV Inverter (50 kWp)',
    type: 'Grid-Tied String Inverter API',
    location: 'Plant Roof East',
    currentReading: 48.6,
    unit: 'kW Generation',
    co2Rate: -34.0, // Avoided
    status: 'Online',
    lastUpdate: '2s ago',
    efficiency: '97.8%',
    health: 'Optimal',
  },
];

// Calculation Engine Standards & Emission Factors
export const CALCULATION_FACTORS = [
  { region: 'India (CEA Baseline v19)', gridFactor: 0.710, unit: 'kg CO₂e/kWh', description: 'Central Electricity Authority average grid mix (coal dominant)' },
  { region: 'United States (EPA eGRID 2024)', gridFactor: 0.385, unit: 'kg CO₂e/kWh', description: 'US National Average grid emission intensity' },
  { region: 'United Kingdom (DEFRA 2024)', gridFactor: 0.207, unit: 'kg CO₂e/kWh', description: 'UK National Grid with high offshore wind integration' },
  { region: 'European Union (EEA Average)', gridFactor: 0.251, unit: 'kg CO₂e/kWh', description: 'EU-27 combined average grid factor' },
];

// Guided Presentation Demo Steps (For the 3–5 minute seminar demo)
export const GUIDED_DEMO_STEPS = [
  {
    step: 1,
    title: '1. The Problem & Overview Dashboard',
    tagline: 'WHAT happened? Instant situational awareness within 5 seconds.',
    script: 'Good morning faculty and fellow classmates. Today organizations face high emissions with slow, manual spreadsheets. CARBONIQ answers 4 key questions: What happened, Why, What will happen next, and What to do. Here on the Overview dashboard, we see GreenTech Manufacturing emitted 1,248 kg CO₂e this week, up +8.4%.',
    targetSection: 'overview',
  },
  {
    step: 2,
    title: '2. Major Emission Sources Breakdown',
    tagline: 'Pinpointing the dominant contributor.',
    script: 'Rather than treating emissions as a black box, the platform decomposes them by activity source. Electricity contributes 52% of total emissions, followed by Fuel at 18% and Transportation at 12%. Electricity is clearly our primary target for intervention.',
    targetSection: 'sources',
  },
  {
    step: 3,
    title: '3. Real-Time Anomaly Detection',
    tagline: 'AI detects abnormal deviations automatically.',
    script: 'Notice this pulsing alert banner: at 14:00 today, AI detected an emission spike of 24.8 kg/hr against the expected 14.1 kg/hr baseline—a +21% deviation. The system flags this immediately without waiting for month-end electricity bills.',
    targetSection: 'anomaly',
  },
  {
    step: 4,
    title: '4. Signature Feature: “Why Did Emissions Change?”',
    tagline: 'Root-cause attribution transforms data into understanding.',
    script: 'This is CARBONIQ’s signature differentiator: it answers WHY it happened. Clicking into root-cause attribution reveals that 82% of the increase was driven by industrial Chiller #2 locking into 100% duty cycle during afternoon shift changeover.',
    targetSection: 'insights',
  },
  {
    step: 5,
    title: '5. AI Predictive Emission Forecast',
    tagline: 'WHAT is likely to happen next?',
    script: 'Looking at the Forecast page, historical simulated patterns are projected 7 days ahead. If unmitigated, emissions will rise to 1,320 kg CO₂e (+5.8%). The shaded region represents the prototype confidence interval.',
    targetSection: 'forecast',
  },
  {
    step: 6,
    title: '6. Actionable AI Recommendations',
    tagline: 'WHAT should the decision-maker do?',
    script: 'CARBONIQ provides prioritized, actionable solutions: shifting non-critical batch processing to off-peak hours cuts ~85 kg CO₂e/day, route optimization saves ~30 kg, and chiller setpoint tuning saves ~22 kg.',
    targetSection: 'recommendations',
  },
  {
    step: 7,
    title: '7. What-If Scenario Simulator & Architecture',
    tagline: 'Closing the loop: Measure → Understand → Predict → Act.',
    script: 'Finally, the decision maker tests scenarios in real time. Sliding electricity down by 10% and fuel by 15% immediately shows a potential 145 kg CO₂e reduction. The architecture links simulated IoT sensors to cloud ingestion, AI calculation, and action.',
    targetSection: 'simulator',
  },
];
