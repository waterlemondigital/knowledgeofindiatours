import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { getReligionBadge } from '../lib/religionColors';
import { normalizeState } from '../lib/filterHelpers';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const { slug, display_title, name, state, district, religion, category } = destination;
  const badge = getReligionBadge(religion);
  const displayState = normalizeState(state);
  const categoryShort = category ? category.split('/')[0].trim() : '';

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ borderRadius: 20, overflow: 'hidden', background: '#111', position: 'relative', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
    >
      <Link to={`/destination/${slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }} className="group">
          <motion.div
            style={{ width: '100%', height: '100%' }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ImageWithFallback
              slug={slug}
              type="card"
              alt={`${name} — ${categoryShort}`}
              religion={religion}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Always-present gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,6,3,0.96) 0%, rgba(10,6,3,0.45) 45%, transparent 72%)', pointerEvents: 'none' }} />

          {/* Religion badge top-right */}
          {religion && (
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', backdropFilter: 'blur(4px)' }}>
                {religion}
              </span>
            </div>
          )}

          {/* Hover reveal overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(139,26,26,0.6) 0%, transparent 60%)', pointerEvents: 'none' }}
          />

          {/* Bottom text */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 14px 16px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', fontWeight: 700, color: '#fff', lineHeight: 1.25, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
              {display_title || name}
            </h3>

            {(displayState || district) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.58)', fontSize: 11, fontFamily: 'Inter, sans-serif', marginBottom: 6 }}>
                <MapPin size={10} />
                <span>{district && displayState ? `${district}, ${displayState}` : displayState || district}</span>
              </div>
            )}

            {/* Arrow chip — appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#F4A025', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Explore <ArrowRight size={11} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
