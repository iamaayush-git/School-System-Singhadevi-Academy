import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage.jsx";
import { courseImages } from "../assets/optimizedImages.js";
import { RxCross1 } from "react-icons/rx";

const courseData = [
  {
    name: "Hotel Management",
    images: courseImages[0],
  },
  {
    name: "Science",
    images: courseImages[1],
  },
  {
    name: "Computer Science",
    images: courseImages[2],
  },
  {
    name: "Business Studies",
    images: courseImages[3],
  },
  {
    name: "Travel & Tourism",
    images: courseImages[4],
  },
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const openModal = (course) => {
    setSelectedCourse(course);
    setImgIndex(0);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const nextImg = () => {
    setImgIndex((prev) =>
      prev === selectedCourse.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImg = () => {
    setImgIndex((prev) =>
      prev === 0 ? selectedCourse.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full py-12 px-4 md:px-10 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Courses
        </h2>
        <p className="text-gray-500 mt-2">
          Explore different academic streams
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courseData.map((course, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            onClick={() => openModal(course)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
          >
            <OptimizedImage
              src={course.images[0].src}
              srcSet={course.images[0].srcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              width={960}
              height={540}
              alt={course.name}
              wrapperClassName="h-48 w-full"
              className="h-48 w-full object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                {course.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Click to view gallery
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full p-4 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md z-10"
              >
                <RxCross1 size={20} />
              </button>

              {/* Image */}
              <OptimizedImage
                src={selectedCourse.images[imgIndex].src}
                srcSet={selectedCourse.images[imgIndex].srcSet}
                sizes="(max-width: 672px) 100vw, 672px"
                width={1440}
                height={960}
                alt={`${selectedCourse.name} course`}
                loading="eager"
                priority
                wrapperClassName="h-64 w-full"
                className="w-full h-64 object-contain rounded-xl"
              />

              {/* Controls */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevImg}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Prev
                </button>
                <p className="text-gray-500 text-sm">
                  {imgIndex + 1} / {selectedCourse.images.length}
                </p>
                <button
                  onClick={nextImg}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Next
                </button>
              </div>

              {/* Title */}
              <h3 className="text-center mt-4 text-xl font-semibold">
                {selectedCourse.name}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}