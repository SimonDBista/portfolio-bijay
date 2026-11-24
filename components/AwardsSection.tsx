'use client';

import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Trophy, GraduationCap, Star, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { AwardItem } from '@/lib/db';

interface AwardsSectionProps {
  initialAwards?: AwardItem[];
}

export default function AwardsSection({ initialAwards = [] }: AwardsSectionProps) {
  const [awards, setAwards] = useState<AwardItem[]>(initialAwards);

  // Sync with API on mount to catch newly added/edited awards
  useEffect(() => {
    fetch('/api/awards')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.awards && data.awards.length > 0) {
          setAwards(data.awards);
        }
      })
      .catch((err) => console.error('Error fetching awards:', err));
  }, []);

  const renderIcon = (type: AwardItem['icon']) => {
    switch (type) {
      case 'trophy':
        return <Trophy className="w-5 h-5 text-[#c9a96e]" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-[#c9a96e]" />;
      case 'grad':
        return <GraduationCap className="w-5 h-5 text-[#c9a96e]" />;
      case 'star':
        return <Star className="w-5 h-5 text-[#c9a96e]" />;
      default:
        return <Award className="w-5 h-5 text-[#c9a96e]" />;
    }
  };

  return (
    <section id="awards" className="py-16 sm:py-24 md:py-36 bg-[#0a0a0d] relative overflow-hidden border-t border-white/5">
      {/* Decorative luxury ambient lights */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-[#c9a96e]/30 bg-[#121217] rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8dfcf] font-medium">
              Verified Honors &amp; Accreditations
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Awards &amp; Achievements
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-6 mb-4 sm:mb-6" />
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            Certified milestones that chronicle Chef Bijaya Ghimire&apos;s commitment to Michelin-level discipline, HACCP sterile food hygiene, and visionary culinary craftsmanship.
          </p>
        </div>

        {/* Awards Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {awards.map((award, index) => (
            <div
              key={award.id}
              className="group relative bg-[#111116] border border-white/5 p-6 sm:p-8 flex flex-col justify-between hover:border-[#c9a96e]/40 transition-all duration-500 shadow-xl overflow-hidden hover:-translate-y-1"
            >
              {/* Luxury Corner Gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#c9a96e]/10 to-transparent pointer-events-none group-hover:from-[#c9a96e]/20 transition-all" />

              <div>
                {/* Header: Icon + Year Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-sm bg-[#181820] border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#09090b] transition-all duration-300 shadow-md">
                    {renderIcon(award.icon)}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c9a96e] px-2.5 py-1 bg-[#c9a96e]/10 border border-[#c9a96e]/25">
                    {award.year}
                  </span>
                </div>

                {/* Category & Title */}
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#c9a96e]/85 font-medium block mb-1.5">
                  {award.category} &bull; {award.level}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#f4efe6] font-normal leading-snug mb-2 group-hover:text-[#c9a96e] transition-colors">
                  {award.title}
                </h3>
                <p className="text-xs text-[#8c887e] uppercase tracking-wider mb-4 font-mono">
                  {award.organization}
                </p>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed font-light mb-5">
                  {award.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-[#ded8cd]/75">
                {award.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a96e] shrink-0 mt-0.5" />
                    <span className="font-light leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Proof Strip */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-[#121218] border border-[#c9a96e]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 flex items-center justify-center text-[#c9a96e] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl text-[#f4efe6]">
                Officially Documented Curriculum Vitae Credentials
              </h4>
              <p className="text-xs sm:text-sm text-[#8c887e] mt-0.5">
                All certificates, employer tenures, and academic diplomas are verifiable via the official curriculum vitae.
              </p>
            </div>
          </div>

          <a
            href="/docs/Bijaya_Ghimire_Executive_Chef_CV.pdf"
            download
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shrink-0"
          >
            <span>Download Certified CV</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
