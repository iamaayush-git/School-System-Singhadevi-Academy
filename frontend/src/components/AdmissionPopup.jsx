import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage.jsx";
import {
  desktopAdmissionImage,
  mobileAdmissionImage,
} from "../assets/optimizedImages.js";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";


export default function AdmissionPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const preloadRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const image = new Image();
    image.fetchPriority = "high";
    image.sizes = isMobile
      ? "100vw"
      : "(max-width: 767px) 100vw, 896px";
    image.srcset = isMobile
      ? mobileAdmissionImage.srcSet
      : desktopAdmissionImage.srcSet;
    image.src = isMobile
      ? mobileAdmissionImage.src
      : desktopAdmissionImage.src;
    preloadRef.current = image;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      preloadRef.current = null;
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden bg-gray-200 shadow-2xl"
          >
            <OptimizedImage
              src={desktopAdmissionImage.src}
              srcSet={desktopAdmissionImage.srcSet}
              pictureSources={[
                {
                  media: "(max-width: 767px)",
                  srcSet: mobileAdmissionImage.srcSet,
                  sizes: "100vw",
                  type: "image/webp",
                },
              ]}
              sizes="(max-width: 767px) 100vw, 896px"
              width={960}
              height={540}
              alt="School admission information"
              loading="eager"
              priority
              wrapperClassName="h-full w-full"
              className="h-full w-full object-contain"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col">

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer absolute md:top-5 top-3 right-5 md:right-10  text-white text-3xl"
              >
                <ImCross className="md:size-10 size-5" />
              </button>

              <div className="mt-auto p-6 ">
                <button onClick={() => navigate("/admission")} className="cursor-pointer w-full py-4 text-lg font-bold rounded-xl 
                bg-gradient-to-r from-blue-500 via-orange-500 to-pink-500 
              text-white shadow-xl 
                hover:scale-105 hover:shadow-2xl 
                transition duration-300">
                  Click Here!
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}