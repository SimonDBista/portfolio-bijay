'use client';

import React, { useState } from 'react';
import { chefData } from '@/data/chefData';
import { Mail, Phone, MapPin, Download, Send, CheckCircle2, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Dining & Masterclass',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Private Dining & Masterclass',
        message: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit your message. Please reach out via email or phone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-36 bg-[#0c0c10] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#c9a96e] mb-3 font-medium">
            Professional Inquiries &amp; Collaborations
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Connect With Chef Bijaya
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-6 mb-4 sm:mb-6" />
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            Available for executive chef engagements, restaurant menu engineering, luxury private dining, and culinary consulting worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Contact Details & CV Download */}
          <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8">
            <div className="bg-[#111116] border border-white/5 p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl text-[#f4efe6] font-normal">
                Direct Contact
              </h3>
              <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed">
                Reach out directly via official communication channels for international placement or consulting.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${chefData.contact.email}`}
                  className="flex items-start space-x-4 p-4 bg-[#16161d] border border-white/5 hover:border-[#c9a96e]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#1e1e28] flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#09090b] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8c887e] block">Email</span>
                    <span className="text-sm text-[#f4efe6] group-hover:text-[#c9a96e] transition-colors break-all">
                      {chefData.contact.email}
                    </span>
                  </div>
                </a>

                {/* Phones */}
                <div className="p-4 bg-[#16161d] border border-white/5 space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-sm bg-[#1e1e28] flex items-center justify-center text-[#c9a96e]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8c887e] block">Phone &bull; WhatsApp</span>
                      <div className="space-y-0.5 mt-0.5">
                        {chefData.contact.phones.map((phone, idx) => (
                          <a
                            key={idx}
                            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                            className="block text-sm text-[#f4efe6] hover:text-[#c9a96e] transition-colors font-mono"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-4 bg-[#16161d] border border-white/5">
                  <div className="w-10 h-10 rounded-sm bg-[#1e1e28] flex items-center justify-center text-[#c9a96e]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8c887e] block">Primary Location</span>
                    <span className="text-sm text-[#f4efe6]">
                      {chefData.contact.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* CV Download CTA */}
              <div className="pt-4 border-t border-white/5">
                <a
                  href="/docs/Bijaya_Ghimire_Executive_Chef_CV.pdf"
                  download
                  className="w-full flex items-center justify-center space-x-3 py-3.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111116] border border-white/5 p-8 md:p-10 shadow-xl">
              <h3 className="font-serif text-2xl text-[#f4efe6] font-normal mb-2">
                Culinary Inquiries &amp; Consultations
              </h3>
              <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed mb-8">
                Please leave your details and event or consulting specifications below.
              </p>

              {formSubmitted ? (
                <div className="py-12 px-6 bg-[#16161e] border border-[#c9a96e]/30 text-center flex flex-col items-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#c9a96e]/20 text-[#c9a96e] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#f4efe6] mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-[#ded8cd]/80 max-w-md">
                    Thank you. Chef Bijaya Ghimire has received your message and will respond directly to your provided email address shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 text-xs uppercase tracking-[0.25em] text-[#c9a96e] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-950/40 border border-red-800 text-xs text-red-200 flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lorde Harrison"
                        className="w-full bg-[#181820] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. lorde@domain.com"
                        className="w-full bg-[#181820] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +977 9801234567"
                        className="w-full bg-[#181820] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-inquiry" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
                        Inquiry Focus
                      </label>
                      <select
                        id="contact-inquiry"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#181820] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a96e] transition-colors"
                      >
                        <option value="Private Dining & Masterclass">Private Dining &amp; Masterclass</option>
                        <option value="Executive Chef / CDP Opportunity">Executive Chef / CDP Opportunity</option>
                        <option value="Restaurant Menu Development">Restaurant Menu Development</option>
                        <option value="Culinary Staff Instruction">Culinary Staff Instruction &amp; Training</option>
                        <option value="Food Safety & HACCP Audit">Food Safety &amp; HACCP Consulting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-widest text-[#8c887e] mb-2 font-medium">
                      Project or Event Details *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your timeline, location, culinary scope, or organizational requirements..."
                      className="w-full bg-[#181820] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#c9a96e] hover:bg-[#dfc28d] disabled:opacity-50 text-[#09090b] text-xs uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
