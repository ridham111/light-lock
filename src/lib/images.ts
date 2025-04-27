import { ImageItem } from '../components/ImageGrid';

// Sample image data
// In a real application, this would come from an API or database
export const sampleImages: ImageItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=800&q=75',
    alt: 'Landscape with mountains and lake',
    width: 800,
    height: 533,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&w=800&q=75',
    alt: 'City skyline at night',
    width: 800,
    height: 533,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&w=800&q=75',
    alt: 'Beach with palm trees',
    width: 800,
    height: 533,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&w=800&q=75',
    alt: 'Forest with sunlight',
    width: 800,
    height: 533,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&w=800&q=75',
    alt: 'Mountain landscape',
    width: 800,
    height: 533,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&w=800&q=75',
    alt: 'Field with sunset',
    width: 800,
    height: 533,
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&w=800&q=75',
    alt: 'Mountain peak',
    width: 800,
    height: 533,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&w=800&q=75',
    alt: 'Desert landscape',
    width: 800,
    height: 533,
  },
  // Adding more diverse images
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&w=800&q=75',
    alt: 'Italian coastal village',
    width: 800,
    height: 1200, // Portrait orientation
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&w=800&q=75',
    alt: 'Venice canal with gondolas',
    width: 800,
    height: 533,
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&w=800&q=75',
    alt: 'Santorini white buildings with blue domes',
    width: 800,
    height: 1200, // Portrait orientation
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&w=800&q=75',
    alt: 'Northern lights over mountains',
    width: 800,
    height: 533,
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&w=800&q=75',
    alt: 'Colorful autumn forest',
    width: 800,
    height: 600,
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&w=800&q=75',
    alt: 'Foggy mountain valley',
    width: 800,
    height: 533,
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&w=800&q=75',
    alt: 'Night sky with stars',
    width: 800,
    height: 533,
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&w=800&q=75',
    alt: 'Waterfall in lush forest',
    width: 800,
    height: 1200, // Portrait orientation
  },
  {
    id: 17,
    src: 'https://images.unsplash.com/photo-1504567961542-e24d9439a724?auto=format&w=800&q=75',
    alt: 'Lavender fields at sunset',
    width: 800,
    height: 533,
  },
  {
    id: 18,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&w=800&q=75',
    alt: 'Tropical beach with clear water',
    width: 800,
    height: 600,
  },
  {
    id: 19,
    src: 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?auto=format&w=800&q=75',
    alt: 'Architectural detail of modern building',
    width: 800,
    height: 1200, // Portrait orientation
  },
  {
    id: 20,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&w=800&q=75',
    alt: 'Road through autumn forest',
    width: 800,
    height: 533,
  },
];

// Featured images for the carousel
export const featuredImages: ImageItem[] = [
  {
    id: 101,
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&w=1200&q=80',
    alt: 'Mountain lake reflection',
    width: 1200,
    height: 800,
  },
  {
    id: 102,
    src: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&w=1200&q=80',
    alt: 'Sunset over ocean',
    width: 1200,
    height: 800,
  },
  {
    id: 103,
    src: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&w=1200&q=80',
    alt: 'Beach with palm trees aerial view',
    width: 1200,
    height: 800,
  },
  {
    id: 104,
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&w=1200&q=80',
    alt: 'Countryside with rolling hills',
    width: 1200,
    height: 800,
  },
  {
    id: 105,
    src: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&w=1200&q=80',
    alt: 'Dramatic mountain peaks',
    width: 1200,
    height: 800,
  },
];

// Image categories for filtering
export const imageCategories = [
  { id: 'all', name: 'All Photos' },
  { id: 'landscape', name: 'Landscapes' },
  { id: 'city', name: 'Cities' },
  { id: 'nature', name: 'Nature' },
  { id: 'architecture', name: 'Architecture' },
];

