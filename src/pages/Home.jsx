import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ChevronDown, ArrowRight, MapPin, Star, Compass, Flame, Wind } from 'lucide-react';
import destinations from '../data/destinations.json';
import DestinationCard from '../components/DestinationCard';
import ImageWithFallback from '../components/ImageWithFallback';
import Footer from '../components/Footer';
import { getUniqueStates, getUniqueReligions, normalizeState } from '../lib/filterHelpers';
import { getReligionColor } from '../lib/religionColors';

/* ── Data ────────────────────────────────────────────────── */
const FEATURED_SLUGS = ['golden-temple', 'rishikesh', 'ajmer-sharif-dargah', 'tirupati-balaji', 'jagannath-temple'];
const heroDestinations = FEATURED_SLUGS.map((s) => destinations.find((d) => d.slug === s)).filter(Boolean);

const UNIQUE_STATES = getUniqueStates(destinations);
const UNIQUE_RELIGIONS = getUniqueReligions(destinations);

/* ── Animated Counter ────────────────────────────────────── */
function AnimCounter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(start);
          if (start >= target) clearInterval(t);
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Marquee Strip ───────────────────────────────────────── */
function Marquee() {
  const doubled = [...destinations, ...destinations];
  return (
    <div style={{ overflow: 'hidden', background: '#1A1410', borderTop: '1px solid #2A2018', borderBottom: '1px solid #2A2018', padding: '14px 0' }}>
      <div className="marquee-track" style={{ gap: 48, whiteSpace: 'nowrap' }}>
        {doubled.map((d, i) => {
          const name = d.display_title || d.name;
          return (
            <Link
              key={`${d.slug}-${i}`}
              to={`/destination/${d.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F4A025')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              <span>{name}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F4A025', display: 'inline-block', flexShrink: 0 }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}


/* ── Decorative Mandala SVG ──────────────────────────────── */
function Mandala({ size = 300, opacity = 0.07, color = '#F4A025' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" style={{ opacity }} aria-hidden="true">
      <circle cx="150" cy="150" r="140" stroke={color} strokeWidth="0.8" />
      <circle cx="150" cy="150" r="110" stroke={color} strokeWidth="0.6" />
      <circle cx="150" cy="150" r="80" stroke={color} strokeWidth="0.6" />
      <circle cx="150" cy="150" r="50" stroke={color} strokeWidth="0.8" />
      <circle cx="150" cy="150" r="20" stroke={color} strokeWidth="1" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
        const r = deg * Math.PI / 180;
        const x1 = 150 + 20 * Math.cos(r), y1 = 150 + 20 * Math.sin(r);
        const x2 = 150 + 140 * Math.cos(r), y2 = 150 + 140 * Math.sin(r);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.4" />;
      })}
      {[0,45,90,135,180,225,270,315].map((deg) => {
        const r = deg * Math.PI / 180;
        const cx = 150 + 80 * Math.cos(r), cy = 150 + 80 * Math.sin(r);
        return <circle key={deg} cx={cx} cy={cy} r="6" stroke={color} strokeWidth="0.8" fill="none" />;
      })}
      {[0,45,90,135,180,225,270,315].map((deg) => {
        const r = deg * Math.PI / 180;
        const cx = 150 + 110 * Math.cos(r), cy = 150 + 110 * Math.sin(r);
        return <polygon key={deg} points={`${cx},${cy-5} ${cx+4},${cy+3} ${cx-4},${cy+3}`} fill={color} />;
      })}
    </svg>
  );
}

/* ── Floating Diya SVG ───────────────────────────────────── */
function FloatingOrb({ size = 120, color1 = '#F4A025', color2 = '#8B1A1A', style = {} }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${color1}33, ${color2}22, transparent 70%)`, border: `1px solid ${color1}22`, ...style }} />
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrent((i) => (i + 1) % heroDestinations.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Preload next slide image so transitions are instant
  useEffect(() => {
    const nextIdx = (current + 1) % heroDestinations.length;
    const nextDest = heroDestinations[nextIdx];
    if (nextDest) {
      const img = new Image();
      img.src = `/images/destinations/${nextDest.slug}/hero.jpg`;
    }
  }, [current]);

  const dest = heroDestinations[current];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/explore?search=${encodeURIComponent(searchVal.trim())}`);
  };

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 600, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background crossfade */}
      <AnimatePresence initial={false}>
        <motion.div key={current} style={{ position: 'absolute', inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
          <motion.div style={{ position: 'absolute', inset: 0 }} initial={{ scale: 1 }} animate={{ scale: 1.08 }} transition={{ duration: 6, ease: 'linear' }}>
            <ImageWithFallback slug={dest.slug} type="hero" alt={`${dest.name} hero`} religion={dest.religion} className="w-full h-full object-cover" />
          </motion.div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.95) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,26,26,0.4) 0%, transparent 70%)' }} />
        </motion.div>
      </AnimatePresence>


      {/* Floating decorative mandalas */}
      <motion.div
        style={{ position: 'absolute', top: '8%', left: '-4%', zIndex: 2, pointerEvents: 'none' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
      >
        <Mandala size={280} opacity={0.1} color="#F4A025" />
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: '5%', right: '-6%', zIndex: 2, pointerEvents: 'none' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 100, ease: 'linear', repeat: Infinity }}
      >
        <Mandala size={340} opacity={0.08} color="#D4A017" />
      </motion.div>

      {/* Floating orbs */}
      <motion.div style={{ position: 'absolute', top: '20%', right: '8%', zIndex: 2, pointerEvents: 'none' }}
        animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <FloatingOrb size={80} color1="#F4A025" color2="#D4880A" />
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '25%', left: '6%', zIndex: 2, pointerEvents: 'none' }}
        animate={{ y: [0, 18, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
        <FloatingOrb size={56} color1="#1A6B6B" color2="#0D2B4E" />
      </motion.div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: 36, right: 28, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 10 }}>
        {heroDestinations.map((_, i) => (
          <motion.button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
            animate={{ height: i === current ? 28 : 8, background: i === current ? '#F4A025' : 'rgba(255,255,255,0.3)' }}
            transition={{ duration: 0.3 }}
            style={{ width: 3, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0 }}
          />
        ))}
      </div>

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: 860, width: '100%' }}>
        {/* Eyebrow badge */}
        <motion.div key={`badge-${current}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F4C065', background: 'rgba(244,160,37,0.15)', border: '1px solid rgba(244,160,37,0.28)', borderRadius: 999, padding: '6px 16px' }}>
            <Compass size={12} style={{ color: '#F4A025' }} />
            {normalizeState(dest.state) || 'India'} · {dest.religion || 'Sacred Site'}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1 key={`h1-${current}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 22px' }}>
          {dest.display_title || dest.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p key={`sub-${current}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.65, margin: '0 auto 36px', maxWidth: 560, fontFamily: 'Inter, sans-serif' }}>
          Discover India's most sacred destinations — steeped in centuries of devotion, history, and culture.
        </motion.p>

        {/* Search */}
        <motion.form initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }} onSubmit={handleSubmit}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 540, background: 'rgba(255,255,255,0.96)', borderRadius: 999, boxShadow: '0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(244,160,37,0.2)', overflow: 'hidden' }}>
            <Search size={17} style={{ color: '#7A7265', marginLeft: 22, flexShrink: 0 }} />
            <input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder="Search temples, cities, deities…" aria-label="Search"
              style={{ flex: 1, padding: '16px 12px', background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: '#1C1C1C', fontFamily: 'Inter, sans-serif' }} />
            <button type="submit" style={{ margin: 7, padding: '11px 24px', borderRadius: 999, background: 'linear-gradient(135deg, #D4880A, #8B1A1A)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 16px rgba(212,136,10,0.4)' }}>
              Explore
            </button>
          </div>
        </motion.form>

        {/* Quick links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <Link to={`/destination/${dest.slug}`} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif' }}>
            View destination <ArrowRight size={12} />
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>·</span>
          <Link to="/explore" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Inter, sans-serif' }}>
            Browse all {destinations.length} sites <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 10 }}
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Scroll</span>
        <ChevronDown size={14} color="rgba(255,255,255,0.3)" />
      </motion.div>
    </section>
  );
}

/* ── Stats Bar ───────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { icon: <MapPin size={18} />, value: destinations.length, suffix: '+', label: 'Sacred Sites' },
    { icon: <Compass size={18} />, value: UNIQUE_STATES.length, suffix: '', label: 'States' },
    { icon: <Star size={18} />, value: UNIQUE_RELIGIONS.length, suffix: '', label: 'Faiths' },
    { icon: <Flame size={18} />, value: 5000, suffix: '+', label: 'Years of Heritage' },
  ];

  return (
    <div style={{ background: '#1A1410', borderBottom: '1px solid #2A2018' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map(({ icon, value, suffix, label }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            style={{ padding: '28px 16px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid #2A2018' : 'none' }}>
            <div style={{ color: '#F4A025', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{icon}</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1 }}>
              <AnimCounter target={value} suffix={suffix} />
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Quote Section ───────────────────────────────────────── */
function QuoteSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0F0C08', padding: '80px 1.5rem' }}>
      {/* Large decorative mandala */}
      <motion.div style={{ position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }}
        animate={{ rotate: 360 }} transition={{ duration: 120, ease: 'linear', repeat: Infinity }}>
        <Mandala size={500} opacity={0.05} color="#F4A025" />
      </motion.div>
      <motion.div style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }}
        animate={{ rotate: -360 }} transition={{ duration: 150, ease: 'linear', repeat: Infinity }}>
        <Mandala size={400} opacity={0.04} color="#D4A017" />
      </motion.div>

      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 80, fontFamily: "'Playfair Display', serif", color: '#F4A025', lineHeight: 0.6, marginBottom: 24, opacity: 0.6 }}>"</div>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, marginBottom: 28 }}>
            India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend, and the great grandmother of tradition.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— Mark Twain</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── States Strip ─────────────────────────────────────────── */
