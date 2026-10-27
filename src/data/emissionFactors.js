// ==========================================================================
// CARBONIQ – Emission Factors Reference Data
// ==========================================================================
// NOTE: These are illustrative emission factors for demo/prototype purposes.
// Actual factors vary significantly by location, year, energy mix, and methodology.
// Sources: IPCC AR6 2021, DEFRA 2024, CEA India 2022, EPA eGRID 2024 (all illustrative)
// Always consult official national inventories for compliance reporting.
// ==========================================================================

export const EMISSION_FACTORS = {
  electricity: {
    label: 'Electricity',
    color: '#10b981',
    scope: 'Scope 2',
    units: [{ id: 'kWh', label: 'kWh (kilowatt-hours)' }],
    factors: {
      'India': { value: 0.710, unit: 'kg CO2e/kWh', source: 'CEA Baseline v19 (Illustrative)', year: 2022 },
      'US': { value: 0.385, unit: 'kg CO2e/kWh', source: 'EPA eGRID 2024 (Illustrative)', year: 2024 },
      'UK': { value: 0.207, unit: 'kg CO2e/kWh', source: 'DEFRA 2024 (Illustrative)', year: 2024 },
      'EU': { value: 0.251, unit: 'kg CO2e/kWh', source: 'EEA Average (Illustrative)', year: 2023 },
      'Global Avg': { value: 0.490, unit: 'kg CO2e/kWh', source: 'IEA Global Average (Illustrative)', year: 2023 },
    },
    icon: 'Zap',
    description: 'Grid electricity consumption at home, office, or facility',
    exampleNote: 'E.g. monthly electricity bill in kWh',
  },
  transport_car: {
    label: 'Car Travel',
    color: '#06b6d4',
    scope: 'Scope 1/3',
    units: [{ id: 'km', label: 'km (kilometres)' }, { id: 'miles', label: 'miles' }],
    factors: {
      km: { value: 0.192, unit: 'kg CO2e/km', source: 'DEFRA 2024 Average Car (Illustrative)', year: 2024 },
      miles: { value: 0.309, unit: 'kg CO2e/mile', source: 'DEFRA 2024 Average Car (Illustrative)', year: 2024 },
    },
    icon: 'Car',
    description: 'Personal vehicle travel (petrol/diesel average car)',
    exampleNote: 'E.g. daily commute distance',
  },
  transport_flight: {
    label: 'Flight Travel',
    color: '#3b82f6',
    scope: 'Scope 3',
    units: [{ id: 'km', label: 'km (flight distance)' }, { id: 'miles', label: 'miles (flight distance)' }],
    factors: {
      km: { value: 0.255, unit: 'kg CO2e/km', source: 'DEFRA 2024 Economy Short-haul (Illustrative)', year: 2024 },
      miles: { value: 0.410, unit: 'kg CO2e/mile', source: 'DEFRA 2024 Economy Short-haul (Illustrative)', year: 2024 },
    },
    icon: 'Plane',
    description: 'Air travel (economy class, average short-haul)',
    exampleNote: 'E.g. one-way flight distance',
  },
  transport_bus: {
    label: 'Bus Travel',
    color: '#f59e0b',
    scope: 'Scope 3',
    units: [{ id: 'km', label: 'km' }, { id: 'miles', label: 'miles' }],
    factors: {
      km: { value: 0.089, unit: 'kg CO2e/km', source: 'DEFRA 2024 Local Bus (Illustrative)', year: 2024 },
      miles: { value: 0.143, unit: 'kg CO2e/mile', source: 'DEFRA 2024 Local Bus (Illustrative)', year: 2024 },
    },
    icon: 'Bus',
    description: 'Local bus or coach travel',
    exampleNote: 'E.g. commute by bus',
  },
  fuel_lpg: {
    label: 'LPG / Cooking Gas',
    color: '#ec4899',
    scope: 'Scope 1',
    units: [{ id: 'kg', label: 'kg (LPG)' }, { id: 'L', label: 'litres (LPG liquid)' }],
    factors: {
      kg: { value: 2.983, unit: 'kg CO2e/kg', source: 'IPCC AR6 LPG (Illustrative)', year: 2021 },
      L: { value: 1.611, unit: 'kg CO2e/L', source: 'IPCC AR6 LPG liquid (Illustrative)', year: 2021 },
    },
    icon: 'Flame',
    description: 'LPG/propane used for cooking or heating',
    exampleNote: 'E.g. weight of LPG cylinder used',
  },
  fuel_diesel: {
    label: 'Diesel',
    color: '#8b5cf6',
    scope: 'Scope 1',
    units: [{ id: 'L', label: 'litres' }],
    factors: {
      L: { value: 2.680, unit: 'kg CO2e/L', source: 'DEFRA 2024 Diesel (Illustrative)', year: 2024 },
    },
    icon: 'Fuel',
    description: 'Diesel fuel for generators, vehicles, or heating',
    exampleNote: 'E.g. litres of diesel purchased',
  },
  fuel_petrol: {
    label: 'Petrol / Gasoline',
    color: '#f97316',
    scope: 'Scope 1',
    units: [{ id: 'L', label: 'litres' }],
    factors: {
      L: { value: 2.316, unit: 'kg CO2e/L', source: 'DEFRA 2024 Petrol (Illustrative)', year: 2024 },
    },
    icon: 'Fuel',
    description: 'Petrol/gasoline fuel for vehicles',
    exampleNote: 'E.g. litres of petrol filled up',
  },
  waste: {
    label: 'Waste (Landfill)',
    color: '#64748b',
    scope: 'Scope 3',
    units: [{ id: 'kg', label: 'kg (waste weight)' }],
    factors: {
      kg: { value: 0.587, unit: 'kg CO2e/kg', source: 'DEFRA 2024 Mixed Landfill (Illustrative)', year: 2024 },
    },
    icon: 'Trash2',
    description: 'General waste sent to landfill',
    exampleNote: 'E.g. estimated weekly waste in kg',
  },
  food_meat: {
    label: 'Red Meat Consumption',
    color: '#dc2626',
    scope: 'Scope 3',
    units: [{ id: 'kg', label: 'kg (meat)' }],
    factors: {
      kg: { value: 27.0, unit: 'kg CO2e/kg', source: 'Poore & Nemecek 2018 Beef (Illustrative)', year: 2018 },
    },
    icon: 'UtensilsCrossed',
    description: 'Red meat consumption (beef approximate average)',
    exampleNote: 'E.g. kg of beef/lamb consumed',
  },
};

