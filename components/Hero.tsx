import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="/anh/TBM_1229.jpg"
            alt="Couple Cover"
            className="w-full h-full object-cover grayscale-[30%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wedding-soft" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-wedding-champagne font-serif text-xl md:text-2xl tracking-[0.2em] mb-4 uppercase"
        >
          Save the Date
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white font-script text-5xl sm:text-7xl md:text-9xl mb-2 drop-shadow-lg"
        >
          Văn Hiển & Huỳnh Thư
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-24 h-[1px] bg-wedding-champagne my-6 opacity-80"
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-white font-serif text-lg md:text-xl tracking-widest"
        >
          DECEMBER 28, 2025 • SAIGON
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          href="#invitation"
          onClick={(e) => {
            e.preventDefault();
            onStart();
          }}
          className="mt-12 px-8 py-3 border border-wedding-champagne text-wedding-champagne hover:bg-wedding-champagne hover:text-black transition-all duration-500 font-serif tracking-widest text-sm uppercase cursor-pointer"
        >
          Xem Album Ảnh
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;