import { useState } from 'react';
import { getReligionColor } from '../lib/religionColors';

/* ── SVG Silhouettes (generic, religion-appropriate shapes) ── */

function TempleSpireSvg({ color }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.25" fill={color}>
        {/* Main spire */}
        <polygon points="60,10 72,50 48,50" />
        <rect x="50" y="50" width="20" height="6" rx="1" />
        {/* Upper tower */}
        <rect x="46" y="56" width="28" height="30" rx="2" />
        {/* Arch details */}
        <path d="M50 80 Q60 70 70 80" stroke={color} strokeWidth="1.5" fill="none" />
        {/* Middle platform */}
        <rect x="38" y="86" width="44" height="6" rx="1" />
        {/* Lower body */}
        <rect x="42" y="92" width="36" height="36" rx="2" />
        {/* Arch entrance */}
        <path d="M52 128 L52 110 Q60 103 68 110 L68 128" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Base platform */}
        <rect x="30" y="128" width="60" height="5" rx="1" />
        {/* Small side spires */}
        <polygon points="36,110 40,128 32,128" />
        <polygon points="84,110 88,128 80,128" />
        <rect x="32" y="107" width="8" height="3" rx="1" />
        <rect x="80" y="107" width="8" height="3" rx="1" />
      </g>
    </svg>
  );
}

function GurdwaraDomeSvg({ color }) {
  return (
    <svg viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.25" fill={color}>
        {/* Khanda (Sikh symbol) at top */}
        <line x1="70" y1="8" x2="70" y2="40" stroke={color} strokeWidth="2" />
        <circle cx="70" cy="12" r="4" />
        {/* Main dome */}
        <path d="M40 80 Q40 40 70 38 Q100 40 100 80 Z" />
        {/* Drum base of dome */}
        <rect x="36" y="78" width="68" height="12" rx="2" />
        {/* Four corner chhatris */}
        <ellipse cx="40" cy="68" rx="8" ry="12" />
        <ellipse cx="100" cy="68" rx="8" ry="12" />
        {/* Main body */}
        <rect x="30" y="90" width="80" height="40" rx="2" />
        {/* Central arch */}
        <path d="M54 130 L54 108 Q70 96 86 108 L86 130" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Side arches */}
        <path d="M34 130 L34 115 Q42 108 50 115 L50 130" fill="none" stroke={color} strokeWidth="1.2" />
        <path d="M90 130 L90 115 Q98 108 106 115 L106 130" fill="none" stroke={color} strokeWidth="1.2" />
        {/* Steps */}
        <rect x="20" y="130" width="100" height="4" rx="1" />
        <rect x="14" y="134" width="112" height="4" rx="1" />
      </g>
    </svg>
  );
}

function DomeSvg({ color }) {
  return (
    <svg viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.25" fill={color}>
        {/* Crescent + star at top */}
        <circle cx="70" cy="12" r="7" />
        <circle cx="74" cy="10" r="5" fill="transparent" stroke="none" />
        <polygon points="78,8 80,14 76,11" />
        {/* Main central dome */}
        <path d="M35 75 Q35 35 70 30 Q105 35 105 75 Z" />
        <ellipse cx="70" cy="75" rx="35" ry="6" />
        {/* Drum */}
        <rect x="40" y="73" width="60" height="14" rx="1" />
        {/* Two minarets */}
        <rect x="16" y="60" width="12" height="72" rx="2" />
        <ellipse cx="22" cy="58" rx="8" ry="12" />
        <rect x="112" y="60" width="12" height="72" rx="2" />
        <ellipse cx="118" cy="58" rx="8" ry="12" />
        {/* Main building body */}
        <rect x="32" y="87" width="76" height="45" rx="2" />
        {/* Main arch */}
        <path d="M50 132 L50 108 Q70 94 90 108 L90 132" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Side arches */}
        <path d="M34 132 L34 116 Q42 110 50 116 L50 132" fill="none" stroke={color} strokeWidth="1.2" />
        <path d="M90 132 L90 116 Q98 110 106 116 L106 132" fill="none" stroke={color} strokeWidth="1.2" />
        {/* Base */}
        <rect x="20" y="132" width="100" height="4" rx="1" />
      </g>
    </svg>
  );
}

