import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const educationData = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'Jaya College of Arts and Science',
    location: 'Tiruninravur, Chennai',
    period: '2021 – 2023',
    gpa: 'CGPA: 8.14 / 10',
    glowClass: 'glow-cyan',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Jaya College of Arts and Science',
    location: 'Tiruninravur, Chennai',
    period: '2018 – 2021',
    gpa: 'CGPA: 7.80 / 10',
    glowClass: 'glow-purple',
  },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block"
          >
            Education
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
          </motion.h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l border-dark-border/40 ml-4 md:ml-0 md:border-l-0 flex flex-col md:items-center">
          {/* Vertical central divider line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent -translate-x-1/2 hidden md:block" />

          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              {/* Timeline Center Bullet Pin */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#05050a] border border-neon-cyan md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_8px_rgba(0,242,254,0.6)]">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              </div>

              {/* Card Container */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, type: 'spring', bounce: 0.2 }}
                className={`glass interactive-card rounded-2xl p-6 sm:p-8 w-full md:w-[45%] ml-8 md:ml-0 ${edu.glowClass}`}
              >
                {/* School title */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="p-2.5 bg-slate-900/40 rounded-xl border border-dark-border/40">
                    <GraduationCap className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-[#ff007f] font-semibold bg-[#ff007f]/5 border border-[#ff007f]/20 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white leading-tight">
                  {edu.degree}
                </h3>
                <h4 className="text-sm font-semibold text-slate-650 dark:text-slate-350 mt-2">
                  {edu.school}
                </h4>

                <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-neon-purple" />
                    <span>{edu.location}</span>
                  </span>
                </div>

                {/* Score badge */}
                <div className="inline-flex items-center space-x-2 mt-5 p-2 rounded-xl bg-slate-900/60 dark:bg-slate-900/20 border border-dark-border/40">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400">{edu.gpa}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
