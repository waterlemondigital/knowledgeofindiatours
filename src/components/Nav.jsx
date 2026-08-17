import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Compass } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/about', label: 'About' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setSearchOpen(false);
    }
  };

  const textColor = scrolled ? '#1C1C1C' : '#FFFFFF';
  const textMuted = scrolled ? '#6A5F50' : 'rgba(255, 255, 255, 0.8)';
  const dividerBg = scrolled ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.25)';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 18,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 1rem',
        }}
      >
        <motion.div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '7px 12px 7px 16px',
            borderRadius: 9999,
            background: scrolled
              ? 'rgba(255, 255, 255, 0.88)'
              : 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: scrolled
              ? '1px solid rgba(232, 224, 213, 0.95)'
              : '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: scrolled
              ? '0 12px 36px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
              : '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '100%',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              paddingRight: 4,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F4A025, #8B1A1A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(244,160,37,0.4)',
              }}
            >
              <Compass size={14} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 16,
                fontWeight: 700,
                color: textColor,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
                textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.4)',
                transition: 'color 0.3s',
              }}
            >
              Explore <span style={{ color: '#D4880A' }}>India</span>
            </span>
          </Link>

          {/* Vertical Divider */}
          <div
            className="hidden md:block"
            style={{
              width: 1,
              height: 18,
              background: dividerBg,
              transition: 'background 0.3s',
            }}
          />

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: 3 }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  padding: '6px 15px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none',
                  color: isActive ? '#fff' : textMuted,
                  background: isActive
                    ? 'linear-gradient(135deg, #D4880A, #8B1A1A)'
                    : 'transparent',
                  boxShadow: isActive
                    ? '0 2px 10px rgba(212, 136, 10, 0.35)'
                    : 'none',
                  textShadow: isActive || !scrolled ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                  transition: 'all 0.22s ease',
                  letterSpacing: '0.01em',
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Search Toggle / Input (Desktop) */}
          <div className="hidden md:flex" style={{ alignItems: 'center' }}>
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  key="search-form"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onSubmit={handleSearch}
                  style={{ overflow: 'hidden', marginRight: 4 }}
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search…"
                    style={{
                      width: '100%',
                      background: scrolled
                        ? 'rgba(0, 0, 0, 0.06)'
                        : 'rgba(255, 255, 255, 0.2)',
                      border: scrolled
                        ? '1px solid rgba(0, 0, 0, 0.12)'
                        : '1px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: 999,
                      padding: '5px 12px',
                      color: textColor,
                      fontSize: 12.5,
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                    }}
                  />
                </motion.form>
              )}
            </AnimatePresence>

            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: searchOpen
                  ? 'rgba(244,160,37,0.25)'
                  : scrolled
                  ? 'rgba(0, 0, 0, 0.05)'
                  : 'rgba(255, 255, 255, 0.18)',
                border: scrolled
                  ? '1px solid rgba(0, 0, 0, 0.08)'
                  : '1px solid rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: searchOpen ? '#D4880A' : textColor,
                transition: 'all 0.2s',
              }}
            >
              <Search size={13} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: scrolled
                ? 'rgba(0,0,0,0.06)'
                : 'rgba(255,255,255,0.2)',
              border: scrolled
                ? '1px solid rgba(0,0,0,0.1)'
                : '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: textColor,
            }}
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 45,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              key="drawer"
              style={{
                position: 'fixed',
                top: 76,
                left: 16,
                right: 16,
                zIndex: 50,
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(232, 224, 213, 0.95)',
                borderRadius: 24,
                padding: '22px 18px',
                boxShadow: '0 20px 48px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    padding: '12px 16px',
                    borderRadius: 14,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 17,
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#fff' : '#1C1C1C',
                    background: isActive
                      ? 'linear-gradient(135deg, #D4880A, #8B1A1A)'
                      : 'transparent',
                    boxShadow: isActive
                      ? '0 4px 12px rgba(212, 136, 10, 0.3)'
                      : 'none',
                  })}
                >
                  {label}
                </NavLink>
              ))}

              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  setMenuOpen(false);
                }}
                style={{ marginTop: 8 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 999,
                    padding: '9px 15px',
                  }}
                >
                  <Search size={14} color="#7A7265" />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search destinations…"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#1C1C1C',
                      fontSize: 13.5,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  />
                </div>
              </form>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
