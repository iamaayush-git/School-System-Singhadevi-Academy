import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const API = import.meta.env.VITE_API_URL;

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  //Fetch gallery
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API}/api/gallery`);
        setGalleries(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGallery();
  }, []);

  // open modal
  const openModal = (images, index) => {
    setSelectedImages(images);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImages([]);
    setCurrentIndex(0);
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 md:px-10 py-10">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        School Gallery
      </h1>

      {/* GALLERIES */}
      <div className="space-y-12">
        {galleries.map((g) => (
          <div key={g._id}>

            {/* TITLE */}
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              {g.title}
            </h2>

            {/* IMAGES GRID */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
              {g.images.map((img, i) => (
                <motion.div
                  key={img._id}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square overflow-hidden cursor-pointer"
                  onClick={() => openModal(g.images, i)}
                >
                  <img
                    src={img.url}
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {selectedImages.length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 bg-white text-black p-2 rounded-full"
            >
              <RxCross1 size={20} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={currentIndex}
              src={selectedImages[currentIndex].url}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* CONTROLS */}
            <button
              onClick={prev}
              className="absolute left-5 text-white text-3xl"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-5 text-white text-3xl"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}