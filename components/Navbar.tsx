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
  { label: 'Experience', href: '#experience' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Creations', href: '#creations' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ['home', 'about', 'experience', 'specialties', 'creations', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#c9a96e]/20 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#home"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.2em] text-[#f4efe6] group-hover:text-[#c9a96e] transition-colors uppercase">
              Bijaya Ghimire
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#c9a96e] uppercase font-sans font-medium">
              Chef de Partie & Culinary Specialist
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs uppercase tracking-[0.25em] transition-all relative py-1 ${
                    isActive
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
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/docs/Bijaya_Ghimire_Executive_Chef_CV.pdf"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 border border-[#c9a96e]/40 hover:border-[#c9a96e] text-xs uppercase tracking-[0.2em] text-[#e8dfcf] hover:text-white transition-all bg-black/30 hover:bg-[#c9a96e]/10"
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
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-[#f4efe6] hover:text-[#c9a96e] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#09090b]/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a96e] border-b border-[#c9a96e]/20 pb-2">
              Navigation
            </span>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif tracking-widest text-[#f4efe6] hover:text-[#c9a96e] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-4 pt-6 border-t border-white/10">
            <a
              href="/docs/Bijaya_Ghimire_Executive_Chef_CV.pdf"
              download
              className="flex items-center justify-between w-full px-5 py-3 border border-[#c9a96e]/50 text-xs uppercase tracking-[0.25em] text-[#c9a96e] bg-[#c9a96e]/5"
            >
              <span>Download Full CV</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex items-center justify-between text-xs text-[#8c887e]">
              <span>ghimirebijay89@gmail.com</span>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#c9a96e] hover:underline"
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