export const CATEGORY_GROUPS = [
  { group: 'Energy', categories: ['electricity'] },
  { group: 'Transport', categories: ['transport_car', 'transport_flight', 'transport_bus'] },
  { group: 'Fuel', categories: ['fuel_lpg', 'fuel_diesel', 'fuel_petrol'] },
  { group: 'Waste & Food', categories: ['waste', 'food_meat'] },
];

export const DASHBOARD_CATEGORIES = {
  electricity: { label: 'Electricity', color: '#10b981', keys: ['electricity'] },
  transport: { label: 'Transport', color: '#06b6d4', keys: ['transport_car', 'transport_flight', 'transport_bus'] },
  fuel: { label: 'Fuel', color: '#f59e0b', keys: ['fuel_lpg', 'fuel_diesel', 'fuel_petrol'] },
  waste: { label: 'Waste & Food', color: '#64748b', keys: ['waste', 'food_meat'] },
};

export function computeEmission(categoryId, amount, unit, location = 'India') {
  const factor = EMISSION_FACTORS[categoryId];
  if (!factor || !amount || isNaN(amount)) return { co2e: 0, factorValue: 0, factorUnit: '', factorSource: '' };

  let factorEntry;
  if (categoryId === 'electricity') {
    factorEntry = factor.factors[location] || factor.factors['Global Avg'];
  } else {
    factorEntry = factor.factors[unit] || Object.values(factor.factors)[0];
  }

  if (!factorEntry) return { co2e: 0, factorValue: 0, factorUnit: '', factorSource: '' };

  const co2e = parseFloat((parseFloat(amount) * factorEntry.value).toFixed(3));
  return {
    co2e,
    factorValue: factorEntry.value,
    factorUnit: factorEntry.unit,
    factorSource: factorEntry.source,
    factorYear: factorEntry.year,
  };
}
