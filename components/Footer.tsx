import React from 'react';

import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-wedding-text text-wedding-champagne py-12 text-center"
    >
      <h2 className="font-script text-5xl mb-4">Thanh & Huyen</h2>
      <p className="font-serif text-sm tracking-widest opacity-70 mb-8">
        FOREVER & ALWAYS
      </p>
      <p className="font-sans text-xs text-gray-500">
        © 2024 Wedding Gallery. Made with ❤️.
      </p>
    </motion.footer>
  );
};

export default Footer;