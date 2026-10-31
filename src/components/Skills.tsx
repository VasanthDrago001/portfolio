import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Server, Database, Cpu, GitBranch, Wrench } from 'lucide-react';

const skillCategories = [
  { title: 'Programming Languages', icon: Code2, skills: ['PHP', 'Python', 'JavaScript'] },
  { title: 'Frontend', icon: Monitor, skills: ['React.js', 'HTML5', 'CSS3'] },
  { title: 'Backend & APIs', icon: Server, skills: ['REST APIs', 'Flask', 'API Integration', 'Backend Development'] },
  { title: 'Database', icon: Database, skills: ['MySQL'] },
  { title: 'AI Integration', icon: Cpu, skills: ['OpenAI API', 'AI-Powered Application Features'] },
  { title: 'Tools & Version Control', icon: GitBranch, skills: ['Git', 'SVN'] },
  { title: 'Core Expertise', icon: Wrench, skills: ['Full-Stack Development', 'SaaS Application Development', 'Production Debugging', 'Root Cause Analysis', 'Playwright', 'Selenium'] },
];

export const Skills: React.FC = () => (
  <section id="skills" className="py-24 relative overflow-hidden">
    <div className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full bg-neon-cyan/5 blur-[100px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block">
          Skills & Expertise
          <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full" />
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map(({ title, icon: Icon, skills }, index) => (
          <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} className="glass rounded-2xl p-6 border border-dark-border/40">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-slate-900/40 border border-dark-border/40"><Icon className="w-5 h-5 text-neon-cyan" /></div>
              <h3 className="text-md font-bold text-slate-800 dark:text-white">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-900/40 border border-dark-border/40 text-xs font-mono text-slate-600 dark:text-slate-300">{skill}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
