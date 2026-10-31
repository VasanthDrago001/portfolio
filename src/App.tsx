import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Scroll Progress setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#7f00ff] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Loading Screen Preloader */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Custom Follow Cursor */}
      {!loading && <CustomCursor />}

      {/* Interactive Canvas Grid */}
      <ParticleBackground theme={theme} />

      {/* Navbar Header */}
      {!loading && <Navbar theme={theme} toggleTheme={toggleTheme} />}

      {/* Sections Assemblies */}
      {!loading && (
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Projects />
          <Contact />
        </main>
      )}

      {/* Footer Credits Layout */}
      {!loading && <Footer />}
    </>
  );
}

export default App;
