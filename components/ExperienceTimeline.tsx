'use client';

import React, { useState } from 'react';
import { ChefProfile, chefData as fallbackChefData } from '@/data/chefData';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Award, UserCheck } from 'lucide-react';

interface ExperienceTimelineProps {
  profile?: ChefProfile;
}

export default function ExperienceTimeline({ profile = fallbackChefData }: ExperienceTimelineProps) {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'references'>('experience');

  const experiences = profile.experiences || fallbackChefData.experiences;
  const education = profile.education || fallbackChefData.education;
  const references = profile.references || fallbackChefData.references;

  return (
    <section id="experience" className="py-28 md:py-36 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-[#c9a96e] mb-3 font-medium">
            Curated Career Milestones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Professional Experience &amp; Pedagogy
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-6 mb-8" />

          {/* Luxury Tab Switcher */}
          <div className="inline-flex p-1 bg-[#121217] border border-white/10 rounded-sm">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeTab === 'experience'
                  ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
                  : 'text-[#ded8cd]/70 hover:text-white'
              }`}
            >
              Culinary Experience ({experiences.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
                  : 'text-[#ded8cd]/70 hover:text-white'
              }`}
            >
              Education &amp; Certifications ({education.length})
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeTab === 'references'
                  ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-md'
                  : 'text-[#ded8cd]/70 hover:text-white'
              }`}
            >
              References
            </button>
          </div>
        </div>

        {/* TAB 1: WORK EXPERIENCE TIMELINE */}
        {activeTab === 'experience' && (
          <div className="relative border-l border-[#c9a96e]/30 ml-4 md:ml-32 space-y-12 pb-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-12 group">
                {/* Timeline Node Icon */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#121217] border-2 border-[#c9a96e] flex items-center justify-center text-[#c9a96e] group-hover:scale-110 group-hover:bg-[#c9a96e] group-hover:text-[#09090b] transition-all shadow-lg">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Period Badge for desktop */}
                <div className="hidden md:block absolute -left-48 top-2 text-right w-40">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#c9a96e] font-mono font-medium block">
                    {exp.period}
                  </span>
                  <span className="text-[11px] text-[#8e8a80] block mt-0.5">
                    {exp.location}
                  </span>
                </div>

                {/* Experience Card */}
                <div className="bg-[#111116] border border-white/5 p-6 md:p-8 hover:border-[#c9a96e]/40 transition-all duration-300 shadow-xl">
                  {/* Mobile Period */}
                  <div className="md:hidden flex items-center space-x-3 mb-2 text-xs text-[#c9a96e] font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                    <span>&bull;</span>
                    <span>{exp.location}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal tracking-wide group-hover:text-[#c9a96e] transition-colors">
                        {exp.role} {exp.shift ? <span className="text-sm font-sans text-[#c9a96e]/90 font-light">({exp.shift})</span> : null}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.2em] text-[#c9a96e] font-medium mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-1.5 text-xs text-[#8c887e]">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a96e]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <ul className="space-y-2.5 mt-4">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#ded8cd]/85 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#c9a96e] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: EDUCATION & TRAINING */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="bg-[#111116] border border-white/5 p-8 flex flex-col justify-between hover:border-[#c9a96e]/40 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#c9a96e] px-3 py-1 bg-[#c9a96e]/10 border border-[#c9a96e]/20">
                      {edu.year}
                    </span>
                    {edu.grade && (
                      <span className="text-xs text-[#8c887e]">
                        Grade: {edu.grade}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-[#f4efe6] font-normal mb-2">
                    {edu.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center space-x-2 text-xs text-[#8c887e]">
                  <GraduationCap className="w-4 h-4 text-[#c9a96e]" />
                  <span>Officially Verified Educational Credential</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PROFESSIONAL REFERENCES */}
        {activeTab === 'references' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm text-[#ded8cd]/80 max-w-xl mx-auto">
                Direct professional references extracted from Chef Bijaya&apos;s verified curriculum vitae, representing executive hospitality and operations leadership.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {references.map((ref, idx) => (
                <div
                  key={idx}
                  className="bg-[#111116] border border-white/5 p-6 hover:border-[#c9a96e]/40 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#181820] border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] mb-4">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg text-[#f4efe6]">
                      {ref.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#c9a96e] mt-1 font-medium">
                      {ref.title}
                    </p>
                    <p className="text-xs text-[#8e8a80] mt-0.5">
                      {ref.organization}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5 text-xs text-[#ded8cd]/75">
                    <p className="truncate"><span className="text-[#8c887e]">Email:</span> {ref.email}</p>
                    <p><span className="text-[#8c887e]">Contact:</span> {ref.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
