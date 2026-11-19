'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, Pause, Play, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  src: string;
  alt: string;
  subcaption: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    src: '/images/hero/hero-1.jpg',
    alt: 'Chef Bijaya Ghimire signature culinary creation 11',
    subcaption: 'Precision & Culinary Artistry'
  },
  {
    id: 2,
    src: '/images/hero/hero-2.jpg',
    alt: 'Chef Bijaya Ghimire fine dining preparation 12',
    subcaption: 'Modern Gastronomy & Flavor Balance'
  },
  {
    id: 3,
    src: '/images/hero/hero-3.jpg',
    alt: 'Chef Bijaya Ghimire gourmet plating 13',
    subcaption: 'Architectural Presentation & Craft'
  },
  {
    id: 4,
    src: '/images/hero/hero-4.jpg',
    alt: 'Chef Bijaya Ghimire executive kitchen craft 14',
    subcaption: 'Over 8 Years of International Discipline'
  }
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images into browser memory to eliminate flashing
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, []);

  // 3-second automatic slide transition
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      if (isPlaying) {
        timerRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        }, 3000);
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden select-none bg-[#09090b]"
      aria-label="Chef Bijaya Ghimire Showcase"
    >
      {/* Background Images with Cinematic Ken Burns & Crossfade */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div
                className={`relative w-full h-full transition-transform duration-[12000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center filter brightness-[0.78] contrast-[1.08]"
                  sizes="100vw"
                  quality={92}
                />
              </div>
            </div>
          );
        })}

        {/* Sophisticated Luxury Dark Gradients & Overlays for Guaranteed Readability */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-[#09090b] via-[#09090b]/65 to-[#09090b]/55 pointer-events-none" />
        <div className="absolute inset-0 z-15 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 z-15 bg-radial-vignette opacity-80 pointer-events-none" />
      </div>

      {/* Main Hero Content - Prominent Editorial Typography */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center mt-12">
        {/* Subtle Decorative Crest / Badge */}
        <div className="inline-flex items-center space-x-3 mb-6 px-4 py-1.5 border border-[#c9a96e]/30 bg-black/40 backdrop-blur-md rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-ping" />
          <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#e8dfcf] font-medium">
            Over 8 Years of International Culinary Craft
          </span>
        </div>

        {/* Chef's Actual Name */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.14em] text-[#f4efe6] uppercase mb-4 [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]">
          <span className="block text-xs sm:text-sm md:text-base font-sans tracking-[0.45em] text-[#c9a96e] mb-2 font-normal">
            Executive Chef
          </span>
          Chef Bijaya Ghimire
        </h1>

        {/* Professional Title */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <span className="h-[1px] w-8 md:w-16 bg-[#c9a96e]/70" />
          <p className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.4em] text-[#c9a96e] font-medium [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
            Chef de Partie &bull; Culinary Specialist &bull; Instructor
          </p>
          <span className="h-[1px] w-8 md:w-16 bg-[#c9a96e]/70" />
        </div>

        {/* Powerful Elegant Introduction */}
        <p className="max-w-2xl font-sans text-sm sm:text-base md:text-lg text-[#ded8cd] leading-relaxed font-light mb-10 tracking-wide text-balance [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)]">
          Harmonizing disciplined Himalayan fundamentals with high-intensity international kitchen brigades in Kuwait. 
          Sculpting elevated gastronomy where technical mastery meets evocative plating.
        </p>

        {/* Two Required CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="#experience"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#c9a96e] hover:bg-[#dfc28d] text-[#09090b] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-xl hover:shadow-[#c9a96e]/20 flex items-center justify-center space-x-2 group"
          >
            <span>Explore My Journey</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#creations"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#e8dfcf]/40 hover:border-[#c9a96e] bg-black/40 hover:bg-black/60 text-[#f4efe6] hover:text-[#c9a96e] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
          >
            <span>Discover My Creations</span>
          </Link>
        </div>
      </div>

      {/* Slide Navigation Controls & Progress Indicators */}
      <div className="absolute bottom-10 left-6 md:left-12 right-6 md:right-12 z-20 flex items-end justify-between pointer-events-none">
        {/* Active Slide Indicators */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group flex flex-col items-start py-2 focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] tracking-widest font-mono transition-colors ${
                      isActive ? 'text-[#c9a96e] font-bold' : 'text-white/40 group-hover:text-white/80'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div
                    className={`h-[2px] transition-all duration-500 rounded-full ${
                      isActive ? 'w-12 bg-[#c9a96e]' : 'w-4 bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                </div>
              </button>
            );
          })}

          {/* Pause / Play Toggle for Accessibility */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="ml-3 p-1.5 rounded-full border border-white/20 text-white/60 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors focus:outline-none"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>

        {/* Current Caption */}
        <div className="hidden sm:block text-right pointer-events-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]/90 font-medium">
            Featured Culinary Art
          </p>
          <p className="text-xs font-serif italic text-white/80">
            {heroSlides[currentIndex].subcaption}
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/40 hover:text-[#c9a96e] transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] mb-1">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
