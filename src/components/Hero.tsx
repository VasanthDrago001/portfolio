import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowRight, Volume2, VolumeX } from 'lucide-react';

const words = [
  'PHP Developer',
  'Python Developer',
  'React Developer',
  'Playwright & Selenium Automation',
  'AI Integration Developer'
];

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadResumePdf = async () => {
    setShowResumeOptions(false);
    setIsPreparingPdf(true);

    let renderTarget: HTMLDivElement | undefined;
    let preview: HTMLDivElement | undefined;

    try {
      const existingPdf = await fetch('/Vasanth_V_Resume.pdf');
      if (existingPdf.ok) {
        const pdfBlob = await existingPdf.blob();
        if ((await pdfBlob.slice(0, 5).text()) === '%PDF-') {
          saveBlob(pdfBlob, 'Vasanth_V_Resume.pdf');
          return;
        }
      }

      const response = await fetch('/Vasanth_V_Resume.docx');
      if (!response.ok) throw new Error('Resume document could not be loaded.');

      renderTarget = document.createElement('div');
      Object.assign(renderTarget.style, {
        position: 'fixed',
        inset: '0',
        overflow: 'auto',
        zIndex: '9999',
        background: '#eef1f5',
        padding: '20px',
      });
      const status = document.createElement('p');
      status.textContent = 'Preparing your PDF…';
      Object.assign(status.style, { textAlign: 'center', font: '600 16px Arial', color: '#172033' });
      preview = document.createElement('div');
      Object.assign(preview.style, { width: '210mm', margin: '0 auto', background: '#fff', color: '#000' });
      renderTarget.append(status, preview);
      document.body.appendChild(renderTarget);

      const { renderAsync } = await import('docx-preview');
      const html2pdf = (await import('html2pdf.js')).default;
      await renderAsync(await response.arrayBuffer(), preview, preview, {
        breakPages: true,
        ignoreLastRenderedPageBreak: false,
        useBase64URL: true,
      });

      await html2pdf()
        .set({
          margin: 0,
          filename: 'Vasanth_V_Resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(preview)
        .save();
    } catch (error) {
      console.error('Resume PDF conversion failed:', error);
      window.alert('Could not create the resume PDF. Please try again.');
    } finally {
      renderTarget?.remove();
      setIsPreparingPdf(false);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const activeWord = words[wordIndex];
    let timer: number;

    const tick = () => {
      if (!isDeleting) {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        if (currentText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 2200);
          return;
        }
      } else {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }

      const speed = isDeleting ? 35 : 85;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-start relative overflow-hidden pt-20 bg-[#05050a]">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
      >
        <source src="/intro_video.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05050a]/95 via-[#05050a]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05050a]/20 via-transparent to-[#05050a]/90 z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#00f2fe]/5 blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#7f00ff]/5 blur-3xl pointer-events-none z-10" />

      {/* Content wrapper left-aligned, matching px-6 padding of Navbar */}
      <div className="max-w-7xl mx-auto px-6 w-full text-left relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          {/* Portfolio Label */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest text-neon-cyan uppercase">
              <span>Portfolio · 2026</span>
              <span className="text-slate-700 font-bold">•</span>
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Hire</span>
              </span>
            </div>
          </div>

          {/* Title - Enormous uppercase bold text */}
          <h1 className="text-6xl sm:text-[100px] md:text-[100px] lg:text-[80px] font-black tracking-tighter text-white leading-[0.85] uppercase font-sans">
            VASANTH &nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple font-sans font-black">
              V
            </span>
          </h1>

          {/* Monospace Subtitle */}
          <div className="text-[10px] sm:text-xs font-mono tracking-wider text-slate-350 uppercase flex flex-wrap gap-2 items-center font-semibold">
            <span>Full-Stack Software Developer</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-700">•</span>
          </div>

          {/* Typing effect */}
          <div className="h-6 text-sm sm:text-base font-mono text-[#ff007f] font-semibold">
            <span>&gt; {currentText}</span><span className="cursor-blink" />
          </div>

          {/* Text intro quote */}
          <p className="text-slate-450 max-w-md text-sm sm:text-base leading-relaxed font-sans">
            "3+ years building and supporting production SaaS applications with PHP, Python, and React.js."
          </p>

          {/* CTA Group left-aligned */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#experience"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-slate-950 text-xs font-bold hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300 flex items-center space-x-1.5 group"
            >
              <span>View Experience</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-full glass text-slate-200 text-xs font-semibold hover:border-[#7f00ff]/50 transition-all duration-300 flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-neon-purple" />
              <span>Contact Me</span>
            </a>

            <button
              type="button"
              onClick={() => setShowResumeOptions(true)}
              className="px-6 py-3.5 rounded-full border border-dark-border/40 hover:border-[#ff007f] bg-transparent text-slate-400 hover:text-white text-xs font-semibold transition-all duration-300 flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#ff007f]" />
              <span>Download Resume</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator (Bottom-Left) */}
      <div className="absolute bottom-8 left-6 flex flex-col items-start space-y-3 text-slate-500 z-20">
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-75" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
      </div>

      {/* Audio Mute/Unmute floating toggle (Bottom-Right) */}
      <div className="absolute bottom-8 right-6 z-30">
        <button
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/50 bg-[#0c0d18]/60 text-slate-350 hover:text-white backdrop-blur-md transition hover:bg-[#0c0d18]/80 hover:scale-105 hover:border-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.15)] font-mono"
          aria-label={isMuted ? "Unmute Background Audio" : "Mute Background Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-neon-cyan animate-pulse" />}
        </button>
      </div>

      {showResumeOptions && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowResumeOptions(false); }}>
          <div className="glass w-full max-w-sm rounded-2xl border border-dark-border/50 p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="resume-download-title">
            <h2 id="resume-download-title" className="text-lg font-bold text-slate-900 dark:text-white">Choose download format</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Select the format for your resume.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href="/Vasanth_V_Resume.docx" download="Vasanth_V_Resume.docx" onClick={() => setShowResumeOptions(false)} className="rounded-xl border border-dark-border/50 px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-neon-cyan hover:text-neon-cyan dark:text-white">DOCX</a>
              <button type="button" onClick={downloadResumePdf} disabled={isPreparingPdf} className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">PDF</button>
            </div>
            <button type="button" onClick={() => setShowResumeOptions(false)} className="mt-4 w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white">Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
};
