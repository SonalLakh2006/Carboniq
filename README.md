# CARBONIQ – AI-Driven Carbon Footprint Monitoring System

> **Academic Proof-of-Concept Prototype** · Vite + React + Recharts  
> All emission data, factors, and AI insights are illustrative estimates for learning purposes only.

---

## Features

### 🌿 Personal Carbon Tracker (NEW — Main Feature)
| Feature | Description |
|---|---|
| **My Dashboard** | Monthly total in kg CO₂e, category breakdown (pie + bar charts), month-over-month comparison, AI demo insights |
| **Activity Log** | Add, edit, delete activities across 9 categories · Real-time emission preview before saving · Persistent via localStorage |
| **Reports & Settings** | Monthly report with downloadable CSV · Category totals table · Location setting (affects electricity factor) · Monthly target · Data privacy controls |

### 🏭 Industrial Facility Monitor (Demo Views)
| Feature | Description |
|---|---|
| **Facility Overview** | Real-time dashboard for GreenTech Manufacturing demo facility |
| **Carbon Monitor** | Hourly emission telemetry vs. baseline |
| **Emission Sources** | Scope 1/2/3 breakdown |
| **AI Insights** | Root-cause attribution ("Why did emissions change?") |
| **Anomaly Detection** | Rule-based spike detection with investigation workflow |
| **Emission Forecast** | 7-day trend projection with confidence bands |
| **Recommendations** | Prioritized reduction actions |
| **What-If Simulator** | Scenario slider to model emission changes |
| **Executive Reports** | Printable + CSV audit report |
| **Simulated IoT Panel** | 5 virtual sensor feeds |

---

## Emission Categories

| Category | Factor (illustrative) | Source |
|---|---|---|
| Electricity (India) | 0.710 kg CO₂e/kWh | CEA Baseline v19 |
| Electricity (UK) | 0.207 kg CO₂e/kWh | DEFRA 2024 |
| Electricity (US) | 0.385 kg CO₂e/kWh | EPA eGRID 2024 |
| Car Travel | 0.192 kg CO₂e/km | DEFRA 2024 Average Car |
| Flight Travel | 0.255 kg CO₂e/km | DEFRA 2024 Economy |
| Bus Travel | 0.089 kg CO₂e/km | DEFRA 2024 Local Bus |
| LPG | 2.983 kg CO₂e/kg | IPCC AR6 |
| Diesel | 2.680 kg CO₂e/L | DEFRA 2024 |
| Petrol | 2.316 kg CO₂e/L | DEFRA 2024 |
| Waste (landfill) | 0.587 kg CO₂e/kg | DEFRA 2024 |
| Red Meat | 27.0 kg CO₂e/kg | Poore & Nemecek 2018 |

> ⚠️ **All factors are illustrative.** Actual values depend on your specific location, energy supplier, vehicle type, and year. Always consult official national inventories for compliance reporting.

---

## Calculation Method

```
Estimated CO₂e = Activity Amount × Emission Factor
```

Example: 180 kWh × 0.710 kg CO₂e/kWh (India grid) = **127.8 kg CO₂e**

Every entry in the Activity Log shows the factor value, its source, and the resulting estimate. The factor store (`emissionFactors.js`) is a plain JavaScript object — editable by any developer.

---

## AI Insights (Demo — Rule-Based)

The "Demo AI Insights" panel uses transparent rule-based logic:
- Flags the **dominant category** by share percentage
- Alerts when month-over-month change exceeds ±10–15%
- Warns when approaching or exceeding the monthly target
- Suggests practical reduction actions based on activity patterns

No external AI service or API key is required.

---

## Data Storage

All personal activity data is stored in **localStorage** under the key `carboniq_activities`. Settings are stored under `carboniq_settings`.

- ✅ Data persists between page refreshes
- ✅ No server or cloud connection required
- ✅ Reset to demo data at any time via "Reset Demo" button
- ✅ Clear all data via Settings → Data Privacy → Clear All Data

---

## Getting Started

```bash
# Install dependencies (already done)
npm install

# Start the development server
npm run dev

# The app will be available at:
# http://localhost:5173
```

### Requirements
- Node.js 18+ 
- A modern browser (Chrome, Firefox, Edge, Safari)
- No API keys or paid services needed

---

## Project Structure

```
src/
├── data/
│   ├── emissionFactors.js    # Emission factor store + computeEmission()
│   ├── useActivityStore.js   # localStorage CRUD hook + seed data
│   └── mockData.js           # Industrial demo data (existing)
├── views/
│   ├── PersonalDashboardView.jsx   # My Dashboard (monthly KPIs + charts)
│   ├── ActivityLogView.jsx         # CRUD activity log with form
│   ├── PersonalReportsView.jsx     # Monthly report + CSV export + Settings
│   └── [... existing industrial views ...]
├── components/
│   ├── Sidebar.jsx     # Navigation (updated with Personal Tracking section)
│   ├── Header.jsx      # Top bar
│   └── [... modals ...]
├── index.css           # Design system & all styles
└── App.jsx             # Root component with routing
```

---

## Assumptions & Limitations

1. **Illustrative factors only** — the factors in `emissionFactors.js` are approximate averages from published sources. They are not certified for compliance reporting.
2. **Single-user** — data is stored per-browser in localStorage. Multiple users on the same browser share data.
3. **No authentication** — this is a frontend prototype with no user accounts.
4. **AI insights are rule-based** — the insights panel applies simple thresholds, not machine learning.
5. **Electricity factor is location-dependent** — other factors (transport, fuel) use a single illustrative average. Real-world factors vary by vehicle age, fuel blend, etc.
6. **Demo seed data** — 22 fictional entries across Aug–Oct 2026 are pre-loaded so the dashboard is useful on first launch.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Styles | Vanilla CSS (design system in `index.css`) |
| Storage | Browser localStorage (no backend) |
| Linting | Oxlint |

---

*Prototype built for academic demonstration. Not intended for production carbon accounting.*
