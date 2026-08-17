import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import destinations from '../data/destinations.json';
import DestinationCard from '../components/DestinationCard';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import { filterDestinations } from '../lib/filterHelpers';

function EmptyState({ onClear }) {
  return (
    <motion.div
      style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem', textAlign: 'center' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ width: 64, height: 64, borderRadius: 16, background: '#F5EDE0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <Search size={26} style={{ color: '#8B3A00' }} />
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: '#1C1C1C', marginBottom: 8 }}>
        No destinations found
      </h3>
      <p style={{ fontSize: 14, color: '#7A7265', maxWidth: 340, marginBottom: 24, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
        Try adjusting your filters or search term. More destinations are being added regularly.
      </p>
      <button
        onClick={onClear}
        style={{ padding: '10px 24px', borderRadius: 999, background: 'linear-gradient(135deg, #D4880A, #8B1A1A)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }}
      >
        Clear all filters
      </button>
    </motion.div>
  );
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    state: searchParams.get('state') || '',
    religion: searchParams.get('religion') || '',
  });

  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.state) params.state = filters.state;
    if (filters.religion) params.religion = filters.religion;
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    document.title = 'Explore Destinations — Explore India';
  }, []);

  const filtered = useMemo(() => filterDestinations(destinations, filters), [filters]);
  const clearFilters = () => setFilters({ search: '', state: '', religion: '' });

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: 'linear-gradient(180deg, #1A1410 0%, #FAF7F2 100%)', paddingTop: 120, paddingBottom: 48, padding: '120px 1.5rem 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.p
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F4A025', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            All Destinations
          </motion.p>
          <motion.h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.07 }}
          >
            Explore Sacred India
          </motion.h1>
          <motion.p
            style={{ marginTop: 12, fontSize: 16, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
          >
            {destinations.length} destinations across India's religious and cultural traditions.
          </motion.p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Results */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Count */}
        <motion.p
          key={filtered.length}
          style={{ fontSize: 13, color: '#7A7265', marginBottom: 20, fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.length === destinations.length
            ? `All ${filtered.length} destinations`
            : `${filtered.length} of ${destinations.length} destinations`}
        </motion.p>

        {/* Grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState key="empty" onClear={clearFilters} />
            ) : (
              filtered.map((dest) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                >
                  <DestinationCard destination={dest} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
