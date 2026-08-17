import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

/**
 * Lightbox — full-screen image viewer with keyboard nav + focus trap.
 * Props:
 *   images     — array of { type, path, alt }
 *   initialIdx — starting index
 *   religion   — for placeholder fallback
 *   slug       — for image paths
 *   onClose    — callback to close
 */
export default function Lightbox({ images, initialIdx = 0, religion, slug, onClose }) {
  const [idx, setIdx] = useState(initialIdx);
  const closeRef = useRef(null);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    // Focus close button for accessibility
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const current = images[idx];

  return (
    <motion.div
      className="lightbox-overlay flex items-center justify-center"
      style={{ background: 'rgba(5, 3, 2, 0.96)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-medium text-white/50">
        {idx + 1} / {images.length}
      </div>

      {/* Nav buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Image */}
      <motion.div
        key={idx}
        className="relative max-w-5xl max-h-[80vh] w-full mx-16 rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ aspectRatio: '16/10' }}
      >
        <ImageWithFallback
          slug={slug}
          type={current.type}
          alt={current.alt}
          religion={religion}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={img.type}
              onClick={() => setIdx(i)}
              className="rounded-md overflow-hidden transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{
                width: 52,
                height: 36,
                opacity: i === idx ? 1 : 0.45,
                transform: i === idx ? 'scale(1.08)' : 'scale(1)',
                border: i === idx ? '2px solid rgba(244,160,37,0.8)' : '2px solid transparent',
              }}
              aria-label={`View image ${i + 1}`}
            >
              <ImageWithFallback
                slug={slug}
                type={img.type}
                alt={img.alt}
                religion={religion}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
