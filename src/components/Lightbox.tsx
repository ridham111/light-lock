"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageItem } from './ImageGrid';

interface LightboxProps {
  image: ImageItem;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  nextImage?: ImageItem | null;
  prevImage?: ImageItem | null;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose, onNext, onPrev, nextImage, prevImage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [image.id]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'i') setShowInfo((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNext, onPrev]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);

      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    resetTimeout();

    const handleMouseMove = () => resetTimeout();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle fullscreen change
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullScreen(true);
      } catch (err) {
        console.error('Error trying to enable full-screen mode:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullScreen(false);
      } catch (err) {
        console.error('Error trying to exit full-screen mode:', err);
      }
    }
  };

  // Listen to full screen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Close when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative max-w-6xl w-full h-full max-h-[85vh] flex items-center justify-center">

          {/* Hidden preload images */}
          {nextImage && (
            <div className="hidden">
              <Image src={nextImage.src} alt={`Preload next: ${nextImage.alt}`} width={1} height={1} />
            </div>
          )}
          {prevImage && (
            <div className="hidden">
              <Image src={prevImage.src} alt={`Preload previous: ${prevImage.alt}`} width={1} height={1} />
            </div>
          )}

          

          {/* Close button */}
          <motion.button
            className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${!showControls && !isLoading ? 'opacity-0' : 'opacity-100'}`}
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              }
              onClose();
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Info button */}
          <motion.button
            className={`absolute top-4 left-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${!showControls && !isLoading ? 'opacity-0' : 'opacity-100'}`}
            onClick={() => setShowInfo(!showInfo)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>

          {/* Fullscreen button */}
          <motion.button
            className={`absolute top-4 left-16 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${!showControls && !isLoading ? 'opacity-0' : 'opacity-100'}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFullScreen();
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFullScreen ? (
              // Exit fullscreen icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16h4v4m0-4l-4 4m16-4h-4v4m0-4l4 4M4 8h4V4m0 4L4 4m16 4h-4V4m0 4l4-4" />
              </svg>
            ) : (
              // Enter fullscreen icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-16h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3" />
              </svg>
            )}
          </motion.button>

          {/* Image container */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={image.src}
              alt={image.alt}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              quality={90}
              onLoadingComplete={() => setIsLoading(false)}
            />
          </motion.div>

          {/* Image info overlay */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <h3 className="text-xl font-bold mb-2">{image.alt}</h3>
                <p className="text-sm opacity-80">Image dimensions: {image.width} x {image.height}</p>
                <p className="text-sm opacity-80">Image ID: {image.id}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {onPrev && (
            <motion.button
              className={`absolute left-4 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${!showControls && !isLoading ? 'opacity-0' : 'opacity-100'}`}
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {onNext && (
            <motion.button
              className={`absolute right-4 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity ${!showControls && !isLoading ? 'opacity-0' : 'opacity-100'}`}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          {/* Keyboard shortcuts info */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-50">
            Use arrow keys to navigate • Press ESC to close • Press i for image info
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
