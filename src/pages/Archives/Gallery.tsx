import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Import your images from src/assets
import bookshelf1 from "@/assets/bookshelf-interior.jpg";
import bookshelf2 from "@/assets/bookshelf-interior1.jpg";
import digital1 from "@/assets/digital-section.jpg";
import digital2 from "@/assets/digital-section1.jpg";
import entrance from "@/assets/entrance-facade.jpg";

import img1 from "@/assets/IMG-20250925-WA0037.jpg";
import img2 from "@/assets/IMG-20250925-WA0038.jpg";
import img3 from "@/assets/IMG-20250925-WA0039.jpg";
import img4 from "@/assets/IMG-20250925-WA0040.jpg";
import img5 from "@/assets/IMG-20250925-WA0041.jpg";
import img6 from "@/assets/IMG-20250925-WA0042.jpg";
import img7 from "@/assets/IMG-20250925-WA0043.jpg";
import img8 from "@/assets/IMG-20250925-WA0044.jpg";
import img9 from "@/assets/IMG-20250925-WA0045.jpg";
import img10 from "@/assets/IMG-20250925-WA0046.jpg";
import img11 from "@/assets/IMG-20250925-WA0047.jpg";
import img12 from "@/assets/IMG-20250925-WA0048.jpg";

export default function Gallery() {
  const images = [
    bookshelf1, bookshelf2, digital1, digital2, entrance,
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">
          Photo Gallery
        </h1>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <Dialog key={index} onOpenChange={(open) => !open && setSelectedImage(null)}>
              <DialogTrigger asChild>
                <div
                  className="cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform bg-card"
                  onClick={() => setSelectedImage(src)}
                >
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 z-10 hover:bg-black"
                  >
                    <X size={20} />
                  </button>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="rounded-lg max-h-[80vh] w-auto mx-auto"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
