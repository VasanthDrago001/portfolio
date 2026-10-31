import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Star, GitCommit, AlertCircle, Terminal, RefreshCw } from 'lucide-react';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

interface RepoStat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const repoStats: RepoStat[] = [
  { label: 'Total Commits', value: '1,482', icon: <GitCommit className="w-4 h-4 text-neon-cyan" /> },
  { label: 'GitHub Stars', value: '48', icon: <Star className="w-4 h-4 text-amber-400" /> },
  { label: 'Pull Requests', value: '124', icon: <GitPullRequest className="w-4 h-4 text-neon-purple" /> },
  { label: 'Issues Closed', value: '98', icon: <AlertCircle className="w-4 h-4 text-[#ff007f]" /> },
];

const languages = [
  { name: 'TypeScript & React', percentage: 42, color: 'bg-neon-cyan', widthClass: 'w-[42%]' },
  { name: 'PHP & Laravel', percentage: 28, color: 'bg-[#7f00ff]', widthClass: 'w-[28%]' },
  { name: 'Python (FastAPI/Flask)', percentage: 20, color: 'bg-amber-400', widthClass: 'w-[20%]' },
  { name: 'HTML5 & CSS3', percentage: 10, color: 'bg-[#ff007f]', widthClass: 'w-[10%]' },
];

const activityLog = [
  { repo: 'vasanth-v/playwright-ai-suite', action: 'Pushed 4 commits to main', time: '2 hours ago' },
  { repo: 'vasanth-v/intellicrm-backend', action: 'Opened Pull Request #24: AI Lead Scoring Integration', time: '1 day ago' },
  { repo: 'vasanth-v/react-glass-portfolio', action: 'Created release v1.0.0', time: '3 days ago' },
  { repo: 'vasanth-v/fastapi-prompt-service', action: 'Resolved Issue #9: Async token validation error', time: '4 days ago' },
];

export const GitHubStats: React.FC = () => {
  const [tooltipText, setTooltipText] = useState<string>('Hover over tiles for activity details');

  // Generate mock contribution calendar tiles (7 rows x 38 columns = 266 days)
  const rows = 7;
  const cols = 38;
  const totalTiles = rows * cols;
  
  // Seed contributions values: 0 = none, 1 = low, 2 = medium, 3 = high, 4 = active
  const seedTiles = () => {
    const arr = [];
    for (let i = 0; i < totalTiles; i++) {
      // Create patterns: more active in mid-week, some holidays
      const rowIdx = i % 7;
      const colIdx = Math.floor(i / 7);
      
      let level = 0;
      const rand = Math.random();
      
      if (rowIdx === 0 || rowIdx === 6) {
        level = rand > 0.85 ? (rand > 0.95 ? 2 : 1) : 0; // weekends lower
      } else {
        level = rand > 0.4 ? (rand > 0.85 ? (rand > 0.96 ? 4 : 3) : 2) : 1; // weekdays higher
      }
      arr.push({ id: i, level, date: colIdx, day: rowIdx });
    }
    return arr;
  };

  const [tiles] = useState(seedTiles());

  const getTileColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-200 dark:bg-[#121324]';
      case 1: return 'bg-[#00f2fe]/20 text-[#00f2fe]';
      case 2: return 'bg-[#00f2fe]/40 text-[#00f2fe]';
      case 3: return 'bg-[#00f2fe]/70 text-[#00f2fe]';
      case 4: return 'bg-[#00f2fe] text-slate-950';
      default: return 'bg-slate-200 dark:bg-[#121324]';
    }
  };

  const handleTileHover = (level: number, dateOffset: number, dayIdx: number) => {
    const commitCount = level === 0 ? 'No' : level * 2 + Math.floor(Math.random() * 2);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setTooltipText(`${commitCount} contributions on ${dayNames[dayIdx]}, Week ${dateOffset + 1}`);
  };

  return (
    <section id="github-stats" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block animate-glow-text"
          >
            GitHub Activity Dashboard
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full" />
          </motion.h2>
        </div>

        {/* Dashboard Frame Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Heatmap Calendar Grid (Left Column - 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-6 sm:p-8 rounded-3xl border border-dark-border/40 relative glow-cyan"
            >
              {/* Header profile link */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-dark-border/30 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-900/40 rounded-full border border-dark-border/40">
                    <GithubIcon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-none">
                      vasanth-v
                    </h3>
                    <a
                      href="https://github.com/vasanth-v"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neon-cyan hover:underline font-mono mt-1 inline-block"
                    >
                      github.com/vasanth-v
                    </a>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 bg-slate-900/60 dark:bg-slate-900/30 border border-dark-border/40 px-3 py-1.5 rounded-full">
                  <RefreshCw className="w-3.5 h-3.5 text-neon-cyan animate-spin-slow" />
                  <span>Real-time Sync Active</span>
                </div>
              </div>

              {/* Heatmap Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">{tooltipText}</span>
                  <span className="opacity-75">342 contributions last year</span>
                </div>

                {/* Heatmap Grid Wrapper */}
                <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  <div className="grid grid-flow-col gap-1 w-max">
                    {tiles.map((tile) => (
                      <div
                        key={tile.id}
                        onMouseEnter={() => handleTileHover(tile.level, tile.date, tile.day)}
                        className={`w-2.5 h-2.5 rounded-[2px] transition-colors duration-250 ${getTileColor(tile.level)} cursor-pointer hover:ring-1 hover:ring-[#ff007f]`}
                      />
                    ))}
                  </div>
                </div>

                {/* Heatmap Legend */}
                <div className="flex justify-end items-center space-x-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-dark-border/10">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-slate-200 dark:bg-[#121324]" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00f2fe]/20" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00f2fe]/40" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00f2fe]/70" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00f2fe]" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            {/* Repos stats card blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {repoStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="glass p-4 rounded-xl border border-dark-border/30 flex items-center space-x-3 hover:border-slate-800/40"
                >
                  <div className="p-2 bg-slate-900/40 rounded-lg border border-dark-border/40">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-800 dark:text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-450 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages & Activity Feeds (Right Column - 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Language card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-6 rounded-3xl border border-dark-border/40 glow-purple"
            >
              <h3 className="text-md font-bold text-slate-800 dark:text-white mb-6 font-mono tracking-wide">
                /most-used-languages
              </h3>
              
              <div className="space-y-4">
                {languages.map((lang, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{lang.name}</span>
                      <span>{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className={`h-full ${lang.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Simulated Live Terminal Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-3xl bg-[#030308] border border-dark-border/50 font-mono text-xs glow-pink text-slate-400"
            >
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 border-b border-dark-border/40 pb-3 mb-4">
                <Terminal className="w-3.5 h-3.5 text-neon-pink" />
                <span>vasanth-v@git-activity-feed:~</span>
              </div>
              <div className="space-y-3.5">
                {activityLog.map((act, i) => (
                  <div key={i} className="space-y-0.5 border-l border-dark-border/40 pl-2">
                    <div className="text-neon-cyan text-[10px] font-semibold">
                      {act.repo}
                    </div>
                    <div className="text-slate-300">
                      &gt; {act.action}
                    </div>
                    <div className="text-[9px] text-slate-500">
                      {act.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
