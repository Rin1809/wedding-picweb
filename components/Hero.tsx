import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/wedding_hero/1920/1080" 
          alt="Couple Cover" 
          className="w-full h-full object-cover grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wedding-soft" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
        <p className="text-wedding-champagne font-serif text-xl md:text-2xl tracking-[0.2em] mb-4 uppercase">
          Save the Date
        </p>
        <h1 className="text-white font-script text-7xl md:text-9xl mb-2 drop-shadow-lg">
          Thanh & Huyen
        </h1>
        <div className="w-24 h-[1px] bg-wedding-champagne my-6 opacity-80" />
        <p className="text-white font-serif text-lg md:text-xl tracking-widest">
          DECEMBER 12, 2024 • SAIGON
        </p>
        
        <a 
          href="#gallery"
          className="mt-12 px-8 py-3 border border-wedding-champagne text-wedding-champagne hover:bg-wedding-champagne hover:text-black transition-all duration-500 font-serif tracking-widest text-sm uppercase"
        >
          Xem Album Ảnh
        </a>
      </div>
    </section>
  );
};

export default Hero;