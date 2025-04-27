'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MasonryGrid from '../../components/MasonryGrid';
import Carousel from '../../components/Carousel';
import Button from '../../components/Button';
import { sampleImages, featuredImages } from '../../lib/images';
import { logout } from '../../lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [activeCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState(sampleImages);
  const [searchQuery] = useState('');

  // This ensures we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Simple protection for dashboard page
  // In a real app, you would use middleware or a more robust auth check
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      // For demo purposes, we'll just check if we came from the login page
      // In a real app, you would verify authentication status
      
      router.push('/');
    }
  }, [isClient, router]);

  // Filter images based on category and search query
  useEffect(() => {
    let result = [...sampleImages];
    
    // Apply category filter (this is just a simulation since we don't have real categories)
    if (activeCategory !== 'all') {
      // In a real app, you would filter by actual category data
      // For this demo, we'll just take a subset based on the category name
      switch (activeCategory) {
        case 'landscape':
          result = sampleImages.filter(img => img.id % 5 === 0 || img.id % 5 === 1);
          break;
        case 'city':
          result = sampleImages.filter(img => img.id % 5 === 2);
          break;
        case 'nature':
          result = sampleImages.filter(img => img.id % 5 === 3);
          break;
        case 'architecture':
          result = sampleImages.filter(img => img.id % 5 === 4);
          break;
      }
    }
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(img => 
        img.alt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredImages(result);
  }, [activeCategory, searchQuery]);

  if (!isClient) {
    return null; // Prevent flash of unauthenticated content
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
         
            <motion.h1 
              className="ml-4 text-xl font-semibold text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Light-Lock Gallery
            </motion.h1>
          </div>
          
          <div className="flex items-center space-x-4">
          
            {/* <Button 
              variant="outline" 
              size="sm"
              tooltip="Search images"
              onClick={() => setShowSearch(!showSearch)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            >
              {!showSearch && "Search"}
            </Button> */}
            
            <Button 
              variant="secondary" 
              size="sm"
              tooltip="Sign out of your account"
              onClick={handleLogout}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              }
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured Photos
          </h2>
          <Carousel images={featuredImages} />
        </motion.div>
        
        {/* Category Filter */}
        {/* <div className="mb-8">     
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Photo Gallery</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {imageCategories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {filteredImages.length} photos found. Click on any image to view it in the lightbox.
          </p>
        </div> */}
        
        {/* Masonry Grid */}
        <Suspense fallback={
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        }>
          <MasonryGrid images={filteredImages} />
        </Suspense>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Light-Lock Gallery Demo &copy; {new Date().getFullYear()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Built with Next.js, TailwindCSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}



