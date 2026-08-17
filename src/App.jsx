import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetail from './pages/DestinationDetail';
import About from './pages/About';

/* ── Page transition variants ───────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.25,
  ease: [0.25, 0.46, 0.45, 0.94],
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

function NotFound() {
  return (
    <PageWrapper>
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: '100vh', background: '#FAF7F2' }}
      >
        <p className="font-serif text-7xl font-bold mb-4" style={{ color: '#E8E0D5' }}>
          404
        </p>
        <h1 className="font-serif text-3xl font-semibold mb-3" style={{ color: '#1C1C1C' }}>
          Page not found
        </h1>
        <p className="mb-8 text-sm" style={{ color: '#7A7265' }}>
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-full text-white text-sm font-medium"
          style={{ background: 'linear-gradient(135deg, #D4880A, #8B1A1A)' }}
        >
          Go Home
        </a>
      </div>
    </PageWrapper>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
          <Route path="/destination/:slug" element={<PageWrapper><DestinationDetail /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
