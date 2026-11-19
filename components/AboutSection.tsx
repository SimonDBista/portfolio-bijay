'use client';

import React from 'react';
import Image from 'next/image';
import { ChefProfile, chefData as fallbackChefData } from '@/data/chefData';
import { Award, ShieldCheck, Globe, GraduationCap, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile?: ChefProfile;
}

export default function AboutSection({ profile = fallbackChefData }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-36 bg-[#0c0c0f] relative overflow-hidden">
      {/* Decorative luxury background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#c9a96e] mb-3 font-medium">
            {profile.aboutSubtitle || 'Curated Biography • Authentic Craft'}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6] max-w-3xl">
            {profile.aboutTitle || 'A Journey of Discipline, Precision, & Plating Artistry'}
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-6" />
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Photography & Key Badges */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="relative group">
              {/* Luxury Frame Accent */}
              <div className="absolute -inset-3 border border-[#c9a96e]/25 -z-10 transition-transform duration-500 group-hover:scale-[1.02]" />
              
              <div className="relative w-full aspect-[4/5] bg-[#141418] overflow-hidden shadow-2xl">
                <Image
                  src={profile.bioImage || "/images/chef/bijaya-ghimire.jpg"}
                  alt="Chef Bijaya Ghimire portrait in chef uniform and Dhaka topi"
                  fill
                  priority
                  className="object-cover object-top filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={95}
                />
                
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <p className="font-serif text-xl text-[#f4efe6] tracking-wide">
                    {profile.name}
                  </p>
                  <p className="text-xs font-sans tracking-[0.25em] text-[#c9a96e] uppercase mt-1">
                    {profile.contact.home} &bull; International CDP
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Certifications Box */}
            <div className="bg-[#121217] border border-white/5 p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#c9a96e] font-semibold flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#c9a96e]" />
                <span>Verified Credentials</span>
              </h4>
              <div className="space-y-3">
                {profile.education.slice(0, 3).map((edu) => (
                  <div key={edu.id} className="flex items-start space-x-3 text-xs text-[#ded8cd]">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a96e] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white block">{edu.title}</span>
                      <span className="text-[#a09c94]">{edu.institution} ({edu.year})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Biography & Philosophy */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Editorial Quote */}
            <blockquote className="border-l-2 border-[#c9a96e] pl-6 py-2">
              <p className="font-serif italic text-xl sm:text-2xl text-[#f4efe6] leading-relaxed">
                &ldquo;{profile.editorialQuote}&rdquo;
              </p>
              <cite className="block text-xs uppercase tracking-[0.3em] text-[#c9a96e] mt-3 not-italic">
                &mdash; {profile.name}
              </cite>
            </blockquote>

            {/* Narrative Paragraphs */}
            <div className="space-y-6 text-[#ded8cd]/90 font-light text-base leading-relaxed tracking-wide">
              {profile.fullPhilosophy.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Four Proven Core Metrics */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10">
              {profile.stats.map((stat, idx) => (
                <div key={idx} className="bg-[#121217] p-3 sm:p-4 border border-white/5 flex flex-col justify-between">
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[#c9a96e] font-light">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#f4efe6] uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#8e8a80] mt-1 leading-normal">
                    {stat.subtext}
                  </span>
                </div>
              ))}
            </div>

            {/* Languages Spoken */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#ded8cd]">
              <span className="text-[#c9a96e] uppercase tracking-[0.2em] font-medium flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Languages:</span>
              </span>
              {profile.contact.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#16161c] border border-white/10 text-xs rounded-sm"
                >
                  <strong className="text-white font-medium">{lang.language}</strong> ({lang.level})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
