import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { NAV_LINKS } from './constants';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-wedding-gold selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`font-script text-3xl transition-colors ${isScrolled ? 'text-wedding-text' : 'text-white'}`}>
            T & H
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`font-serif text-sm uppercase tracking-widest hover:text-wedding-gold transition-colors ${isScrolled ? 'text-wedding-text' : 'text-white/90'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-wedding-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu color={isScrolled ? '#2C2C2C' : 'white'} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-4 flex flex-col animate-fade-in-down">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-6 py-3 text-wedding-text font-serif uppercase tracking-widest text-sm hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <Gallery />
      </main>

      <Footer />
    </div>
  );
};

export default App;