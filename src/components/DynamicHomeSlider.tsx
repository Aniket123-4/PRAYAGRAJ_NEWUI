// components/DynamicHomeSlider.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchEvents } from '@/redux/slices/gallerySlice';
import api from '@/utils/Url'; // Import your API utility

interface HomeSliderImage {
  _id: string;
  eventId: string;
  imageData: string;
  uploadedAt: string;
}

const DynamicHomeSlider: React.FC = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state.gallery);
  const [homeSliderImages, setHomeSliderImages] = useState<HomeSliderImage[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter for Home event - using exact name match
  const homeEvent = events.find(event => 
    event.name.toLowerCase().trim() === 'home'
  );

  // Helper function
  const getImageUrl = (imageData: string) => {
    if (imageData.startsWith('data:')) {
      return imageData;
    }
    return `data:image/jpeg;base64,${imageData}`;
  };

  // Generate alt text and title for images
  const getImageDetails = (index: number) => {
    const details = [
      { alt: 'Modern Library Interior', title: 'Modern Library Interior' },
      { alt: 'Ancient Manuscripts Collection', title: 'Ancient Manuscripts Collection' },
      { alt: 'Reading Hall', title: 'Reading Hall' },
      { alt: 'Digital Library Section', title: 'Digital Library Section' },
      { alt: 'Historic Archives', title: 'Historic Archives' },
      { alt: 'Grand Entrance Hall', title: 'Grand Entrance Hall' }
    ];
    return details[index % details.length];
  };

  // Fetch events
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents() as any);
    }
  }, [dispatch, events.length]);

  // Fetch images for Home event directly from API
  useEffect(() => {
    const fetchHomeImages = async () => {
      if (homeEvent && homeSliderImages.length === 0) {
        setLoading(true);
        try {
          console.log('Fetching home slider images for event:', homeEvent._id);
          const response = await api.get(`/gallery/${homeEvent._id}/images`);
          console.log('Home slider API response:', response.data);
          
          if (response.data && response.data.length > 0) {
            const sliderImages = response.data.slice(0, 6).map((img: any) => ({
              _id: img._id,
              eventId: img.eventId,
              imageData: img.imageData,
              uploadedAt: img.uploadedAt,
            }));
            setHomeSliderImages(sliderImages);
          }
        } catch (error) {
          console.error('Error fetching home slider images:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHomeImages();
  }, [homeEvent, homeSliderImages.length]);

  // Show loading state
  if (loading && homeSliderImages.length === 0) {
    return (
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-background-secondary to-background-accent py-8 border-y border-border-orange">
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </motion.div>
          <p className="text-muted-foreground">Loading slider images...</p>
        </div>
      </div>
    );
  }

  // If no home images after loading, return null
  if (!loading && homeSliderImages.length === 0) {
    console.log('No home slider images found');
    return null;
  }

  console.log('Home slider images:', homeSliderImages);

  // Duplicate images for seamless loop
  const duplicatedImages = [...homeSliderImages, ...homeSliderImages];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-background-secondary to-background-accent py-8 border-y border-border-orange">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Moving container */}
      <motion.div 
        className="flex gap-6 moving-carousel"
        style={{ width: 'fit-content' }}
        animate={{ x: [0, -50 * homeSliderImages.length + '%'] }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((image, index) => {
          const imageDetails = getImageDetails(index % homeSliderImages.length);
          
          return (
            <motion.div
              key={`${image._id}-${index}`}
              className="relative flex-shrink-0 group"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-lg">
                {/* Dynamic Image from API */}
                <img
                  src={getImageUrl(image.imageData)}
                  alt={imageDetails.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-xl" />
                
                {/* Image title */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold drop-shadow-lg">
                    {imageDetails.title}
                  </h3>
                </div>
              </div>
              
              {/* 3D shadow effect */}
              <div className="absolute -bottom-2 left-2 w-full h-48 rounded-xl bg-black/10 blur-sm -z-10 group-hover:blur-md transition-all duration-300" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default DynamicHomeSlider;