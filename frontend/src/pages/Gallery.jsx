import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryData = [
  {
    title: "School Events",
    images: [
      "https://source.unsplash.com/600x400/?school,event",
      "https://source.unsplash.com/600x400/?students,celebration",
      "https://source.unsplash.com/600x400/?function,school",
    ],
  },
  {
    title: "Sports Activities",
    images: [
      "https://source.unsplash.com/600x400/?sports,school",
      "https://source.unsplash.com/600x400/?football,students",
      "https://source.unsplash.com/600x400/?cricket,school",
    ],
  },
  {
    title: "Classroom",
    images: [
      "https://source.unsplash.com/600x400/?classroom",
      "https://source.unsplash.com/600x400/?teaching",
      "https://source.unsplash.com/600x400/?students,study",
    ],
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);

  const open = (images, i) => {
    setSelected(images);
    setIndex(i);
  };

  const close = () => setSelected(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % selected.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + selected.length) % selected.length);
  };

  return (
    <section className="px-4 md:px-10 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Gallery</h2>

      {/* Categories */}
      {galleryData.map((section, sIndex) => (
        <div key={sIndex} className="mb-10">
          <h3 className="text-xl font-semibold mb-4">
            {section.title}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2">
            {section.images.map((img, i) => (
              <div
                key={i}
                onClick={() => open(section.images, i)}
                className="relative w-full aspect-square overflow-hidden cursor-pointer group"
              >
                <motion.img
                  src={img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Image */}
              <img
                src={selected[index]}
                className="w-full h-[300px] md:h-[500px] object-cover rounded-xl"
              />

              {/* Close */}
              <button
                onClick={close}
                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
              >
                ✕
              </button>

              {/* Prev */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded"
              >
                ◀
              </button>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded"
              >
                ▶
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}