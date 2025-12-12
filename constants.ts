import { Photo } from "./types";

// Helper to generate consistent random images
const getUnsplashUrl = (id: number, width: number, height: number) => 
  `https://picsum.photos/seed/${id}/${width}/${height}`;

// Generating 50 mock photos
export const WEDDING_PHOTOS: Photo[] = Array.from({ length: 50 }, (_, i) => {
  const isPortrait = i % 3 === 0;
  const width = isPortrait ? 800 : 1200;
  const height = isPortrait ? 1200 : 800;
  
  let category: Photo['category'] = 'moments';
  if (i < 10) category = 'ceremony';
  else if (i < 25) category = 'portraits';
  else if (i < 40) category = 'reception';

  return {
    id: `photo-${i}`,
    url: getUnsplashUrl(i + 100, width, height), // Offset seed to avoid bad images
    width,
    height,
    category,
    caption: `Wedding Memory ${i + 1}`
  };
});

export const NAV_LINKS = [
  { label: 'Trang Chủ', href: '#home' },
  { label: 'Album Ảnh', href: '#gallery' },
  { label: 'Trợ Lý Lời Chúc', href: '#guestbook-ai' },
];
