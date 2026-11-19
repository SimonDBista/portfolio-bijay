'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Lock, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-white/5 py-12 sm:py-16 text-[#ded8cd]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Monogram */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-full">
          <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] text-[#f4efe6] uppercase">
            Bijaya Ghimire
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.35em] text-[#c9a96e] uppercase font-sans mt-1 max-w-full">
            Executive Chef &bull; Chef de Partie &bull; Culinary Pedagogy
          </span>
          <p className="text-xs text-[#8c887e] mt-3 max-w-sm px-4 md:px-0">
            Crafting elevated culinary stories through precision techniques, certified hygiene, and expressive plating.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] max-w-full px-2">
          <Link href="#home" className="hover:text-[#c9a96e] transition-colors">Home</Link>
          <Link href="#about" className="hover:text-[#c9a96e] transition-colors">About</Link>
          <Link href="#experience" className="hover:text-[#c9a96e] transition-colors">Experience</Link>
          <Link href="#specialties" className="hover:text-[#c9a96e] transition-colors">Specialties</Link>
          <Link href="#creations" className="hover:text-[#c9a96e] transition-colors">Creations</Link>
          <Link href="#contact" className="hover:text-[#c9a96e] transition-colors">Contact</Link>
          <Link href="/admin/login" className="hover:text-[#c9a96e] transition-colors flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center space-x-2 px-4 py-2 border border-white/10 hover:border-[#c9a96e] text-xs uppercase tracking-widest text-[#ded8cd] hover:text-[#c9a96e] transition-all bg-[#111116]"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78756e] text-center sm:text-left gap-2 sm:gap-0">
        <p>&copy; {new Date().getFullYear()} Chef Bijaya Ghimire. All Rights Reserved.</p>
        <p>
          Executive Portfolio &bull; Banepa, Nepal &bull; Kuwait
        </p>
      </div>
    </footer>
  );
}
