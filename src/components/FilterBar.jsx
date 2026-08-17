import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronDown, X } from 'lucide-react';
import { getUniqueStates, getUniqueReligions, normalizeState } from '../lib/filterHelpers';
import destinations from '../data/destinations.json';

const ALL_STATES = getUniqueStates(destinations);
const ALL_RELIGIONS = getUniqueReligions(destinations);

export default function FilterBar({ filters, onChange }) {
  const { search = '', state = '', religion = '' } = filters;

  const handleSearch = (e) => onChange({ ...filters, search: e.target.value });
  const handleState = (e) => onChange({ ...filters, state: e.target.value });
  const handleReligion = (val) => onChange({ ...filters, religion: religion === val ? '' : val });
  const clearAll = () => onChange({ search: '', state: '', religion: '' });
  const hasActive = search || state || religion;

  return (
    <div
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 30,
        background: 'rgba(250,247,242,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E8E0D5',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 1.5rem' }}>
        {/* Row 1: Search + state + clear */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10, alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 400 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7A7265', pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search temples, cities, deities…"
              aria-label="Search destinations"
              style={{
                width: '100%',
                paddingLeft: 36,
                paddingRight: search ? 32 : 16,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 999,
                border: `1px solid ${search ? '#F4A025' : '#E8E0D5'}`,
                background: '#FAF7F2',
                fontSize: 13,
                color: '#1C1C1C',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {search && (
              <button
                onClick={() => onChange({ ...filters, search: '' })}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                aria-label="Clear search"
              >
                <X size={13} style={{ color: '#7A7265' }} />
              </button>
            )}
          </div>

          {/* State dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={state}
              onChange={handleState}
              aria-label="Filter by state"
              style={{
                appearance: 'none',
                paddingLeft: 14,
                paddingRight: 32,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 999,
                border: `1px solid ${state ? '#F4A025' : '#E8E0D5'}`,
                background: '#FAF7F2',
                fontSize: 13,
                color: state ? '#1C1C1C' : '#7A7265',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">All States</option>
              {ALL_STATES.map((s) => (
                <option key={s} value={s.toLowerCase()}>{s}</option>
              ))}
            </select>
            <ChevronDown size={13} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#7A7265', pointerEvents: 'none' }} />
          </div>

          {/* Clear button */}
          <AnimatePresence>
            {hasActive && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={clearAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 999,
                  background: '#F5EDE0',
                  color: '#8B3A00',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                <X size={12} /> Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Row 2: Religion pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7265', fontFamily: 'Inter, sans-serif', marginRight: 4 }}>
            Filter:
          </span>
          <ReligionPill label="All" value="" active={!religion} onClick={() => onChange({ ...filters, religion: '' })} />
          {ALL_RELIGIONS.map((r) => (
            <ReligionPill key={r} label={r} value={r} active={religion === r} onClick={() => handleReligion(r)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReligionPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        position: 'relative',
        padding: '6px 14px',
        borderRadius: 999,
        fontSize: 13,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        border: active ? 'none' : '1px solid #E8E0D5',
        background: active ? 'linear-gradient(135deg, #D4880A, #8B1A1A)' : 'transparent',
        color: active ? '#fff' : '#3D3528',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        outline: 'none',
      }}
    >
      {label}
    </button>
  );
}