function StatesStrip() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 0', background: '#FAF7F2', position: 'relative', overflow: 'hidden' }}>
      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #8B1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F4A025', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Browse by Region</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1C1C1C', margin: 0 }}>
            Explore by <span style={{ color: '#8B1A1A', fontStyle: 'italic' }}>State</span>
          </h2>
        </motion.div>

        <div className="hide-scrollbar" style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 12 }}>
          {UNIQUE_STATES.map((s, i) => {
            const count = destinations.filter((d) => normalizeState(d.state) === s).length;
            return (
              <motion.button key={s}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(139,26,26,0.15)' }}
                onClick={() => navigate(`/explore?state=${encodeURIComponent(s.toLowerCase())}`)}
                style={{ flexShrink: 0, minWidth: 150, background: '#fff', border: '1px solid #E8E0D5', borderRadius: 20, padding: '20px 22px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.22s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <span style={{ display: 'block', fontSize: 30, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#D4880A', lineHeight: 1, marginBottom: 4 }}>{count}</span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: '#1C1C1C', fontFamily: 'Inter, sans-serif', marginBottom: 3 }}>{s}</span>
                <span style={{ display: 'block', fontSize: 11, color: '#7A7265', fontFamily: 'Inter, sans-serif' }}>{count === 1 ? 'destination' : 'destinations'}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Religion Cards (Full-bleed glassmorphism) ────────────── */
function ReligionSection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(160deg, #1A1410 0%, #2A1E14 50%, #1A1410 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* BG orbs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,136,10,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,26,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F4A025', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Filter by Faith</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', margin: 0 }}>
              Explore by <span style={{ fontStyle: 'italic', color: '#F4A025' }}>Religion</span>
            </h2>
          </div>
          <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {UNIQUE_RELIGIONS.map((religion, i) => {
            const colors = getReligionColor(religion);
            const count = destinations.filter((d) => (d.religion || '').toLowerCase().includes(religion.toLowerCase())).length;
            return (
              <motion.button key={religion}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => navigate(`/explore?religion=${encodeURIComponent(religion)}`)}
                style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: 'none', cursor: 'pointer', padding: 0, background: 'transparent', textAlign: 'left' }}>
                {/* Card body */}
                <div style={{ background: `linear-gradient(145deg, ${colors.from}EE, ${colors.to})`, padding: '32px 24px 24px', position: 'relative', overflow: 'hidden' }}>
                  {/* Subtle mandala pattern inside card */}
                  <div style={{ position: 'absolute', top: -30, right: -30, opacity: 0.12 }}>
                    <Mandala size={140} opacity={1} color={colors.text} />
                  </div>
                  {/* Glassmorphism count chip */}
                  <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', fontSize: 11, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, sans-serif', fontWeight: 600, marginBottom: 48 }}>
                    {count} {count === 1 ? 'site' : 'sites'}
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 6px', position: 'relative' }}>{religion}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: 'Inter, sans-serif', position: 'relative' }}>
                    <ArrowRight size={13} /> Explore
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Featured Destinations ───────────────────────────────── */
function FeaturedSection() {
  const featured = destinations.slice(0, 12);
  return (
    <section style={{ padding: '90px 0', background: '#FAF7F2', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F4A025', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Sacred India</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1C1C1C', margin: 0 }}>
              Featured <span style={{ fontStyle: 'italic', color: '#8B1A1A' }}>Destinations</span>
            </h2>
          </div>
          <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 999, border: '1.5px solid #E8E0D5', fontSize: 13, fontWeight: 600, color: '#3D3528', textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}>
            View all {destinations.length} <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 18 }}>
          {featured.map((dest, i) => (
            <motion.div key={dest.id}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: (i % 6) * 0.06, duration: 0.45 }}>
              <DestinationCard destination={dest} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: 52, textAlign: 'center' }}>
          <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px', borderRadius: 999, background: 'linear-gradient(135deg, #D4880A, #8B1A1A)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 32px rgba(212,136,10,0.35)' }}>
            Explore All {destinations.length} Destinations <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Why Visit Section ───────────────────────────────────── */
function WhyVisitSection() {
  const reasons = [
    { icon: '🛕', title: 'Ancient Temples', desc: 'From towering gopurams of the south to Himalayan shrines — India\'s temple architecture spans millennia.' },
    { icon: '🕌', title: 'Multi-Faith Heritage', desc: 'Hindu, Sikh, Islamic, Jain and Buddhist sites coexist across the subcontinent, each with their own living tradition.' },
    { icon: '🏔️', title: 'Himalayan Pilgrimages', desc: 'Char Dham, Kedarnath, Badrinath — sacred journeys through some of the world\'s most dramatic landscapes.' },
    { icon: '🌊', title: 'Coastal Sanctuaries', desc: 'Rameshwaram, Dwarka, Jagannath Puri — where the divine meets the ocean at India\'s four coastal dhams.' },
    { icon: '🕯️', title: 'Living Traditions', desc: 'Unlike museum-piece monuments, India\'s sacred sites are living, breathing centres of daily worship and festival.' },
    { icon: '📿', title: 'Spiritual Depth', desc: 'Every site carries layers of mythology, history, architecture and daily ritual practice waiting to be explored.' },
  ];

  return (
    <section style={{ padding: '90px 0', background: '#F0EAE0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'radial-gradient(circle, #8B1A1A 1.5px, transparent 1.5px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F4A025', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Why Explore</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1C1C1C', margin: '0 0 16px' }}>
            The Soul of <span style={{ fontStyle: 'italic', color: '#8B1A1A' }}>India</span>
          </h2>
          <p style={{ fontSize: 16, color: '#7A7265', fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Six reasons why India's sacred sites belong on every traveller's itinerary.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {reasons.map(({ icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
              style={{ background: '#fff', borderRadius: 24, padding: '32px 28px', border: '1px solid #E8E0D5', transition: 'all 0.25s ease', cursor: 'default', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: 36, marginBottom: 16, lineHeight: 1 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: '#1C1C1C', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#7A7265', fontFamily: 'Inter, sans-serif', margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Full-bleed CTA ──────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1A1410 0%, #3A1A08 50%, #1A1410 100%)', padding: '100px 1.5rem' }}>
      {/* Animated mandala bg */}
      <motion.div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none' }}
        animate={{ rotate: 360 }} transition={{ duration: 200, ease: 'linear', repeat: Infinity }}>
        <Mandala size={700} opacity={0.04} color="#F4A025" />
      </motion.div>

      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 999, background: 'rgba(244,160,37,0.15)', border: '1px solid rgba(244,160,37,0.25)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F4A025', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginBottom: 24 }}>
            Begin Your Journey
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            India's Sacred Sites<br />
            <span style={{ fontStyle: 'italic', color: '#F4A025' }}>Await You</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', lineHeight: 1.7, marginBottom: 36, maxWidth: 500, margin: '0 auto 40px' }}>
            From the Himalayas to the coast — {destinations.length} verified sacred destinations, all documented from official sources.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 999, background: 'linear-gradient(135deg, #D4880A, #8B1A1A)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 32px rgba(212,136,10,0.4)' }}>
              Explore All Destinations <ArrowRight size={16} />
            </Link>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 30px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              About This Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Home Page ───────────────────────────────────────────── */
export default function Home() {
  useEffect(() => { document.title = 'Explore India — Sacred Destinations'; }, []);

  return (
    <main>
      <HeroSection />
      <Marquee />
      <StatsBar />
      <QuoteSection />
      <StatesStrip />
      <ReligionSection />
      <FeaturedSection />
      <WhyVisitSection />
      <CTASection />
      <Footer />
    </main>
  );
}
