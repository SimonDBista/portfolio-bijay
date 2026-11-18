'use client';

import React from 'react';
import { chefData } from '@/data/chefData';
import {
  UtensilsCrossed,
  Palette,
  BookOpen,
  ShieldCheck,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
};

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="py-28 md:py-36 bg-[#0c0c10] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] mb-3 font-medium">
            Culinary Repertoire &amp; Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Disciplined Specialties
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-6 mb-6" />
          <p className="max-w-2xl text-sm sm:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            Each discipline represents years of hands-on refinement—from high-pressure Gulf commercial lines to mentoring academy cohorts in modern cooking science.
          </p>
        </div>

        {/* Editorial Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefData.specialties.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-[#111116] border border-white/5 p-8 flex flex-col justify-between hover:border-[#c9a96e]/40 transition-all duration-500 shadow-xl overflow-hidden"
            >
              {/* Subtle Luxury Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#c9a96e]/10 to-transparent pointer-events-none group-hover:from-[#c9a96e]/20 transition-all" />

              <div>
                {/* Icon & Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-sm bg-[#181820] border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-[#09090b] transition-all duration-300">
                    {iconMap[item.iconName] || <Sparkles className="w-6 h-6" />}
                  </div>
                  <span className="font-mono text-xs text-[#8c887e] tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#c9a96e] font-medium mb-1">
                  {item.subtitle}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal mb-4 group-hover:text-[#c9a96e] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed font-light mb-6">
                  {item.description}
                </p>
              </div>

              {/* Skills / Key Tags */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#17171e] text-[#cfc9be] border border-white/5 group-hover:border-[#c9a96e]/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
