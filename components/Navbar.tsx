'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Award, Lock } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Awards', href: '#awards' },
  { label: 'Recipes', href: '#recipes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experience', href: '#experience' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ['home', 'about', 'awards', 'recipes', 'gallery', 'creations', 'experience', 'specialties', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section === 'creations' ? 'gallery' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#c9a96e]/20 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#home"
            className="group flex flex-col items-start focus:outline-none max-w-[75%] sm:max-w-none"
          >
            <span className="font-serif text-lg sm:text-2xl font-light tracking-[0.12em] sm:tracking-[0.2em] text-[#f4efe6] group-hover:text-[#c9a96e] transition-colors uppercase truncate">
              Bijaya Ghimire
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.35em] text-[#c9a96e] uppercase font-sans font-medium truncate max-w-full">
              Chef de Partie &bull; Culinary Specialist
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 2xl:space-x-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[10.5px] xl:text-[11.5px] 2xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] transition-all relative py-1 ${isActive
                    ? 'text-[#c9a96e] font-semibold'
                    : 'text-[#e2ded6]/80 hover:text-white'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c9a96e] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <a
              href="/docs/Bijaya_Ghimire_Executive_Chef_CV.pdf"
              download
              className="inline-flex items-center space-x-1.5 xl:space-x-2 px-3 xl:px-4 py-2 border border-[#c9a96e]/40 hover:border-[#c9a96e] text-[11px] xl:text-xs uppercase tracking-[0.15em] xl:tracking-[0.2em] text-[#e8dfcf] hover:text-white transition-all bg-black/30 hover:bg-[#c9a96e]/10"
            >
              <span>Download CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a96e]" />
            </a>

            <Link
              href="/admin/login"
              title="Admin Portal"
              className="p-2 text-[#a09e97] hover:text-[#c9a96e] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 -mr-2 text-[#f4efe6] hover:text-[#c9a96e] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#09090b]/98 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-8 py-20 lg:hidden animate-fade-in overflow-y-auto">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center justify-between border-b border-[#c9a96e]/20 pb-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
                Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1 text-[#f4efe6] hover:text-[#c9a96e] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-serif tracking-widest text-[#f4efe6] hover:text-[#c9a96e] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-4 pt-6 border-t border-white/10 mt-8">
            <a
              href="/docs/Bijaya_Ghimire_Executive_Chef_CV.pdf"
              download
              className="flex items-center justify-between w-full px-5 py-3 border border-[#c9a96e]/50 text-xs uppercase tracking-[0.25em] text-[#c9a96e] bg-[#c9a96e]/5"
            >
              <span>Download Full CV</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex items-center justify-between text-xs text-[#8c887e]">
              <span className="truncate pr-2">ghimirebijay89@gmail.com</span>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#c9a96e] hover:underline shrink-0"
              >
                Admin Area
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
