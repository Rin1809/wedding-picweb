import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '../types';
import { WEDDING_PHOTOS } from '../constants';
import { X, ZoomIn } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredPhotos = filter === 'all'
    ? WEDDING_PHOTOS
    : WEDDING_PHOTOS.filter(p => p.category === filter);

  return (
    <section id="gallery" className="py-20 px-4 md:px-8 bg-wedding-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-wedding-text font-serif text-4xl md:text-5xl mb-4">
            Khoảnh Khắc Đáng Nhớ
          </h2>
          <p className="text-wedding-accent font-sans italic">
            "Yêu là tìm thấy hạnh phúc của mình trong hạnh phúc của người khác."
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['all', 'ceremony', 'portraits', 'reception', 'moments'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 font-serif text-sm uppercase tracking-wide
                  ${filter === cat
                    ? 'bg-wedding-gold text-white border-wedding-gold'
                    : 'bg-transparent text-wedding-accent border-wedding-accent/30 hover:border-wedding-gold hover:text-wedding-gold'
                  }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout using CSS Columns */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={photo.id}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white w-8 h-8 opacity-80" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            <p className="text-white/80 font-serif mt-4 text-lg tracking-wide">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;