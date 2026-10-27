// ==========================================================================
// CARBONIQ – Activity Store Hook (localStorage persistence)
// ==========================================================================
// Manages user activity entries with CRUD operations.
// Data is persisted to localStorage under key "carboniq_activities".
// ==========================================================================

import { useState, useEffect, useCallback } from 'react';
import { computeEmission } from '../data/emissionFactors';

const STORAGE_KEY = 'carboniq_activities';
const SETTINGS_KEY = 'carboniq_settings';

// Default settings
export const DEFAULT_SETTINGS = {
  location: 'India',
  distanceUnit: 'km',
  currency: 'INR',
  monthlyTarget: 500,
  dataPrivacy: 'local_only',
};

// Seed demo data (fictional, clearly labeled)
const SEED_ACTIVITIES = [
  // October 2026
  { id: 'seed-1', categoryId: 'electricity', amount: 180, unit: 'kWh', date: '2026-10-01', note: 'Demo: Monthly electricity bill – home', isDemo: true },
  { id: 'seed-2', categoryId: 'transport_car', amount: 320, unit: 'km', date: '2026-10-05', note: 'Demo: Weekly commute (Mon–Fri)', isDemo: true },
  { id: 'seed-3', categoryId: 'fuel_lpg', amount: 14.2, unit: 'kg', date: '2026-10-07', note: 'Demo: LPG cylinder refill (14.2 kg)', isDemo: true },
  { id: 'seed-4', categoryId: 'waste', amount: 12, unit: 'kg', date: '2026-10-10', note: 'Demo: Household waste (2 weeks)', isDemo: true },
  { id: 'seed-5', categoryId: 'transport_car', amount: 240, unit: 'km', date: '2026-10-12', note: 'Demo: Weekend road trip', isDemo: true },
  { id: 'seed-6', categoryId: 'electricity', amount: 95, unit: 'kWh', date: '2026-10-15', note: 'Demo: Mid-month office electricity share', isDemo: true },
  { id: 'seed-7', categoryId: 'food_meat', amount: 2.5, unit: 'kg', date: '2026-10-18', note: 'Demo: Weekly meat consumption (household)', isDemo: true },
  { id: 'seed-8', categoryId: 'fuel_petrol', amount: 40, unit: 'L', date: '2026-10-20', note: 'Demo: Petrol refuel', isDemo: true },
  { id: 'seed-9', categoryId: 'transport_bus', amount: 60, unit: 'km', date: '2026-10-22', note: 'Demo: Bus commute (week)', isDemo: true },
  { id: 'seed-10', categoryId: 'waste', amount: 8, unit: 'kg', date: '2026-10-25', note: 'Demo: Household waste', isDemo: true },

  // September 2026 (previous month for comparison)
  { id: 'seed-11', categoryId: 'electricity', amount: 210, unit: 'kWh', date: '2026-09-02', note: 'Demo: September electricity – higher due to AC', isDemo: true },
  { id: 'seed-12', categoryId: 'transport_car', amount: 400, unit: 'km', date: '2026-09-08', note: 'Demo: September car travel', isDemo: true },
  { id: 'seed-13', categoryId: 'fuel_lpg', amount: 14.2, unit: 'kg', date: '2026-09-10', note: 'Demo: September LPG cylinder', isDemo: true },
  { id: 'seed-14', categoryId: 'waste', amount: 22, unit: 'kg', date: '2026-09-15', note: 'Demo: September waste (higher month)', isDemo: true },
  { id: 'seed-15', categoryId: 'transport_flight', amount: 1400, unit: 'km', date: '2026-09-20', note: 'Demo: One-way flight (approx 1400 km)', isDemo: true },
  { id: 'seed-16', categoryId: 'food_meat', amount: 3.5, unit: 'kg', date: '2026-09-25', note: 'Demo: September meat consumption', isDemo: true },
  { id: 'seed-17', categoryId: 'fuel_petrol', amount: 50, unit: 'L', date: '2026-09-28', note: 'Demo: September petrol', isDemo: true },

  // August 2026 (trend data)
  { id: 'seed-18', categoryId: 'electricity', amount: 230, unit: 'kWh', date: '2026-08-05', note: 'Demo: August electricity – peak summer', isDemo: true },
  { id: 'seed-19', categoryId: 'transport_car', amount: 380, unit: 'km', date: '2026-08-12', note: 'Demo: August car travel', isDemo: true },
  { id: 'seed-20', categoryId: 'fuel_lpg', amount: 14.2, unit: 'kg', date: '2026-08-15', note: 'Demo: August LPG', isDemo: true },
  { id: 'seed-21', categoryId: 'waste', amount: 20, unit: 'kg', date: '2026-08-18', note: 'Demo: August waste', isDemo: true },
  { id: 'seed-22', categoryId: 'food_meat', amount: 3.0, unit: 'kg', date: '2026-08-22', note: 'Demo: August meat', isDemo: true },
];

function enrichActivity(activity, settings) {
  const result = computeEmission(activity.categoryId, activity.amount, activity.unit, settings?.location || 'India');
  return { ...activity, ...result };
}

export function useActivityStore() {
  const [activities, setActivities] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      const parsedSettings = storedSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) } : DEFAULT_SETTINGS;
      setSettings(parsedSettings);

      if (stored) {
        const parsed = JSON.parse(stored);
        setActivities(parsed.map(a => enrichActivity(a, parsedSettings)));
      } else {
        // First launch: seed demo data
        const seeded = SEED_ACTIVITIES.map(a => enrichActivity(a, parsedSettings));
        setActivities(seeded);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
      }
    } catch (e) {
      console.error('Failed to load activities from localStorage', e);
      setActivities(SEED_ACTIVITIES.map(a => enrichActivity(a, DEFAULT_SETTINGS)));
    }
    setIsLoaded(true);
  }, []);

  // Persist activities to localStorage whenever they change
  const persistActivities = useCallback((newActivities) => {
    // Store raw (without computed fields) to keep storage lean
    const raw = newActivities.map(({ co2e, factorValue, factorUnit, factorSource, factorYear, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
  }, []);

  const addActivity = useCallback((activityData) => {
    const newEntry = {
      ...activityData,
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      isDemo: false,
      createdAt: new Date().toISOString(),
    };
    const enriched = enrichActivity(newEntry, settings);
    setActivities(prev => {
      const updated = [enriched, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date));
      persistActivities(updated);
      return updated;
    });
    return enriched;
  }, [settings, persistActivities]);

  const updateActivity = useCallback((id, updatedData) => {
    setActivities(prev => {
      const updated = prev.map(a => {
        if (a.id !== id) return a;
        const merged = { ...a, ...updatedData };
        return enrichActivity(merged, settings);
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
      persistActivities(updated);
      return updated;
    });
  }, [settings, persistActivities]);

  const deleteActivity = useCallback((id) => {
    setActivities(prev => {
      const updated = prev.filter(a => a.id !== id);
      persistActivities(updated);
      return updated;
    });
  }, [persistActivities]);

  const resetToDemo = useCallback(() => {
    const seeded = SEED_ACTIVITIES.map(a => enrichActivity(a, settings));
    setActivities(seeded);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
  }, [settings]);

  const clearAllData = useCallback(() => {
    setActivities([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    // Re-compute all emissions with new settings (location change affects electricity factor)
    setActivities(prev => {
      const updated = prev.map(a => enrichActivity(a, merged));
      persistActivities(updated);
      return updated;
    });
  }, [settings, persistActivities]);

  return {
    activities,
    settings,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity,
    resetToDemo,
    clearAllData,
    updateSettings,
  };
}
