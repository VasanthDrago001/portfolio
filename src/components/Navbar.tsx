import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'GitHub', href: 'https://github.com/VasanthDrago001/Vasanth_Projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = navItems.map(item => item.href.slice(1));
      let current = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold to detect section scroll entry
          if (rect.top <= 160 && rect.bottom >= 160) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3.5 glass shadow-lg border-b border-dark-border/20' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple font-mono">
          &lt;Portfolio /&gt;
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-[#00f2fe] relative py-1 ${activeSection === item.href.slice(1)
                ? 'text-[#00f2fe] font-semibold'
                : 'text-slate-400 dark:text-slate-300'
                }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:text-[#00f2fe] transition-colors relative group"
            aria-label="Toggle Theme"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 relative z-10" /> : <Moon className="w-4 h-4 text-slate-700 relative z-10" />}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:text-[#00f2fe] transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full glass hover:text-[#00f2fe] transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Links Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass w-full border-t border-slate-800/40 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-[#00f2fe] ${activeSection === item.href.slice(1)
                    ? 'text-[#00f2fe] font-semibold glow-text-cyan'
                    : 'text-slate-400 dark:text-slate-300'
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
