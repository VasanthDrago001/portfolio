import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-dark-border/20 py-8 text-center text-sm text-slate-500 dark:text-slate-400 glass mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          &copy; {new Date().getFullYear()} Vasanth V. All rights reserved.
        </div>
        <div className="font-mono text-xs text-slate-400">
          Designed & Developed with <span className="text-[#ff007f] animate-pulse">♥</span> by Vasanth V
        </div>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full glass text-slate-300 hover:text-white hover:border-[#00f2fe] glow-cyan transition-all duration-300 z-30"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-neon-cyan" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
