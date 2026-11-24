'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EventFolder, GalleryItem } from '@/lib/db';
import {
  Folder,
  FolderOpen,
  ArrowLeft,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Images,
  Calendar,
  MapPin
} from 'lucide-react';

interface CreationsGalleryProps {
  initialFolders?: EventFolder[];
  initialItems?: GalleryItem[];
}

export default function CreationsGallery({ initialFolders = [], initialItems = [] }: CreationsGalleryProps) {
  const [folders, setFolders] = useState<EventFolder[]>(initialFolders);
  const [openFolder, setOpenFolder] = useState<EventFolder | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Sync event folders with API on mount to catch any newly created folders or uploaded photos
  useEffect(() => {
    fetch('/api/gallery/folders')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.folders && data.folders.length > 0) {
          setFolders(data.folders);
        }
      })
      .catch((err) => console.error('Error fetching event folders:', err));
  }, []);

  // Update openFolder reference if folders change
  useEffect(() => {
    if (openFolder) {
      const refreshed = folders.find((f) => f.id === openFolder.id);
      if (refreshed) setOpenFolder(refreshed);
    }
  }, [folders]);

  const currentImages = openFolder?.images || [];

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % currentImages.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + currentImages.length) % currentImages.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, currentImages.length]);

  return (
    <section id="gallery" className="py-20 sm:py-28 md:py-36 bg-[#09090b] relative">
      {/* Anchor alias for backwards compatibility */}
      <span id="creations" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* ========================================================= */}
        {/* VIEW 1: OUTSIDE THE FOLDERS (ALL EVENT FOLDERS)            */}
        {/* ========================================================= */}
        {!openFolder ? (
          <div>
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-14 sm:mb-18 md:mb-20">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 border border-[#c9a96e]/30 bg-[#121217] rounded-full mb-4">
                <Folder className="w-3.5 h-3.5 text-[#c9a96e]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8dfcf] font-medium">
                  Event Portfolios &bull; Visual Archives
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#f4efe6]">
                Culinary Event Gallery
              </h2>
              <div className="w-16 h-[1.5px] bg-[#c9a96e] mt-4 sm:mt-5 mb-4 sm:mb-5" />
              <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#ded8cd]/80 leading-relaxed font-light">
                Explore dedicated event folders chronicling executive banquet services, resort gastronomy galas, and culinary masterclasses curated by Chef Bijaya.
              </p>
            </div>

            {/* Event Folders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {folders.map((folder) => {
                const photoCount = folder.images ? folder.images.length : 0;
                const cover = (folder.images && folder.images.length > 0
                  ? (folder.images.find(img => img.url === folder.coverImage)?.url || folder.images[0]?.url)
                  : folder.coverImage) || '/images/gallery/creation-01.jpg';

                return (
                  <div
                    key={folder.id}
                    onClick={() => {
                      setOpenFolder(folder);
                      window.scrollTo({ top: (document.getElementById('gallery')?.offsetTop || 0) - 80, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer bg-[#111116] border border-[#c9a96e]/25 hover:border-[#c9a96e] transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden relative hover:-translate-y-1.5"
                  >
                    {/* Luxury Folder Tab Styling Header */}
                    <div className="relative bg-[#161520] border-b border-white/5 px-6 py-3.5 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <Folder className="w-4 h-4 text-[#c9a96e] group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#c9a96e] font-semibold">
                          Event Album Folder
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[10.5px] font-mono text-[#e8dfcf] uppercase">
                        {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                      </span>
                    </div>

                    {/* Folder Cover Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#181724]">
                      <Image
                        src={cover}
                        alt={folder.name}
                        fill
                        className="object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-80" />

                      {folder.date && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#ded8cd]">
                            {folder.date}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Outside the Folder: Title + Little Description */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal leading-snug group-hover:text-[#c9a96e] transition-colors mb-2.5">
                          {folder.name}
                        </h3>

                        {/* Little Description Outside the Folder */}
                        <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed font-light">
                          {folder.description}
                        </p>
                      </div>

                      {/* Folder Action Pill */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#c9a96e] font-mono uppercase tracking-wider">
                        <span className="group-hover:underline">Open Event Photos ({photoCount})</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: INSIDE THE FOLDER (PHOTOS OF THE SELECTED EVENT)   */
          /* ========================================================= */
          <div className="animate-fade-in">
            {/* Top Navigation & Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#c9a96e]/20">
              <button
                onClick={() => setOpenFolder(null)}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-[#c9a96e]/40 hover:border-[#c9a96e] bg-[#14141c] hover:bg-[#c9a96e]/10 text-xs uppercase tracking-widest text-[#ded8cd] hover:text-white transition-all self-start"
              >
                <ArrowLeft className="w-4 h-4 text-[#c9a96e]" />
                <span>Back to All Event Folders</span>
              </button>

              <div className="flex items-center space-x-3 text-xs font-mono text-[#8c887e]">
                <span>Viewing Event:</span>
                <span className="text-[#c9a96e] font-semibold">{openFolder.name}</span>
                <span>&bull;</span>
                <span>{currentImages.length} Photographs</span>
              </div>
            </div>

            {/* Folder Header Banner */}
            <div className="bg-[#121218] border border-white/5 p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <FolderOpen className="w-4 h-4 text-[#c9a96e]" />
                  <span className="text-xs uppercase font-mono tracking-widest text-[#c9a96e]">
                    Event Album Showcase
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-normal">
                  {openFolder.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#ded8cd]/80 leading-relaxed font-light mt-2 max-w-2xl">
                  {openFolder.description}
                </p>
              </div>

              {openFolder.date && (
                <div className="shrink-0 px-4 py-2 bg-[#181822] border border-[#c9a96e]/30 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c887e] block">
                    Event Date / Venue
                  </span>
                  <span className="text-xs font-mono text-[#c9a96e]">
                    {openFolder.date}
                  </span>
                </div>
              )}
            </div>

            {/* Photos Inside the Folder */}
            {currentImages.length === 0 ? (
              <div className="text-center py-16 bg-[#121217] border border-white/5">
                <Images className="w-10 h-10 text-white/30 mx-auto mb-3" />
                <p className="text-xs uppercase tracking-widest text-[#8c887e]">
                  No photographs uploaded to this event folder yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentImages.map((item, index) => (
                  <div
                    key={item.id || index}
                    onClick={() => setActiveLightboxIndex(index)}
                    className="group relative cursor-pointer overflow-hidden bg-[#121218] border border-white/5 hover:border-[#c9a96e]/50 transition-all duration-500 shadow-lg"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181724]">
                      <Image
                        src={item.url}
                        alt={item.title || openFolder.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Zoom Indicator */}
                      <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      {/* Bottom Info on Hover */}
                      <div className="absolute bottom-3 left-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {item.category && (
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e] block">
                            {item.category}
                          </span>
                        )}
                        <h4 className="font-serif text-sm sm:text-base text-white font-normal truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && currentImages[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-xs text-[#ded8cd]/70 z-10 pb-4">
            <span className="font-mono">
              {openFolder?.name} &bull; {activeLightboxIndex + 1} of {currentImages.length}
            </span>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              aria-label="Close image viewer"
              className="p-2 hover:text-[#c9a96e] text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image View */}
          <div className="relative flex-1 flex items-center justify-center my-auto max-h-[82vh]">
            <Image
              src={currentImages[activeLightboxIndex].url}
              alt={currentImages[activeLightboxIndex].title || 'Culinary Creation'}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />

            {/* Navigation Arrows */}
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? (prev - 1 + currentImages.length) % currentImages.length : 0
                    );
                  }}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-[#c9a96e] text-white hover:text-black transition-all"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % currentImages.length : 0
                    );
                  }}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-[#c9a96e] text-white hover:text-black transition-all"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer */}
          <div className="text-center pt-4 z-10">
            <p className="font-serif text-lg text-white">
              {currentImages[activeLightboxIndex].title}
            </p>
            {currentImages[activeLightboxIndex].category && (
              <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-mono">
                {currentImages[activeLightboxIndex].category}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
