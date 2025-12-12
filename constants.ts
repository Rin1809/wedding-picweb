import { Photo } from "./types";

const IMAGE_FILENAMES = [
  "TBM_0427.JPG", "TBM_0468.JPG", "TBM_0480.JPG", "TBM_0504.JPG", "TBM_0559.JPG",
  "TBM_0666.JPG", "TBM_0707.JPG", "TBM_0731.JPG", "TBM_0748.JPG", "TBM_0810.JPG",
  "TBM_0830.JPG", "TBM_0899.JPG", "TBM_0915.JPG", "TBM_0944.JPG", "TBM_0977.JPG",
  "TBM_0980.JPG", "TBM_1034.JPG", "TBM_1072.JPG", "TBM_1132.JPG", "TBM_1138.JPG",
  "TBM_1171.JPG", "TBM_1176.JPG", "TBM_1196.JPG", "TBM_1207.JPG", "TBM_1229.JPG",
  "TBM_1248.JPG", "TBM_1264.JPG", "TBM_1325.JPG", "TBM_1332.JPG", "TBM_1353.JPG",
  "TBM_1383.JPG", "TBM_1409.JPG", "TBM_1449.JPG", "TBM_1486.JPG", "TBM_1510.JPG",
  "TBM_1559.JPG", "TBM_1599.JPG", "TBM_1605.JPG", "TBM_1621.JPG", "TBM_1634.JPG",
  "TBM_1645.JPG", "TBM_1662.JPG", "TBM_1669.JPG", "TBM_1678.JPG", "TBM_1696.JPG"
];

export const WEDDING_PHOTOS: Photo[] = IMAGE_FILENAMES.map((filename, i) => {
  const isPortrait = i % 3 === 0; // Giả lập tỷ lệ ảnh, thực tế nên check dimensions nếu được
  const width = isPortrait ? 800 : 1200;
  const height = isPortrait ? 1200 : 800;

  // Chia category theo index để demo filter
  let category: Photo['category'] = 'moments';
  if (i < 10) category = 'ceremony';
  else if (i < 20) category = 'portraits';
  else if (i < 30) category = 'reception';

  return {
    id: `photo-${i}`,
    url: `/anh/${filename}`,
    width,
    height,
    category,
    caption: `Wedding Memory ${i + 1}`
  };
});

export const NAV_LINKS = [
  { label: 'Trang Chủ', href: '#home' },
  { label: 'Album Ảnh', href: '#gallery' },
];

export const MUSIC_PLAYLIST = [
  {
    title: "Cùng Anh Già Đi",
    artist: "Đường Cổ",
    src: "/music/cung-anh-gia-di.mp3"
  },
  {
    title: "Kiếp Sau Vẫn Muốn Cùng Em Lập Gia Đình",
    artist: "Đồng Đại Vương",
    src: "/music/kiep-sau-van-muon.mp3"
  }
];
