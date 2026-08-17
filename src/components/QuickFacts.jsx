import { Star, Church, MapPin, BookOpen } from 'lucide-react';

export default function QuickFacts({ destination }) {
  const { deity, religion, district, state, also_known_as } = destination;

  const facts = [
    { key: 'deity', label: 'Deity / Presiding Figure', value: deity, Icon: Star },
    { key: 'religion', label: 'Religion / Faith', value: religion, Icon: Church },
    { key: 'location', label: 'Location', value: [district, state].filter(Boolean).join(', '), Icon: MapPin },
    { key: 'also_known_as', label: 'Also Known As', value: also_known_as, Icon: BookOpen },
  ].filter((f) => f.value && f.value.trim());

  if (!facts.length) return null;

  return (
    <div style={{ borderRadius: 20, padding: '24px', background: 'rgba(250,247,242,0.7)', border: '1px solid #E8E0D5' }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: '#1C1C1C', marginBottom: 20 }}>
        At a Glance
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {facts.map(({ key, label, value, Icon }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: '#F5EDE0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <Icon size={15} style={{ color: '#8B3A00' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7265', marginBottom: 3, fontFamily: 'Inter, sans-serif' }}>
                {label}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: '#1C1C1C', fontFamily: 'Inter, sans-serif', wordBreak: 'break-word' }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
