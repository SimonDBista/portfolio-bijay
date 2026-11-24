'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/db';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CreationsGalleryProps {
  initialItems: GalleryItem[];
}

export default function CreationsGallery({ initialItems }: CreationsGalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Fetch updated gallery from API on mount to catch any newly uploaded images
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items) {
          setItems(data.items);
        }
      })
      .catch((err) => console.error('Error fetching gallery:', err));
  }, []);

  // Compute unique categories
  const categories = ['All', 'Featured', ...Array.from(new Set(items.map((i) => i.category || 'Creations')))];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Featured') return item.featured;
    return item.category === selectedCategory;
  });

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-36 bg-[#09090b] relative">
      {/* Anchor alias for backwards compatibility */}
      <span id="creations" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#c9a96e] mb-3 font-medium">
            Visual Portfolio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
            Signature Culinary Gallery
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-6 mb-4 sm:mb-6" />
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
            A visual anthology of culinary art, fine dining presentations, and modern gastronomic craft curated by Chef Bijaya.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-10 sm:mb-12 md:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#c9a96e] text-[#09090b] font-semibold shadow-lg'
                  : 'bg-[#121217] text-[#ded8cd]/70 hover:text-white border border-white/5 hover:border-[#c9a96e]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => {
            // Editorial variation: span 2 cols on certain items if desired, or asymmetric aspect ratios
            const isWide = index % 5 === 0 && index !== 0;

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className={`group relative bg-[#111115] border border-white/5 overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:border-[#c9a96e]/50 ${
                  isWide ? 'sm:col-span-2' : ''
                }`}
              >
                {/* Natural Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.thumbnailUrl || item.url}
                    alt={item.title || `Culinary Creation ${index + 1}`}
                    fill
                    className="object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 px-3 py-1 bg-[#c9a96e]/90 text-[#09090b] text-[10px] uppercase font-bold tracking-widest backdrop-blur-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                    <Maximize2 className="w-4 h-4 text-[#c9a96e]" />
                  </div>

                  {/* Bottom Editorial Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] block mb-1 font-medium">
                      {item.category || 'Culinary Creation'}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#f4efe6] font-normal tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-[#8c887e]">
            <p className="font-serif text-xl text-[#ded8cd]">No photographs in this collection.</p>
            <p className="text-xs uppercase tracking-widest text-[#c9a96e] mt-2">
              Select another category above
            </p>
          </div>
        )}
      </div>

      {/* LUXURY LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
              );
            }}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % filteredItems.length : 0
              );
            }}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Lightbox Image View */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] sm:h-[70vh] max-h-[750px]">
              <Image
                src={filteredItems[activeLightboxIndex].url}
                alt={filteredItems[activeLightboxIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Lightbox Caption Info */}
            <div className="mt-3 sm:mt-4 text-center px-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#c9a96e] font-medium block">
                {filteredItems[activeLightboxIndex].category} &bull; Image {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
              <h4 className="font-serif text-lg sm:text-2xl text-[#f4efe6] mt-1 font-normal">
                {filteredItems[activeLightboxIndex].title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
