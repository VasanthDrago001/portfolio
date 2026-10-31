import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight relative inline-block"
          >
            Certifications
            <span className="absolute bottom-[-6px] left-0 w-1/2 h-0.5 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full" />
          </motion.h2>
        </div>

        {/* Certification Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass interactive-card rounded-2xl p-6 sm:p-8 border border-dark-border/40 relative overflow-hidden max-w-2xl mx-auto glow-pink hover:border-[#ff007f]/40"
        >
          {/* Neon background circle */}
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-neon-pink/10 dark:bg-neon-pink/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
            {/* Icon Block */}
            <div className="p-4 bg-gradient-to-tr from-[#ff007f]/10 to-neon-purple/10 rounded-2xl border border-neon-pink/20 flex-shrink-0">
              <Award className="w-10 h-10 text-neon-pink animate-pulse" />
            </div>

            {/* Certification Details */}
            <div className="flex-grow space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#ff007f] font-semibold bg-[#ff007f]/5 border border-[#ff007f]/20 px-2.5 py-1 rounded-full w-max">
                <span>Verified Credential</span>
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white leading-tight">
                Playwright + AI Certification
              </h3>

              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                Advanced certification validation for combining E2E web automation with Artificial Intelligence logic. Covers Playwright pipelines, automated regression diagnostics, OpenAI API CRM actions, and test scripting enhancements.
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900/40 dark:bg-slate-900/20 text-neon-cyan border border-dark-border/50 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Playwright</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900/40 dark:bg-slate-900/20 text-neon-purple border border-dark-border/50 flex items-center space-x-1">
                  <Cpu className="w-3 h-3" />
                  <span>AI Automation</span>
                </span>
              </div>

              {/* Credentials Link */}
              <div className="pt-2">
                <a
                  href="https://github.com/vasanth-v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-mono text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  <span>Verify Credential</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
