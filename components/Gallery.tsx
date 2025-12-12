import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '../types';
import { WEDDING_PHOTOS } from '../constants';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredPhotos = filter === 'all'
    ? WEDDING_PHOTOS
    : WEDDING_PHOTOS.filter(p => p.category === filter);

  // Navigation handlers
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [selectedPhoto, filteredPhotos]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [selectedPhoto, filteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedPhoto(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-12 md:py-20 px-4 md:px-8 bg-wedding-soft shadow-[inset_0_0_150px_rgba(0,0,0,0.08)] relative">
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

        {/* Manual Masonry Layout */}
        <div className="flex flex-col md:flex-row gap-8 px-4">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex-1 space-y-8">
              <AnimatePresence>
                {filteredPhotos
                  .filter((_, index) => index % 3 === colIndex)
                  .map((photo, index) => {
                    // Calculate deterministic rotation
                    // Use actual index from filteredPhotos for consistent rotation, not the column index
                    const actualIndex = filteredPhotos.indexOf(photo);
                    const rotation = (actualIndex % 2 === 0 ? 1 : -1) * ((actualIndex * 7) % 6);

                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "50px" }}
                        whileHover={{
                          scale: 1.02,
                          rotate: 0,
                          zIndex: 10,
                          transition: { duration: 0.3 }
                        }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        key={photo.id}
                        className="relative group cursor-pointer bg-white p-4 pb-12 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        style={{ rotate: `${rotation}deg` }}
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <div className="overflow-hidden w-full h-full relative">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            loading="lazy"
                            className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white w-8 h-8 drop-shadow-md" />
                          </div>
                        </div>

                        {/* Handwritten Caption Effect */}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <p className="font-handwriting text-gray-600 text-lg opacity-80 rotate-[-1deg]">
                            {photo.caption}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in group"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Previous Button */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
          </button>
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
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