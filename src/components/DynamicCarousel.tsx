// components/DynamicCarousel.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchEvents, fetchImagesByEvent } from '@/redux/slices/gallerySlice';
import { ChevronLeft, ChevronRight, Play, Pause, Building } from 'lucide-react';

interface CarouselImage {
  _id: string;
  eventId: string;
  imageData: string;
  uploadedAt: string;
  title?: string;
  description?: string;
}

interface DynamicCarouselProps {
  themeClasses: {
    sectionBackground: string;
    cardBackground: string;
    borderDefault: string;
  };
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sectionIndex: number;
}

const DynamicCarousel: React.FC<DynamicCarouselProps> = ({ 
  themeClasses, 
  sectionRefs, 
  sectionIndex 
}) => {
  const dispatch = useDispatch();
  const { events, images, loading } = useSelector((state: RootState) => state.gallery);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);

  // Filter for Landing Page event - using exact name match
  const landingPageEvent = events.find(event => 
    event.name.toLowerCase() === 'landing page'
  );

  // Helper function to get image URL
  const getImageUrl = (imageData: string) => {
    if (imageData.startsWith('data:')) {
      return imageData;
    }
    return `data:image/jpeg;base64,${imageData}`;
  };

  // Fetch events
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents() as any);
    }
  }, [dispatch, events.length]);

  // Fetch images for Landing Page event
  useEffect(() => {
    if (landingPageEvent) {
      dispatch(fetchImagesByEvent(landingPageEvent._id) as any);
    }
  }, [landingPageEvent, dispatch]);

  // Update carousel images when images are fetched
  useEffect(() => {
    if (images.length > 0 && landingPageEvent) {
      // Filter images that belong to the Landing Page event
      const landingPageImages = images.filter(img => img.eventId === landingPageEvent._id);
      
      if (landingPageImages.length > 0) {
        const transformedImages = landingPageImages.map((image, index) => ({
          _id: image._id,
          eventId: image.eventId,
          imageData: image.imageData,
          uploadedAt: image.uploadedAt,
          title: getImageTitle(index),
          description: getImageDescription(index),
          alt: `Library Image ${index + 1}`
        }));
        setCarouselImages(transformedImages);
      }
    }
  }, [images, landingPageEvent]);

  // Helper functions for titles and descriptions
  const getImageTitle = (index: number) => {
    const titles = [
      'Grand Entrance Facade',
      'Spacious Reading Hall',
      'Rare Manuscripts Collection',
      'Modern Digital Infrastructure',
      'Serene Campus Environment',
      'Historic Library Architecture'
    ];
    return titles[index % titles.length];
  };

  const getImageDescription = (index: number) => {
    const descriptions = [
      'The magnificent Gothic/Scottish architecture of Prayagraj Public Library',
      'Peaceful environment for focused study and research',
      'Preserving ancient knowledge for future generations',
      'Blending traditional knowledge with modern technology',
      'Beautiful surroundings in Chandra Shekhar Azad Park',
      'A testament to intellectual heritage since 1864'
    ];
    return descriptions[index % descriptions.length];
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || carouselImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Show loading state
  if (loading && carouselImages.length === 0) {
    return (
      <section className={`py-20 ${themeClasses.sectionBackground}`}
        ref={(el: any) => sectionRefs.current[sectionIndex] = el}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Building className="h-8 w-8 text-primary-foreground" />
                </div>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Entrance Facade & Library Premises
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Loading gallery images...
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // If no images, return null or fallback
  if (carouselImages.length === 0) {
    return null;
  }

  return (
    <section className={`py-20 ${themeClasses.sectionBackground}`}
      ref={(el: any) => sectionRefs.current[sectionIndex] = el}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Building className="h-8 w-8 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Entrance Facade & Library Premises
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Explore the magnificent architecture and serene environment of our historic library
            </motion.p>
          </div>

          {/* Enhanced Image Carousel */}
          <motion.div
            className="relative bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
            whileHover={{ boxShadow: "var(--shadow-hero)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={getImageUrl(carouselImages[currentImageIndex].imageData)}
                  alt={carouselImages[currentImageIndex].title || 'Library Image'}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Image Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold text-white mb-3"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {carouselImages[currentImageIndex].title}
                  </motion.h3>
                  <motion.p
                    className="text-primary-foreground/90 text-lg max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {carouselImages[currentImageIndex].description}
                  </motion.p>
                </motion.div>
              </div>

              {/* Enhanced Navigation Arrows */}
              {carouselImages.length > 1 && (
                <>
                  <motion.button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </motion.button>

                  <motion.button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>

                  {/* Enhanced Play/Pause Button */}
                  <motion.button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </motion.button>
                </>
              )}
            </div>

            {/* Enhanced Image Indicators */}
            {carouselImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {carouselImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-primary scale-125'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicCarousel;