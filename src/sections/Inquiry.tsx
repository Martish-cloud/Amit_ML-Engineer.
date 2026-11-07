import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { personalInfo } from '../data/profile';

const inquiryTypes = [
  'AI / GenAI Development',
  'Machine Learning & NLP',
  'AI Workflow Automation / n8n',
  'Website Development',
  'Web App Development',
  'Mobile App Development',
  'Excel / Data Analysis',
  'Power BI Dashboard',
  'ERP / Operations Systems',
  'Other',
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  budget: string;
  message: string;
  preferredContact: string;
  botcheck: string; // honeypot
}

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  inquiryType: '',
  budget: '',
  message: '',
  preferredContact: '',
  botcheck: '',
};

export const Inquiry: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.inquiryType) newErrors.inquiryType = 'Please select a service / inquiry type.';
    if (!form.budget) newErrors.budget = 'Please select a budget range.';
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Please provide project details (minimum 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.botcheck) return; // honeypot triggered
    if (!validate()) return;

    setFormState('loading');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.warn('VITE_WEB3FORMS_ACCESS_KEY is not configured in environment.');
      setFormState('error');
      return;
    }

    try {
      const emailBody = `
--------------------------------
NEW PORTFOLIO PROJECT INQUIRY
--------------------------------

Full Name:
${form.name.trim()}

Email:
${form.email.trim()}

Company / Organization:
${form.company.trim() || 'Not specified'}

Service:
${form.inquiryType}

Budget:
${form.budget}

Preferred Contact Method:
${form.preferredContact || 'Not specified'}

Project Details:
${form.message.trim()}

--------------------------------
Submitted via:
Mr. Amit Haldar Portfolio
--------------------------------
`.trim();

      const payload = {
        access_key: accessKey,
        name: form.name.trim(),
        email: form.email.trim(),
        replyto: form.email.trim(),
        from_name: form.name.trim(),
        subject: `New Project Inquiry — ${form.inquiryType} — ${form.budget}`,
        message: emailBody,
        botcheck: form.botcheck,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');
        setForm(initialForm);
      } else {
        console.error('Web3Forms submission error:', result);
        setFormState('error');
      }
    } catch (err) {
      console.error('Submission request failed:', err);
      setFormState('error');
    }
  };

  return (
    <section id="inquiry" className="inquiry-section section">
      <div className="section__head">
        <span className="tag">08 — Project Inquiry</span>
        <span className="tag tag--dim">共同開発</span>
      </div>

      <div className="inquiry__grid">
        {/* Left Side: Pitch & Information */}
        <div>
          <h2 className="display text-4xl sm:text-6xl text-white mb-6">
            Let's build something <em className="serif">intelligent together.</em>
          </h2>
          <p className="about__note leading-relaxed mb-8">
            I partner with founders, enterprise teams, and innovative organizations to build production
            Generative AI applications, fine-tune models, engineer prompt architectures, and automate
            complex data workflows.
          </p>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-8">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-3">
              Direct Contact Channels
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs text-slate-300">
              <div>Email: <a href={`mailto:${personalInfo.email}`} className="text-orange-400 hover:underline">{personalInfo.email}</a></div>
              <div>Phone: <a href={`tel:${personalInfo.phoneRaw}`} className="text-orange-400 hover:underline">{personalInfo.phone}</a></div>
              <div>Location: <span className="text-slate-400">{personalInfo.location}</span></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="tag py-3 px-6 rounded-full border border-white/20 hover:border-orange-400 text-xs transition-colors"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
          {formState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="display text-2xl sm:text-3xl text-white mb-3">
                Inquiry Received
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 font-sans">
                Thank you for reaching out. I have received your project details and will review them promptly. Expect a direct response within 24 hours.
              </p>
              <button
                onClick={() => setFormState('idle')}
                className="btn btn--orange text-xs py-3 px-8"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Honeypot field for bot protection */}
              <input
                type="text"
                name="botcheck"
                value={form.botcheck}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="inquiry__label">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="inquiry__input"
                  />
                  {errors.name && <p className="inquiry__error">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="inquiry__label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="inquiry__input"
                  />
                  {errors.email && <p className="inquiry__error">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="inquiry__label">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="inquiry__input"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="inquiry__label">
                    Service / Inquiry Type *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className="inquiry__input"
                  >
                    <option value="">Select Service Area</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryType && <p className="inquiry__error">{errors.inquiryType}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="budget" className="inquiry__label">
                    Project Budget *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="inquiry__input"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="<$1k / INR <80k">Entry Level (&lt; $1,000 / &lt; ₹80,000)</option>
                    <option value="$1k–$3k / INR 80k–2.5L">$1,000 – $3,000 / ₹80,000 – ₹2.5 Lakh</option>
                    <option value="$3k–$10k / INR 2.5L–8L">$3,000 – $10,000 / ₹2.5 Lakh – ₹8 Lakh</option>
                    <option value="$10k+ / INR 8L+">Enterprise ($10,000+ / ₹8 Lakh+)</option>
                    <option value="Full-time Hire">Full-time Engineering Role</option>
                  </select>
                  {errors.budget && <p className="inquiry__error">{errors.budget}</p>}
                </div>

                <div>
                  <label htmlFor="preferredContact" className="inquiry__label">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={handleChange}
                    className="inquiry__input"
                  >
                    <option value="Email">Email</option>
                    <option value="LinkedIn">LinkedIn Message</option>
                    <option value="Phone / WhatsApp">Phone / WhatsApp</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="inquiry__label">
                  Project Details * (minimum 10 characters)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your project goals, technical requirements, or role specifications..."
                  className="inquiry__input resize-none"
                />
                {errors.message && <p className="inquiry__error">{errors.message}</p>}
              </div>

              {formState === 'error' && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-xs font-mono text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Unable to submit. Please check your network or email directly at {personalInfo.email}.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn btn--orange w-full justify-center py-4 text-sm mt-2 cursor-pointer"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Transmitting Inquiry…</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
export default Inquiry;

