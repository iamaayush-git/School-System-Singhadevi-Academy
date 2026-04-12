import { motion } from "framer-motion";

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

export default function WhyChooseAcademy() {
  return (
    <section className="py-16 bg-white px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Why Choose Shree Singhadevi Academy
        </h2>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          We combine academic excellence with real-world experience to prepare students
          for rapidly growing industries. Our campus encourages creativity, leadership,
          and a global mindset.
        </p>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          Students benefit from industry-aligned curriculum, career counseling,
          internship opportunities, and supportive classroom communities.
        </p>
      </motion.div>

      {/* Cards with scroll animation */}
      <motion.div
        className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >

        {/* Card 1 */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.03 }}
          className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg mb-3">Highlights</h3>

          <ul className="space-y-2 text-gray-600 text-sm">
            <li>✔ Fully equipped labs and modern classrooms</li>
            <li>✔ Strong placement support and alumni network</li>
            <li>✔ Scholarship and financial aid guidance</li>
            <li>✔ International exchange programs</li>
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.03 }}
          className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold text-lg mb-3">
            Career-Focused Learning
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Our programs are designed to match industry needs, helping students
            build strong practical skills and real-world experience.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}