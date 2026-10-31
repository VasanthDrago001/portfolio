import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Zap, Clock } from 'lucide-react';

const metrics = [
  {
    icon: <Calendar className="w-5 h-5 text-neon-cyan" />,
    value: '3+ Years',
    label: 'Professional Experience',
    glowClass: 'glow-cyan',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-neon-pink" />,
    value: '150+',
    label: 'Automated End-to-End Test Scenarios',
    glowClass: 'glow-pink',
  },
  {
    icon: <Zap className="w-5 h-5 text-neon-purple" />,
    value: '~30%',
    label: 'Less Manual CRM Effort',
    glowClass: 'glow-purple',
  },
  {
    icon: <Clock className="w-5 h-5 text-[#39ff14]" />,
    value: '~1d to 4h',
    label: 'QA Effort per Release Cycle',
    glowClass: 'glow-cyan',
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block"
          >
            About Me
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full" />
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Biography Text (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-350"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
              Full-Stack Software Developer
            </h3>
            <p className="leading-relaxed">
              I am a Full-Stack Software Developer with 3+ years of experience building and supporting production SaaS applications using PHP, Python, and React.js.
            </p>
            <p className="leading-relaxed">
              My work spans full-stack feature delivery, REST API integration, production debugging, root-cause analysis, and end-to-end testing with Playwright and Selenium.
            </p>
            <p className="leading-relaxed">
              I integrated OpenAI-powered lead scoring and follow-up recommendations into a CRM, reducing manual effort by approximately 30%. I also built test automation covering 150+ scenarios.
            </p>
            <p className="leading-relaxed font-semibold text-slate-700 dark:text-slate-200">
              I work across the full feature lifecycle, from understanding customer requirements and implementing changes to testing, production deployment, demos, and support.
            </p>
          </motion.div>

          {/* Key Metrics Cards (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`glass interactive-card p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-40 ${metric.glowClass} hover:border-slate-800/40`}
              >
                {/* Accent line on top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple opacity-30" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-850 border border-dark-border/40">
                    {metric.icon}
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-750 dark:from-white dark:to-slate-200">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-snug">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
