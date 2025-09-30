import React from 'react';
import { motion } from 'framer-motion';
import library1 from '../assets/library-1.jpg';
import library2 from '../assets/library-2.jpg';
import library3 from '../assets/library-3.jpg';
import library4 from '../assets/library-4.jpg';
import library5 from '../assets/library-5.jpg';
import library6 from '../assets/library-6.jpg';

const libraryImages = [
  { src: library1, alt: 'Modern Library Interior' },
  { src: library2, alt: 'Ancient Manuscripts Collection' },
  { src: library3, alt: 'Reading Hall' },
  { src: library4, alt: 'Digital Library Section' },
  { src: library5, alt: 'Historic Archives' },
  { src: library6, alt: 'Grand Entrance Hall' },
];

const MovingLibraryImages: React.FC = () => {
  // Duplicate images for seamless loop
  const duplicatedImages = [...libraryImages, ...libraryImages];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-background-secondary to-background-accent py-8 border-y border-border-orange">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Moving container */}
      <motion.div 
        className="flex gap-6 moving-carousel"
        style={{ width: 'fit-content' }}
        animate={{ x: [0, -50 * libraryImages.length + '%'] }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative flex-shrink-0 group"
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-lg">
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-xl" />
              
              {/* Image title */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold drop-shadow-lg">
                  {image.alt}
                </h3>
              </div>
            </div>
            
            {/* 3D shadow effect */}
            <div className="absolute -bottom-2 left-2 w-full h-48 rounded-xl bg-black/10 blur-sm -z-10 group-hover:blur-md transition-all duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovingLibraryImages;