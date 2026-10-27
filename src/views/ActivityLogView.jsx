import React, { useState, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Check, X, Info, ChevronDown, Calendar,
  AlertCircle, RotateCcw, Search, Filter, SortAsc, SortDesc
} from 'lucide-react';
import { EMISSION_FACTORS, CATEGORY_GROUPS, computeEmission } from '../data/emissionFactors';

const ICON_MAP = {
  electricity: '⚡', transport_car: '🚗', transport_flight: '✈️',
  transport_bus: '🚌', fuel_lpg: '🔥', fuel_diesel: '⛽',
  fuel_petrol: '⛽', waste: '🗑️', food_meat: '🥩',
};

function CategoryIcon({ categoryId, size = 16 }) {
  return <span style={{ fontSize: size }}>{ICON_MAP[categoryId] || '📋'}</span>;
}

function ActivityForm({ initialValues, onSubmit, onCancel, location }) {
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || 'electricity');
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || '');
  const [unit, setUnit] = useState(initialValues?.unit || '');
  const [date, setDate] = useState(initialValues?.date || new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState(initialValues?.note || '');
  const [errors, setErrors] = useState({});

  const factor = EMISSION_FACTORS[categoryId];
  const availableUnits = factor?.units || [];

  // Auto-select unit when category changes
  useMemo(() => {
    if (!unit || !availableUnits.find(u => u.id === unit)) {
      setUnit(availableUnits[0]?.id || '');
    }
  }, [categoryId]);

  const preview = useMemo(() => {
    if (!amount || isNaN(parseFloat(amount))) return null;
    return computeEmission(categoryId, parseFloat(amount), unit, location);
  }, [categoryId, amount, unit, location]);

  const validate = () => {
    const errs = {};
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) errs.amount = 'Enter a positive number';
    if (!date) errs.date = 'Date is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({ categoryId, amount: parseFloat(amount), unit, date, note });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Category */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Activity Category *
        </label>
        {CATEGORY_GROUPS.map(group => (
          <div key={group.group} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 4 }}>{group.group}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {group.categories.map(catId => {
                const cat = EMISSION_FACTORS[catId];
                if (!cat) return null;
                return (
                  <button
                    key={catId}
                    type="button"
                    onClick={() => setCategoryId(catId)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '5px 10px', borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${categoryId === catId ? cat.color : 'var(--border-card)'}`,
                      background: categoryId === catId ? `${cat.color}18` : 'transparent',
                      color: categoryId === catId ? cat.color : 'var(--text-muted)',
                      fontSize: '0.78rem', fontWeight: categoryId === catId ? 700 : 400,
                      cursor: 'pointer', transition: 'all 0.15s'
                    }}
                  >
                    <CategoryIcon categoryId={catId} size={13} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {factor && (
        <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text-main)' }}>{factor.label}</strong> — {factor.description}
          <br /><span style={{ color: 'var(--text-dim)' }}>{factor.exampleNote}</span>
        </div>
      )}

      {/* Amount & Unit */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Amount *</label>
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={e => { setAmount(e.target.value); setErrors(prev => ({ ...prev, amount: undefined })); }}
            placeholder="e.g. 150"
            style={{
              width: '100%', background: 'var(--bg-input)', border: `1px solid ${errors.amount ? '#ef4444' : 'var(--border-card)'}`,
              color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px',
              fontSize: '0.9rem', outline: 'none',
            }}
          />
          {errors.amount && <div style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 3 }}>{errors.amount}</div>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Unit *</label>
          {availableUnits.length > 1 ? (
            <select
              value={unit}
              onChange={e => setUnit(e.target.value)}
              style={{
                width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-card)',
                color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px',
                fontSize: '0.9rem', outline: 'none', cursor: 'pointer'
              }}
            >
              {availableUnits.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          ) : (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '8px 12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {availableUnits[0]?.label || unit}
            </div>
          )}
        </div>
      </div>

      {/* Date */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Date *</label>
        <input
          type="date"
          value={date}
          onChange={e => { setDate(e.target.value); setErrors(prev => ({ ...prev, date: undefined })); }}
          style={{
            background: 'var(--bg-input)', border: `1px solid ${errors.date ? '#ef4444' : 'var(--border-card)'}`,
            color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px',
            fontSize: '0.9rem', outline: 'none', colorScheme: 'dark'
          }}
        />
        {errors.date && <div style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 3 }}>{errors.date}</div>}
      </div>

      {/* Note */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Note (optional)</label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g. Weekly commute, Monthly electricity bill..."
          maxLength={120}
          style={{
            width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-card)',
            color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px',
            fontSize: '0.9rem', outline: 'none'
          }}
        />
      </div>

      {/* Live Preview */}
      {preview && preview.co2e > 0 && (
        <div style={{ padding: '14px 16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Estimated Emission</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginBottom: 4 }}>
            {preview.co2e.toFixed(2)} kg CO₂e
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span>Calculation: {amount} {unit} × {preview.factorValue} {preview.factorUnit}</span>
            <span style={{ color: 'var(--text-dim)' }}>Factor source: {preview.factorSource} — illustrative only</span>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <X size={14} /> Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Check size={14} /> Save Activity
        </button>
      </div>
    </form>
  );
}

function ActivityRow({ activity, onEdit, onDelete }) {
  const cat = EMISSION_FACTORS[activity.categoryId];
  const color = cat?.color || '#64748b';
  const [confirming, setConfirming] = useState(false);

  return (
    <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CategoryIcon categoryId={activity.categoryId} size={16} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>{cat?.label || activity.categoryId}</div>
            {activity.note && <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{activity.note}</div>}
            {activity.isDemo && <span style={{ fontSize: '0.65rem', padding: '1px 5px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', borderRadius: 3, fontWeight: 700 }}>DEMO</span>}
          </div>
        </div>
      </td>
      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>{activity.date}</td>
      <td style={{ padding: '12px 16px', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 500 }}>
        {activity.amount} {activity.unit}
      </td>
      <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
        {activity.factorValue} {activity.factorUnit?.replace('kg CO2e/', '')} ×
        <br /><span style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>{activity.factorSource}</span>
      </td>
      <td style={{ padding: '12px 16px' }}>
        <span style={{ fontWeight: 800, fontSize: '0.95rem', color }}>
          {(activity.co2e || 0).toFixed(2)}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: 3 }}>kg CO₂e</span>
      </td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {confirming ? (
            <>
              <button onClick={() => { onDelete(activity.id); setConfirming(false); }} style={{ padding: '4px 8px', background: '#ef4444', border: 'none', borderRadius: 'var(--radius-sm)', color: 'white', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}>Delete</button>
              <button onClick={() => setConfirming(false)} style={{ padding: '4px 8px', background: 'transparent', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.72rem', cursor: 'pointer' }}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => onEdit(activity)} style={{ padding: '5px', background: 'transparent', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', cursor: 'pointer' }} title="Edit"><Edit2 size={13} /></button>
              <button onClick={() => setConfirming(true)} style={{ padding: '5px', background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', color: '#ef4444', cursor: 'pointer' }} title="Delete"><Trash2 size={13} /></button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function ActivityLogView({ activities, settings, onAddActivity, onUpdateActivity, onDeleteActivity, onResetDemo, onNavigateToTab }) {
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [addSuccess, setAddSuccess] = useState(false);

  const handleAdd = (data) => {
    onAddActivity(data);
    setShowForm(false);
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 2500);
  };

  const handleEdit = (data) => {
    onUpdateActivity(editingActivity.id, data);
    setEditingActivity(null);
  };

  const filtered = useMemo(() => {
    let result = [...activities];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        (EMISSION_FACTORS[a.categoryId]?.label || '').toLowerCase().includes(q) ||
        (a.note || '').toLowerCase().includes(q)
      );
    }
    if (filterCategory !== 'all') {
      result = result.filter(a => a.categoryId === filterCategory);
    }
    result.sort((a, b) => {
      const diff = new Date(b.date) - new Date(a.date);
      return sortOrder === 'desc' ? diff : -diff;
    });
    return result;
  }, [activities, searchQuery, filterCategory, sortOrder]);

  const totalFiltered = filtered.reduce((sum, a) => sum + (a.co2e || 0), 0);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Calendar size={24} style={{ color: 'var(--cyan-accent)' }} />
            Activity Log
          </h2>
          <p className="page-subtitle">
            Record everyday activities and see their estimated greenhouse gas emissions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={onResetDemo} title="Reset to demo seed data">
            <RotateCcw size={14} /> Reset Demo
          </button>
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingActivity(null); }}>
            <Plus size={15} /> Log Activity
          </button>
        </div>
      </div>

      {addSuccess && (
        <div style={{ padding: '12px 16px', marginBottom: 20, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
          <Check size={16} /> Activity saved successfully!
        </div>
      )}

      {/* Add/Edit Form */}
      {(showForm || editingActivity) && (
        <div style={{ marginBottom: 24, background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {editingActivity ? 'Edit Activity' : 'Log New Activity'}
            </h3>
          </div>
          <ActivityForm
            initialValues={editingActivity}
            onSubmit={editingActivity ? handleEdit : handleAdd}
            onCancel={() => { setShowForm(false); setEditingActivity(null); }}
            location={settings.location}
          />
        </div>
      )}

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '8px 12px', flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ color: 'var(--text-dim)' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search activities..."
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontSize: '0.85rem', flex: 1 }}
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
        >
          <option value="all">All Categories</option>
          {Object.entries(EMISSION_FACTORS).map(([id, f]) => (
            <option key={id} value={id}>{ICON_MAP[id] || ''} {f.label}</option>
          ))}
        </select>
        <button
          onClick={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '8px 12px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem' }}
        >
          {sortOrder === 'desc' ? <SortDesc size={14} /> : <SortAsc size={14} />}
          {sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '10px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', marginBottom: 20, fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <span><strong style={{ color: 'var(--text-main)' }}>{filtered.length}</strong> activities</span>
        <span style={{ color: 'var(--border-card)' }}>|</span>
        <span>Total estimated: <strong style={{ color: '#10b981' }}>{totalFiltered.toFixed(2)} kg CO₂e</strong></span>
        <span style={{ color: 'var(--border-card)' }}>|</span>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>⚠ Estimates only — illustrative factors applied</span>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Factor (Source)</th>
                <th>Est. CO₂e</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <Info size={24} />
                      <span>{searchQuery || filterCategory !== 'all' ? 'No activities match your filter.' : 'No activities logged yet.'}</span>
                      {!showForm && <button className="btn btn-primary" style={{ fontSize: '0.78rem' }} onClick={() => setShowForm(true)}><Plus size={13} /> Log First Activity</button>}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(activity => (
                  <ActivityRow
                    key={activity.id}
                    activity={activity}
                    onEdit={a => { setEditingActivity(a); setShowForm(false); }}
                    onDelete={onDeleteActivity}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Factors transparency note */}
      <div className="disclaimer-banner" style={{ marginTop: 24 }}>
        <span>📊 <strong>Calculation Transparency:</strong> Each entry is calculated as: <em>Amount × Emission Factor</em>. The emission factor applied depends on your selected location and the activity type. Factors are clearly labelled as illustrative — sourced from DEFRA 2024, CEA India 2022, IPCC AR6. See Settings to change your location factor.</span>
      </div>
    </div>
  );
}
