"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImageItem } from './ImageGrid';
import Lightbox from './Lightbox';

interface MasonryGridProps {
  images: ImageItem[];
  columns?: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, columns = 4 }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [nextImage, setNextImage] = useState<ImageItem | null>(null);
  const [prevImage, setPrevImage] = useState<ImageItem | null>(null);

  // Distribute images into columns
  const getColumnsArray = () => {
    // Responsive columns based on screen size
    const columnCount = typeof window !== 'undefined' ? 
      window.innerWidth < 640 ? 1 : 
      window.innerWidth < 768 ? 2 : 
      window.innerWidth < 1024 ? 3 : 
      columns : columns;
    
    const columnsArray: ImageItem[][] = Array.from({ length: columnCount }, () => []);
    
    // Distribute images across columns to create a balanced layout
    images.forEach((image, index) => {
      const columnIndex = index % columnCount;
      columnsArray[columnIndex].push(image);
    });
    
    return columnsArray;
  };

  const openLightbox = (image: ImageItem) => {
    setSelectedImage(image);
    
    // Set next and previous images
    const currentIndex = images.findIndex(img => img.id === image.id);
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    setNextImage(images[nextIndex]);
    setPrevImage(images[prevIndex]);
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
    
    // Update next and previous images
    const newNextIndex = (nextIndex + 1) % images.length;
    const newPrevIndex = currentIndex;
    setNextImage(images[newNextIndex]);
    setPrevImage(images[newPrevIndex]);
  };

  const goToPrevImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    
    // Update next and previous images
    const newNextIndex = currentIndex;
    const newPrevIndex = (prevIndex - 1 + images.length) % images.length;
    setNextImage(images[newNextIndex]);
    setPrevImage(images[newPrevIndex]);
  };

  const columnsArray = getColumnsArray();

  return (
    <div className="w-full">
      <div className="flex gap-4">
        {columnsArray.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-4">
            {column.map((image) => {
              // Use intersection observer for each image
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <motion.div
                  ref={ref}
                  key={image.id}
                  className="relative overflow-hidden rounded-lg cursor-pointer hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                  onClick={() => openLightbox(image)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative" style={{ 
                    paddingBottom: `${(image.height / image.width) * 100}%`,
                  }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-4 text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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

export default MasonryGrid;