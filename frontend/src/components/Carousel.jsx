import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carousel1 from "../assets/carousel1.webp";
import carousel2 from "../assets/carousel2.webp";
import carousel3 from "../assets/carousel3.webp";


export default function Carousel() {
  const images = [
    carousel1,
    carousel2,
    carousel3,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change slide every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Buttons
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded"
      >
        ◀
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded"
      >
        ▶
      </button> */}
    </div>
  );
}
