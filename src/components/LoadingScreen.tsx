import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds loading screen
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05050a] text-white select-none"
    >
      <div className="relative flex flex-col items-center max-w-xs w-full px-4">
        {/* Glow Ring */}
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-neon-cyan via-neon-purple to-neon-pink opacity-20 blur-2xl animate-pulse-slow" />

        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 text-4xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple font-mono"
        >
          &lt;MySelf /&gt;
        </motion.div>

        {/* Counter */}
        <div className="text-6xl font-extrabold font-mono tracking-tight text-white mb-2">
          {progress}%
        </div>

        {/* Loading Bar */}
        <div className="w-full h-[3px] bg-slate-800/80 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitles */}
        <div className="h-6 overflow-hidden text-center text-xs text-slate-400 font-mono">
          <AnimatePresence mode="wait">
            {progress < 25 && (
              <motion.span
                key="1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Initializing developer environment...
              </motion.span>
            )}
            {progress >= 25 && progress < 55 && (
              <motion.span
                key="2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Compiling systems & integrations...
              </motion.span>
            )}
            {progress >= 55 && progress < 85 && (
              <motion.span
                key="3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Configuring automated engines...
              </motion.span>
            )}
            {progress >= 85 && (
              <motion.span
                key="4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Ready. Welcome to Vasanth V.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
