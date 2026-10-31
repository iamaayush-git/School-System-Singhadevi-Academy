import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage.jsx";
import { carouselImages } from "../assets/optimizedImages.js";

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextImage = new Image();
      const next = carouselImages[(index + 1) % carouselImages.length];
      nextImage.srcset = next.srcSet;
      nextImage.sizes = "100vw";
    }, 1200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <OptimizedImage
            src={carouselImages[index].src}
            srcSet={carouselImages[index].srcSet}
            sizes="100vw"
            width={1920}
            height={1080}
            alt="Shree Singhadevi Academy campus"
            loading="eager"
            priority={index === 0}
            wrapperClassName="h-full w-full"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
