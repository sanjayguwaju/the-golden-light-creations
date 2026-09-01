"use client";
import React, { useState, useEffect } from 'react';
import { MenuIcon } from './icons';

export const HeaderSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="bg-white border-b border-reliance-navy px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-reliance-navy flex items-center justify-center">
              <div className="w-3 h-3 bg-white"></div>
            </div>
            <span className="font-bold text-lg tracking-widest uppercase text-reliance-navy">RELIANCE</span>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            {['Collections', 'Projects', 'Philosophy', 'Studio'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-reliance-navy hover:text-reliance-gold transition-colors">
                {link}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-reliance-navy hover:text-reliance-gold transition-colors">Sign In</a>
            <button className="bg-reliance-navy text-white px-6 py-2.5 font-bold uppercase tracking-widest text-xs border border-reliance-navy hover:bg-transparent hover:text-reliance-navy transition-colors">
              Order Samples
            </button>
          </div>
          <button className="lg:hidden text-reliance-navy">
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
