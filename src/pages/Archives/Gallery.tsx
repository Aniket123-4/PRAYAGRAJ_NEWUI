import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  Download,
  Play,
  Pause
} from "lucide-react";
import { RootState } from "@/redux/store";
import { fetchEvents, fetchImagesByEvent } from "@/redux/slices/gallerySlice";

export default function Gallery() {
  const dispatch = useDispatch();
  const { events, images, loading } = useSelector((state: RootState) => state.gallery);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Helper function to get image URL from Base64 data
  const getImageUrl = (imageData: string) => {
    if (imageData.startsWith('data:')) {
      return imageData;
    }
    return `data:image/jpeg;base64,${imageData}`;
  };

  useEffect(() => {
    dispatch(fetchEvents() as any);
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0 && !selectedEvent) {
      setSelectedEvent(events[0]._id);
    }
  }, [events, selectedEvent]);

  useEffect(() => {
    if (selectedEvent) {
      dispatch(fetchImagesByEvent(selectedEvent) as any);
    }
  }, [selectedEvent, dispatch]);

  const currentEvent = events.find(event => event._id === selectedEvent);

  // Modal navigation functions
  const openImageModal = (imageData: string, index: number) => {
    setSelectedImage(getImageUrl(imageData));
    setCurrentImageIndex(index);
    setZoomLevel(1);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setIsAutoPlaying(false);
  };

  const nextImage = () => {
    if (images.length === 0) return;
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(getImageUrl(images[nextIndex].imageData));
    setZoomLevel(1);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(getImageUrl(images[prevIndex].imageData));
    setZoomLevel(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeImageModal();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentImageIndex, images.length, isAutoPlaying]);

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying || !selectedImage) return;

    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedImage, currentImageIndex, images.length]);

  // Zoom functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  // Download image
  const downloadImage = () => {
    if (!selectedImage) return;
    
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `gallery-image-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Photo Gallery
        </motion.h1>

        {/* Event Filter */}
        {events.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {events.map((event) => (
              <motion.button
                key={event._id}
                onClick={() => setSelectedEvent(event._id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  selectedEvent === event._id
                    ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-lg scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-102"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {event.name}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Event Description */}
        {currentEvent?.description && (
          <motion.div 
            className="text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentEvent.description}
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-primary" />
            </motion.div>
          </motion.div>
        )}

        {/* Image Grid */}
        {!loading && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image._id}
                className="cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-card group relative"
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openImageModal(image.imageData, index)}
                layoutId={`image-${image._id}`}
              >
                <img
                  src={getImageUrl(image.imageData)}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                  >
                    <ZoomIn className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && selectedEvent && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-muted-foreground text-xl">
              No images found for this event.
            </div>
          </motion.div>
        )}

        {/* Enhanced Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <Dialog open={!!selectedImage} onOpenChange={closeImageModal}>
              <DialogContent className="max-w-7xl w-full h-full max-h-[90vh] p-0 bg-transparent border-none shadow-none overflow-hidden">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center bg-black/95 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={closeImageModal}
                    className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-3 z-50 hover:bg-black/80 transition-all duration-300 border border-white/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-4 z-50 hover:bg-black/80 transition-all duration-300 border border-white/20 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft size={28} />
                      </motion.button>

                      <motion.button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-4 z-50 hover:bg-black/80 transition-all duration-300 border border-white/20 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight size={28} />
                      </motion.button>
                    </>
                  )}

                  {/* Toolbar */}
                  <div className="absolute top-4 left-4 flex gap-2 z-50">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1 bg-black/60 rounded-full p-2 backdrop-blur-sm border border-white/20">
                      <motion.button
                        onClick={handleZoomOut}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={zoomLevel <= 1}
                      >
                        <ZoomOut size={20} />
                      </motion.button>
                      
                      <span className="text-white text-sm px-2 min-w-[60px] text-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      
                      <motion.button
                        onClick={handleZoomIn}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={zoomLevel >= 3}
                      >
                        <ZoomIn size={20} />
                      </motion.button>

                      {zoomLevel > 1 && (
                        <motion.button
                          onClick={handleZoomReset}
                          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors text-xs font-medium"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Reset
                        </motion.button>
                      )}
                    </div>

                    {/* Slideshow Controls */}
                    {images.length > 1 && (
                      <motion.button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="bg-black/60 text-white rounded-full p-3 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </motion.button>
                    )}

                    {/* Download Button */}
                    <motion.button
                      onClick={downloadImage}
                      className="bg-black/60 text-white rounded-full p-3 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download size={20} />
                    </motion.button>
                  </div>

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white rounded-full px-4 py-2 z-50 backdrop-blur-sm border border-white/20">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}

                  {/* Main Image with Slide Animation */}
                  <AnimatePresence mode="wait" custom={1}>
                    <motion.img
                      key={currentImageIndex}
                      src={selectedImage}
                      alt={`Gallery image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                      style={{ scale: zoomLevel }}
                      //@ts-ignore
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={1}
                      drag={zoomLevel > 1}
                      dragConstraints={{
                        top: -100,
                        left: -100,
                        right: 100,
                        bottom: 100,
                      }}
                      whileDrag={{ cursor: 'grabbing' }}
                      onClick={zoomLevel === 1 ? nextImage : undefined}
                    />
                  </AnimatePresence>

                  {/* Image Navigation Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setSelectedImage(getImageUrl(images[index].imageData));
                            setZoomLevel(1);
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}