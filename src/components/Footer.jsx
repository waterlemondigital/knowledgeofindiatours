import { Link } from 'react-router-dom';
import { Compass, Heart } from 'lucide-react';

const FOOTER_LINKS = {
  Explore: [
    { label: 'All Destinations', to: '/explore' },
    { label: 'By State', to: '/explore' },
    { label: 'By Religion', to: '/explore' },
  ],
  Site: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
  ],
};

const SOURCES = ['tourism.rajasthan.gov.in', 'uttarakhandtourism.gov.in', 'incredibleindia.gov.in', 'devasthan.rajasthan.gov.in', 'amritsar.nic.in'];

export default function Footer() {
  return (
    <footer style={{ marginTop: 80, borderTop: '1px solid #2A2018', background: 'linear-gradient(180deg, #1A1410 0%, #0F0C08 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #F4A025, #8B1A1A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={15} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: '#fff' }}>
                Explore <span style={{ color: '#F4A025' }}>India</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#7A6A5A', fontFamily: 'Inter, sans-serif', maxWidth: 320, marginBottom: 8 }}>
              A curated guide to India's most sacred and culturally significant destinations — temples, shrines, holy cities, and spiritual landmarks across every state.
            </p>
            <p style={{ fontSize: 12, color: '#4A3A2A', fontFamily: 'Inter, sans-serif' }}>More destination categories coming soon.</p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F4A025', marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>
                {section}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} style={{ fontSize: 13, color: '#6A5A4A', textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sources */}
        <div style={{ borderTop: '1px solid #2A2018', paddingTop: 24, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4A3A2A', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
            Content verified from official sources including:
          </p>
          <p style={{ fontSize: 11, color: '#3A2A1A', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
            {SOURCES.join(' · ')} · and respective state tourism boards.
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: 12, color: '#3A2A1A', fontFamily: 'Inter, sans-serif' }}>
          <span>© {new Date().getFullYear()} Explore India. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Made with <Heart size={12} style={{ color: '#8B1A1A' }} fill="#8B1A1A" /> for wanderers of India
          </span>
        </div>
      </div>
    </footer>
  );
}
