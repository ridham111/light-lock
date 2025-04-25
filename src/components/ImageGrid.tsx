"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGridProps {
  images: ImageItem[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [nextImage, setNextImage] = useState<ImageItem | null>(null);
  const [prevImage, setPrevImage] = useState<ImageItem | null>(null);

  // Preload next and previous images when selected image changes
  useEffect(() => {
    if (selectedImage && images.length > 1) {
      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      
      setNextImage(images[nextIndex]);
      setPrevImage(images[prevIndex]);
    }
  }, [selectedImage, images]);

  const openLightbox = (image: ImageItem) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const goToPrevImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              loading="lazy"
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={closeLightbox}
          onNext={images.length > 1 ? goToNextImage : undefined}
          onPrev={images.length > 1 ? goToPrevImage : undefined}
          nextImage={nextImage}
          prevImage={prevImage}
        />
      )}
    </div>
  );
};

export default ImageGrid;