function JainTempleSvg({ color }) {
  return (
    <svg viewBox="0 0 130 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.25" fill={color}>
        {/* Shikhara/spire */}
        <polygon points="65,8 74,42 56,42" />
        <ellipse cx="65" cy="42" rx="10" ry="3" />
        {/* Stacked decorative bands */}
        {[0,1,2,3].map((i) => (
          <rect key={i} x={52-i*3} y={44+i*7} width={26+i*6} height={6} rx="1" />
        ))}
        {/* Tower body */}
        <rect x="44" y="72" width="42" height="36" rx="2" />
        {/* Ornate arch */}
        <path d="M52 108 L52 90 Q65 82 78 90 L78 108" fill="none" stroke={color} strokeWidth="1.5" />
        {/* Column details */}
        <line x1="52" y1="72" x2="52" y2="108" stroke={color} strokeWidth="1" />
        <line x1="65" y1="72" x2="65" y2="108" stroke={color} strokeWidth="1" />
        <line x1="78" y1="72" x2="78" y2="108" stroke={color} strokeWidth="1" />
        {/* Ornamental rosette */}
        <circle cx="65" cy="84" r="5" fill="none" stroke={color} strokeWidth="1" />
        {/* Platform */}
        <rect x="30" y="108" width="70" height="6" rx="1" />
        {/* Steps */}
        <rect x="36" y="114" width="58" height="5" rx="1" />
        <rect x="42" y="119" width="46" height="5" rx="1" />
        {/* Side small spires */}
        <polygon points="36,100 40,108 32,108" />
        <polygon points="94,100 98,108 90,108" />
      </g>
    </svg>
  );
}

function StupaSvg({ color }) {
  return (
    <svg viewBox="0 0 130 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.25" fill={color}>
        {/* Harmika / finial at top */}
        <rect x="60" y="10" width="10" height="20" rx="1" />
        <rect x="56" y="28" width="18" height="5" rx="1" />
        {/* Dome */}
        <ellipse cx="65" cy="75" rx="42" ry="44" />
        {/* Drum base */}
        <rect x="22" y="105" width="86" height="10" rx="2" />
        {/* Lower base / medhi */}
        <rect x="15" y="115" width="100" height="12" rx="2" />
        {/* Steps */}
        <rect x="10" y="127" width="110" height="5" rx="1" />
        <rect x="4" y="132" width="122" height="5" rx="1" />
        {/* Decorative rings on dome */}
        <ellipse cx="65" cy="65" rx="30" ry="4" fill="none" stroke={color} strokeWidth="1.2" />
        <ellipse cx="65" cy="80" rx="38" ry="5" fill="none" stroke={color} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

const SILHOUETTE_MAP = {
  'temple-spire': TempleSpireSvg,
  'gurdwara-dome': GurdwaraDomeSvg,
  'dome': DomeSvg,
  'jain-temple': JainTempleSvg,
  'stupa': StupaSvg,
};

const EXTENSIONS = ['jpg', 'png', 'jpeg', 'webp'];

export default function ImageWithFallback({ slug, type = 'card', alt, religion, className = '' }) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const colors = getReligionColor(religion);
  const SilhouetteComp = SILHOUETTE_MAP[colors.silhouette] || TempleSpireSvg;

  const currentExt = EXTENSIONS[extIndex] || 'jpg';
  const src = `/images/destinations/${slug}/${type}.${currentExt}`;

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}
        style={{
          background: `linear-gradient(160deg, ${colors.from} 0%, ${colors.to} 100%)`,
        }}
        role="img"
        aria-label={alt}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 60%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
        {/* Silhouette */}
        <div className="relative z-10 w-1/2 max-w-[140px] opacity-90">
          <SilhouetteComp color={colors.text} />
        </div>
        {/* Subtle bottom gradient for text legibility on cards */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${colors.to}CC 0%, transparent 100%)`,
          }}
        />
      </div>
    );
  }

  const isHero = type === 'hero';

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(160deg, ${colors.from}44 0%, ${colors.to}66 100%)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        loading={isHero ? 'eager' : 'lazy'}
        fetchPriority={isHero ? 'high' : 'auto'}
        decoding="async"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.35s ease-out',
          willChange: 'opacity',
        }}
      />
    </div>
  );
}


