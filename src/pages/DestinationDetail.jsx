import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, ExternalLink, MapPin, Compass } from 'lucide-react';
import destinations from '../data/destinations.json';
import ImageWithFallback from '../components/ImageWithFallback';
import QuickFacts from '../components/QuickFacts';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import { findBySlug, findRelatedByName, cleanNearbyPlace } from '../lib/slugHelpers';
import { getReligionBadge, getReligionColor } from '../lib/religionColors';
import { normalizeState } from '../lib/filterHelpers';

const SOURCES = ['tourism.rajasthan.gov.in', 'uttarakhandtourism.gov.in', 'incredibleindia.gov.in', 'devasthan.rajasthan.gov.in', 'amritsar.nic.in'];

/* ── Mandala decoration (inline, small) ─────────────────── */
function SmallMandala({ size = 200, opacity = 0.06, color = '#F4A025' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true" style={{ opacity }}>
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="0.8" />
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="0.6" />
      <circle cx="100" cy="100" r="45" stroke={color} strokeWidth="0.6" />
      <circle cx="100" cy="100" r="18" stroke={color} strokeWidth="1" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
        const r = deg * Math.PI/180;
        return <line key={deg} x1={100+18*Math.cos(r)} y1={100+18*Math.sin(r)} x2={100+95*Math.cos(r)} y2={100+95*Math.sin(r)} stroke={color} strokeWidth="0.35" />;
      })}
      {[0,45,90,135,180,225,270,315].map((deg) => {
        const r = deg * Math.PI/180;
        return <circle key={deg} cx={100+70*Math.cos(r)} cy={100+70*Math.sin(r)} r="5" stroke={color} strokeWidth="0.8" fill="none" />;
      })}
    </svg>
  );
}

/* ── Parallax Hero ───────────────────────────────────────── */
function ParallaxHero({ destination }) {
  const { slug, name, display_title, state, religion, category } = destination;
  const badge = getReligionBadge(religion);
  const colors = getReligionColor(religion);
  const displayState = normalizeState(state);
  const categoryShort = category ? category.split('/')[0].trim() : '';
  const bgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => { if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.32}px)`; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', height: '72vh', minHeight: 500 }}>
      <div ref={bgRef} style={{ position: 'absolute', top: '-12%', left: 0, right: 0, bottom: '-12%' }}>
        <ImageWithFallback slug={slug} type="hero" alt={`${name} — hero`} religion={religion} className="w-full h-full object-cover" />
      </div>

      {/* Multi-layer scrims */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 50% at 20% 100%, ${colors.to}55 0%, transparent 70%)` }} />

      {/* Rotating mandala top-right */}
      <motion.div style={{ position: 'absolute', top: -40, right: -40, zIndex: 2, pointerEvents: 'none' }}
        animate={{ rotate: 360 }} transition={{ duration: 80, ease: 'linear', repeat: Infinity }}>
        <SmallMandala size={220} opacity={0.1} color="#F4A025" />
      </motion.div>

      {/* Back nav */}
      <div style={{ position: 'absolute', top: 88, left: 28, zIndex: 10 }}>
        <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={13} /> Back to Explore
        </Link>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, padding: '0 2rem 3rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            {religion && (
              <span style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(4px)' }}>{religion}</span>
            )}
            {categoryShort && (
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Inter, sans-serif' }}>{categoryShort}</span>
            )}
            {displayState && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
                <Navigation size={11} /> {displayState}
              </span>
            )}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: '#fff', fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
            {display_title || name}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}

/* ── Nearby Chip ─────────────────────────────────────────── */
function NearbyChip({ placeStr }) {
  const cleaned = cleanNearbyPlace(placeStr);
  if (!cleaned || cleaned.length < 3) return null;
  const related = findRelatedByName(destinations, cleaned);
  const base = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, fontSize: 13, fontFamily: 'Inter, sans-serif', textDecoration: 'none', transition: 'all 0.18s' };
  return related
    ? <Link to={`/destination/${related.slug}`} style={{ ...base, color: '#8B3A00', background: '#FFF0E0', border: '1px solid #F4A02540' }}>{cleaned} <ExternalLink size={11} /></Link>
    : <span style={{ ...base, color: '#7A7265', background: '#F5F0EB', border: '1px solid #E8E0D5' }}>{cleaned}</span>;
}

