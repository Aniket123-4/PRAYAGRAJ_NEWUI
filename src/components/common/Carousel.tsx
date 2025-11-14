import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";
import nagar from "../../assets/images/nagar.webp";
import townhall from "../../assets/images/townhall.webp";
import { motion } from "framer-motion";

const images = [nagar, townhall];

const Carousel = () => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
    },
    mode: "snap",
    loop: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (slider.current) {
        slider.current.next();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="w-full relative h-[70vh] rounded overflow-hidden">
      {/* Carousel Slides */}
      <div ref={sliderRef} className="keen-slider w-full h-full">
        {images.map((src, idx) => (
          <div
            className="keen-slider__slide flex justify-center items-center"
            key={idx}
          >
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40  flex items-center justify-center">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
            type: "spring",
          }}
          className="text-white text-3xl md:text-6xl font-bold text-center px-4 drop-shadow-lg leading-snug"
        >
          <span className="shadow-xl">Welcome to</span>
          <br />
          <span className="leading-tight">Nagar Palika E-Tax Portal</span>
        </motion.h1>
      </div>
    </div>
  );
};

export default Carousel;
