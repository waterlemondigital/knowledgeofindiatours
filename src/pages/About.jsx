import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Database, Globe, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import destinations from '../data/destinations.json';
import { getUniqueStates, getUniqueReligions } from '../lib/filterHelpers';

const STATS = [
  { label: 'Destinations', value: destinations.length },
  { label: 'States Covered', value: getUniqueStates(destinations).length },
  { label: 'Faiths & Traditions', value: getUniqueReligions(destinations).length },
];

const UPCOMING = ['Forts & Palaces', 'Hill Stations', 'Beaches', 'Wildlife Sanctuaries', 'Heritage Cities'];

const iconBg = { width: 40, height: 40, borderRadius: 12, background: '#F5EDE0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 };
const h2Style = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 600, color: '#1C1C1C', marginBottom: 12, marginTop: 0 };
const pStyle = { fontSize: 15, lineHeight: 1.8, color: '#3D3528', fontFamily: 'Inter, sans-serif', margin: 0 };

export default function About() {
  useEffect(() => { document.title = 'About — Explore India'; }, []);

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #1A1410 0%, #FAF7F2 100%)', paddingTop: 120, paddingBottom: 64, padding: '120px 1.5rem 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.p
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F4A025', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          >
            About This Site
          </motion.p>
          <motion.h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.07 }}
          >
            Explore India
          </motion.h1>
          <motion.p
            style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', maxWidth: 580 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.14 }}
          >
            A curated, data-driven guide to India's most sacred and culturally significant destinations.
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        {/* Stats */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: -32, marginBottom: 48 }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          {STATS.map(({ label, value }) => (
            <div key={label} style={{ borderRadius: 20, padding: '20px 16px', textAlign: 'center', background: '#fff', border: '1px solid #E8E0D5', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: '#D4880A', margin: '0 0 4px' }}>{value}</p>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7265', fontFamily: 'Inter, sans-serif', margin: 0 }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          style={{ display: 'flex', gap: 16, marginBottom: 36 }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div style={iconBg}><Compass size={18} style={{ color: '#8B3A00' }} /></div>
          <div>
            <h2 style={h2Style}>Our Mission</h2>
            <p style={pStyle}>
              India is home to some of the world's most extraordinary sacred sites — ancient temples that have stood for millennia, Sufi shrines that transcend religious boundaries, Himalayan pilgrimage routes that test human endurance, and coastal temples where land meets sea. This site exists to document and celebrate these places with accuracy, respect, and care.
            </p>
          </div>
        </motion.div>

        {/* Data */}
        <motion.div
          style={{ display: 'flex', gap: 16, marginBottom: 36 }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div style={iconBg}><Database size={18} style={{ color: '#8B3A00' }} /></div>
          <div>
            <h2 style={h2Style}>Data Integrity</h2>
            <p style={{ ...pStyle, marginBottom: 12 }}>
              Every destination entry is sourced from official government tourism portals, state tourism boards, and verified factual sources. We cite our sources openly on each destination page — because accuracy matters when documenting places of faith and historical significance.
            </p>
            <p style={{ fontSize: 13, color: '#7A7265', fontFamily: 'Inter, sans-serif', lineHeight: 1.65 }}>
              Primary sources: tourism.rajasthan.gov.in, uttarakhandtourism.gov.in, incredibleindia.gov.in, devasthan.rajasthan.gov.in, amritsar.nic.in, and respective state government portals.
            </p>
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div
          style={{ display: 'flex', gap: 16, marginBottom: 48 }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div style={iconBg}><Globe size={18} style={{ color: '#8B3A00' }} /></div>
          <div>
            <h2 style={h2Style}>What's Coming Next</h2>
            <p style={{ ...pStyle, marginBottom: 16 }}>
              This is the first content module — religious and pilgrimage sites. More categories are being researched and added:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {UPCOMING.map((cat) => (
                <span key={cat} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 13, border: '1px solid #E8E0D5', color: '#7A7265', background: '#F5F0EB', fontFamily: 'Inter, sans-serif' }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          style={{ borderRadius: 28, padding: '40px 32px', textAlign: 'center', background: 'linear-gradient(135deg, #1A1410, #2A1E14)' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Ready to Explore?</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
            Browse {destinations.length} verified sacred destinations across India.
          </p>
          <Link
            to="/explore"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 30px', borderRadius: 999, background: 'linear-gradient(135deg, #D4880A, #8B1A1A)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
          >
            Browse Destinations <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
