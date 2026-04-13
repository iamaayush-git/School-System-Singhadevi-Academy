import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import admissionPopup from "../assets/admissionPopup.png";
import admissionPopupMobile from "../assets/admissionPopupMobile.png";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";


export default function AdmissionPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
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
            className="relative w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Background Image */}
            {/* Desktop Image */}
            <img
              src={admissionPopup}
              className="hidden md:block w-full h-full object-content"
            />

            {/* Mobile Image */}
            <img
              src={admissionPopupMobile}
              className="block md:hidden w-full h-full object-content"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col">

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer absolute top-5 right-10 text-white text-3xl"
              >
                <ImCross className="size-10" />
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