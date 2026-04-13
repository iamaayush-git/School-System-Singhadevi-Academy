import { motion } from "framer-motion";
import preschool from "../assets/preschool.png";
import primary from "../assets/primary.jpeg";
import secondary from "../assets/secondary.jpg";
import plus2 from "../assets/plus2.JPG";

const programs = [
  {
    title: "Pre-School",
    desc: "A joyful learning environment that builds strong foundational skills through play and creativity.",
    image: preschool,
  },
  {
    title: "Primary",
    desc: "Focuses on core academic development and curiosity-driven learning experiences.",
    image: primary,
  },
  {
    title: "Secondary",
    desc: "Strengthens critical thinking and prepares students for higher education.",
    image: secondary,
  },
  {
    title: "Plus-2",
    desc: "Advanced academic programs for university preparation and career growth.",
    image: plus2,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

export default function OurPrograms() {
  return (
    <section className="py-16 bg-gray-50 px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Programs
        </h2>

        <p className="text-gray-600 mt-3 text-sm md:text-base">
          We offer structured academic programs designed to support students
          at every stage of their educational journey.
        </p>
      </motion.div>

      {/* Cards (2 Column Layout) */}
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {programs.map((program, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition cursor-pointer"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {program.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {program.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}