/* ── How to Reach ────────────────────────────────────────── */
function HowToReach({ text }) {
  const modes = ['Air', 'Road', 'Train', 'Trek'];
  const segments = [];
  let rem = text;
  for (const mode of modes) {
    const marker = `By ${mode}:`;
    const idx = rem.indexOf(marker);
    if (idx !== -1) {
      const after = idx + marker.length;
      const next = modes.filter((m) => m !== mode).map((m) => ({ m, idx: rem.indexOf(`By ${m}:`, after) })).filter((x) => x.idx !== -1).sort((a, b) => a.idx - b.idx)[0];
      const end = next ? next.idx : rem.length;
      segments.push({ mode, text: rem.slice(after, end).trim() });
      rem = rem.slice(end);
    }
  }
  if (!segments.length) return <p style={{ fontSize: 14, lineHeight: 1.8, color: '#3D3528', fontFamily: 'Inter, sans-serif', margin: 0 }}>{text}</p>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
      {segments.map(({ mode, text: t }, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #E8E0D5', borderRadius: 16, padding: '18px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>{mode === 'Air' ? '✈️' : mode === 'Train' ? '🚂' : mode === 'Road' ? '🚌' : '🥾'}</span>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8B3A00', fontFamily: 'Inter, sans-serif', margin: 0 }}>By {mode}</p>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#3D3528', fontFamily: 'Inter, sans-serif', margin: 0 }}>{t}</p>
        </div>
      ))}
    </div>
  );
}

/* ── More Destinations strip ─────────────────────────────── */
function MoreDestinations({ currentSlug, religion }) {
  const similar = destinations.filter((d) => d.slug !== currentSlug && (d.religion === religion || !religion)).slice(0, 4);
  if (!similar.length) return null;
  return (
    <section style={{ padding: '60px 0', background: '#F0EAE0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1C1C1C', marginBottom: 24 }}>
          More Sacred Sites
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16 }}>
          {similar.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <DestinationCard destination={dest} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Not Found ───────────────────────────────────────────── */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAF7F2', padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛕</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>Destination not found</h1>
      <p style={{ color: '#7A7265', marginBottom: 28, fontFamily: 'Inter, sans-serif' }}>This destination doesn't exist in our database yet.</p>
      <button onClick={() => navigate('/explore')} style={{ padding: '13px 30px', borderRadius: 999, background: 'linear-gradient(135deg, #D4880A, #8B1A1A)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15 }}>
        Browse all destinations
      </button>
    </div>
  );
}

/* ── Detail Page ─────────────────────────────────────────── */
export default function DestinationDetail() {
  const { slug } = useParams();
  const destination = findBySlug(destinations, slug);

  useEffect(() => {
    if (destination) { document.title = `${destination.display_title || destination.name} — Explore India`; window.scrollTo(0, 0); }
  }, [destination]);

  if (!destination) return <NotFound />;

  const { name, display_title, religion, about, how_to_reach, nearby_places = [] } = destination;
  const colors = getReligionColor(religion);

  const cleanedNearby = nearby_places.map(cleanNearbyPlace).filter((s) => s && s.length > 3 && !s.toLowerCase().startsWith('visitor') && !s.toLowerCase().startsWith('faq'));

  const revealSection = { marginBottom: 52 };
  const sectionHead = { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: '#1C1C1C', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 };
  const colorDot = { width: 8, height: 24, borderRadius: 4, background: `linear-gradient(180deg, ${colors.from}, ${colors.to})`, flexShrink: 0 };

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      <ParallaxHero destination={destination} />

      {/* Main layout */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3.5rem 1.5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 52, alignItems: 'start' }}>

          {/* LEFT: content */}
          <div>
            {/* About */}
            {about && (
              <motion.div style={revealSection} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={sectionHead}><span style={colorDot} />About</h2>
                <p style={{ fontSize: 15.5, lineHeight: 1.88, color: '#3D3528', fontFamily: 'Inter, sans-serif' }}>{about}</p>
              </motion.div>
            )}

            {/* How to Reach */}
            {how_to_reach && (
              <motion.div style={revealSection} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={sectionHead}><span style={colorDot} />How to Reach</h2>
                <HowToReach text={how_to_reach} />
              </motion.div>
            )}

            {/* Nearby Places */}
            {cleanedNearby.length > 0 && (
              <motion.div style={revealSection} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 style={sectionHead}><span style={colorDot} />Nearby Places</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cleanedNearby.map((p, i) => <NearbyChip key={i} placeStr={p} />)}
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            <motion.div style={revealSection} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Gallery slug={destination.slug} name={display_title || name} religion={religion} />
            </motion.div>

            {/* Sources */}
            <motion.div style={{ borderTop: '1px solid #E8E0D5', paddingTop: 28, marginBottom: 60 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7265', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Content Sources</p>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: '#A09080', fontFamily: 'Inter, sans-serif' }}>
                Information verified from: {SOURCES.join(' · ')} and respective state tourism portals.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: sidebar */}
          <div style={{ position: 'sticky', top: 96 }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <QuickFacts destination={destination} />
              <Link to="/explore" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, padding: '13px 20px', borderRadius: 14, border: '1px solid #E8E0D5', color: '#3D3528', background: '#fff', textDecoration: 'none', fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <ArrowLeft size={14} /> Browse More Destinations
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* More Destinations */}
      <MoreDestinations currentSlug={slug} religion={religion} />
      <Footer />
    </div>
  );
}
