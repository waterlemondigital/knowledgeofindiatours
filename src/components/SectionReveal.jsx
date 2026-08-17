import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SectionReveal — wraps children with fade-up scroll-reveal animation.
 * Uses whileInView with once:true so it only fires once.
 * Respects prefers-reduced-motion via CSS.
 *
 * Props:
 *   children      — content to animate
 *   delay         — base delay in seconds (default 0)
 *   staggerChildren — stagger delay between direct children (default 0.07)
 *   className     — wrapper class
 *   as            — tag to render as (default 'div')
 */
export default function SectionReveal({
  children,
  delay = 0,
  staggerChildren = 0.07,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealItem — a single item meant to be used inside SectionReveal.
 * Can also be used standalone with its own whileInView.
 */
export function RevealItem({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
