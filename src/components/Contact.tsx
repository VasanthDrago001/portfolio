import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_itafvgy';
const EMAILJS_TEMPLATE_ID = 'template_ntmniie';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('loading');
    setFormError('');
    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error('EmailJS setup is incomplete: add the public key.');
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        { publicKey }
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      const emailJsError = error as { status?: number; text?: string };
      const message = error instanceof Error
        ? error.message
        : emailJsError?.text || '';
      setFormError(
        message.includes('EmailJS setup is incomplete')
          ? 'Email delivery is still being configured. Please try again later.'
          : message === 'Failed to fetch'
            ? 'Could not connect to the email service. Check your internet connection and try again.'
            : message
              ? `Email service error${emailJsError?.status ? ` (${emailJsError.status})` : ''}: ${message}`
              : 'Message could not be sent. Please try again or email me directly.'
      );
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow ambient background element */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-neon-pink/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight relative inline-block animate-glow-text"
          >
            Contact Me
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full" />
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Info Panels (Left Column - 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white font-mono tracking-wide mb-6">
              /let-us-connect
            </h3>

            {/* Email Copier */}
            <div className="glass p-5 rounded-2xl border border-dark-border/30 hover:border-slate-800/40 relative flex justify-between items-center group">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
                  <Mail className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400">EMAIL</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">
                    vasanthdrago001@gmail.com
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('vasanthdrago001@gmail.com', 'email')}
                className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/20 hover:bg-slate-900/80 border border-dark-border/40 hover:text-[#00f2fe] transition-colors relative"
                aria-label="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Copier */}
            <div className="glass p-5 rounded-2xl border border-dark-border/30 hover:border-slate-800/40 relative flex justify-between items-center group">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-neon-purple/10 rounded-xl border border-neon-purple/20">
                  <Phone className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400">PHONE</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">
                    +91 90034 43180
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+91 90034 43180', 'phone')}
                className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/20 hover:bg-slate-900/80 border border-dark-border/40 hover:text-[#7f00ff] transition-colors relative"
                aria-label="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location */}
            <div className="glass p-5 rounded-2xl border border-dark-border/30 hover:border-slate-800/40 relative flex items-center space-x-3.5">
              <div className="p-3 bg-[#ff007f]/10 rounded-xl border border-[#ff007f]/20">
                <MapPin className="w-5 h-5 text-neon-pink" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400">LOCATION</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="pt-6 border-t border-dark-border/20">
              <p className="text-xs font-mono text-slate-500 mb-4">SOCIAL NETWORK</p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/VasanthDrago001/Vasanth_Projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl glass border border-dark-border/40 hover:border-neon-cyan hover:text-neon-cyan text-slate-600 dark:text-slate-300 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vasanth-v-311181396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl glass border border-dark-border/40 hover:border-neon-purple hover:text-neon-purple text-slate-600 dark:text-slate-300 hover:shadow-[0_0_15px_rgba(127,0,255,0.3)] transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Form container (Right Column - 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass rounded-3xl p-8 border border-dark-border/40 glow-purple relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row for Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-slate-500 dark:text-slate-300 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-200/50 dark:bg-slate-900/30 border text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors ${
                      errors.name ? 'border-[#ff007f]' : 'border-dark-border/40'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-[10px] font-mono text-[#ff007f]">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-slate-500 dark:text-slate-300 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-200/50 dark:bg-slate-900/30 border text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors ${
                      errors.email ? 'border-[#ff007f]' : 'border-dark-border/40'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-[10px] font-mono text-[#ff007f]">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono text-slate-500 dark:text-slate-300 font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-200/50 dark:bg-slate-900/30 border text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors ${
                    errors.subject ? 'border-[#ff007f]' : 'border-dark-border/40'
                  }`}
                  placeholder="Inquiry for project collaboration"
                />
                {errors.subject && <p className="text-[10px] font-mono text-[#ff007f]">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-slate-500 dark:text-slate-300 font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-200/50 dark:bg-slate-900/30 border text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors resize-none ${
                    errors.message ? 'border-[#ff007f]' : 'border-dark-border/40'
                  }`}
                  placeholder="Hey Vasanth, let's build something awesome together..."
                />
                {errors.message && <p className="text-[10px] font-mono text-[#ff007f]">{errors.message}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white text-sm font-bold flex items-center justify-center space-x-2 hover:shadow-[0_0_20px_rgba(127,0,255,0.4)] disabled:opacity-50 transition-all duration-300"
              >
                {formStatus === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Success notifications */}
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-xs font-mono text-emerald-500"
                  >
                    Message sent successfully! I will get back to you shortly.
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center text-xs font-mono text-rose-500"
                    role="alert"
                  >
                    {formError}
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
