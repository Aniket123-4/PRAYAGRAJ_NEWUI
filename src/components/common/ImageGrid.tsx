import React from "react";
import { motion } from "framer-motion";
import Hero from "../../assets/images/Hero.webp";
import grid2Image from "../../assets/images/grid2.jpg";
import gridImage3 from "../../assets/images/grid3Image.webp";
import gridImage4 from "../../assets/images/grid4.webp";

const ImageGrid: React.FC = () => {
  const images = [Hero, grid2Image, gridImage3, gridImage4];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 relative">
      {images.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: index * 0.2 }}
          className="relative w-full flex justify-center items-center transition-transform duration-300"
        >
          {/* Blobs */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-20 -right-10 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          {/* Image */}
          <img
            src={src}
            alt={`Gallery ${index + 1}`}
            className="relative w-full max-w-xs rounded-lg drop-shadow-2xl"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
