import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, TestTube2 } from 'lucide-react';

const highlights = [
  {
    title: 'AI-Powered CRM Features',
    description: 'Integrated the OpenAI API with Python to add lead scoring and follow-up recommendations to a production SaaS CRM.',
    impact: 'Approximately 30% less manual CRM effort',
    technologies: ['Python', 'OpenAI API', 'CRM', 'REST APIs'],
    icon: BrainCircuit,
  },
  {
    title: 'End-to-End Test Automation',
    description: 'Built and maintained an end-to-end test suite for the CRM using Playwright and Selenium with Python.',
    impact: '150+ scenarios; QA reduced from about one day to four hours per release cycle',
    technologies: ['Playwright', 'Selenium', 'Python', 'Testing'],
    icon: TestTube2,
  },
];

export const Projects: React.FC = () => (
  <section id="projects" className="py-24 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-14">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block">
          Work Highlights
          <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full" />
        </motion.h2>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Selected work delivered as part of my role at Infiniti Software Solutions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map(({ title, description, impact, technologies, icon: Icon }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="glass rounded-2xl p-7 border border-dark-border/40">
            <div className="p-3 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 w-fit mb-5"><Icon className="w-6 h-6 text-neon-cyan" /></div>
            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
            <div className="mt-5 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10 p-4">
              <p className="text-[10px] font-mono font-bold tracking-wider text-neon-cyan">RESULT</p>
              <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{impact}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {technologies.map((technology) => <span key={technology} className="px-2.5 py-1 rounded-md bg-slate-900/40 border border-dark-border/30 text-[10px] font-mono text-slate-500 dark:text-slate-300">{technology}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
      <div className="text-center mt-10">
        <a href="https://github.com/VasanthDrago001/Vasanth_Projects" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:underline">
          Browse my projects on GitHub <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);
