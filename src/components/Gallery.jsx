import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import Lightbox from './Lightbox';

const GALLERY_TYPES = ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4'];

export default function Gallery({ slug, name, religion }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const images = GALLERY_TYPES.map((type) => ({
    type,
    alt: `${name} — ${type.replace('-', ' ')} photo`,
  }));

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Camera size={18} style={{ color: '#8B3A00' }} />
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 600, color: '#1C1C1C', margin: 0 }}>
          Gallery
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {images.map((img, i) => (
          <button
            key={img.type}
            onClick={() => setLightboxIdx(i)}
            aria-label={`Open ${img.alt} in lightbox`}
            style={{
              position: 'relative',
              borderRadius: 12,
              overflow: 'hidden',
              aspectRatio: '4/3',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: 'transparent',
            }}
          >
            <ImageWithFallback
              slug={slug} type={img.type} alt={img.alt} religion={religion}
              className="w-full h-full object-cover"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
            >
              <Camera size={18} color="rgba(255,255,255,0.9)" />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            initialIdx={lightboxIdx}
            religion={religion}
            slug={slug}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
