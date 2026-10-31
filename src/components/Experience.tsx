import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Award, CheckCircle } from 'lucide-react';

const responsibilities = [
  'Integrated the OpenAI API with Python to deliver AI-powered lead scoring and follow-up recommendations, reducing manual CRM effort by approximately 30%.',
  'Built and maintained Playwright and Selenium (Python) end-to-end tests covering 150+ scenarios, reducing manual QA effort from approximately one day to four hours per release cycle.',
  'Delivered full-stack features for a production, multi-client SaaS CRM using PHP, Python, and React.js, from requirement analysis through testing and production deployment.',
  'Investigated production issues through code analysis and log review, including PHP 7.3 and PHP 8.3 compatibility issues.',
  'Worked directly with customers on change requests: gathered requirements, analyzed application flows, implemented solutions, conducted demos, and supported production delivery.'
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block"
          >
            Experience
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" />
          </motion.h2>
        </div>

        {/* Experience Spotlight Card */}
        <div className="relative">
          {/* Decorative vertical connection line */}
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent -translate-x-1/2 hidden md:block" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="glass interactive-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-dark-border/40 max-w-4xl mx-auto glow-purple"
          >
            {/* Ambient Background Glow inside the card */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#7f00ff]/10 dark:bg-[#7f00ff]/5 blur-3xl pointer-events-none" />
            
            {/* Card Content Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-border/30">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-neon-purple/10 rounded-2xl border border-neon-purple/20">
                    <Briefcase className="w-6 h-6 text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                      Infiniti Software Solutions
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
                        <span>Thousand Lights, Chennai</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#ff007f]/20 bg-[#ff007f]/5 text-[#ff007f] text-xs font-mono font-semibold self-start md:self-center">
                <Calendar className="w-3.5 h-3.5" />
                <span>July 2023 – Present</span>
              </div>
            </div>

            {/* Grid for Responsibilities & Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              {/* Responsibilities List */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-md font-bold uppercase tracking-wider text-neon-cyan font-mono mb-4 flex items-center space-x-2">
                  <span>Key Responsibilities</span>
                </h4>
                <ul className="space-y-3">
                  {responsibilities.map((resp, i) => (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      key={i}
                      className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      <CheckCircle className="w-4 h-4 text-neon-purple mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Achievements Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/40 dark:bg-slate-900/20 border border-dark-border/40 relative">
                  <h4 className="text-md font-bold uppercase tracking-wider text-[#ff007f] font-mono mb-4 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#ff007f]" />
                    <span>Achievements & Impact</span>
                  </h4>
                  <div className="space-y-4">
                    {[
                      'Approximately 30% less manual CRM effort through AI-powered features.',
                      '150+ automated test scenarios; manual QA reduced from about one day to four hours per release cycle.'
                    ].map((ach, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-950/40 dark:bg-slate-950/20 border border-slate-900/60"
                      >
                        <p className="text-xs text-[#ff007f] font-mono tracking-wider">KPI IMPACT</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">
                          {ach}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
