import { motion } from "framer-motion";

export default function Introduction() {
  return (
    <section className="px-6 py-12 text-center">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        Introduction
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Shree Singhadevi Academy is a modern learning institution dedicated to providing quality education with a strong focus on practical skills, discipline, and personal growth. We believe in nurturing students not only academically but also socially and morally, preparing them for real-world challenges and future success.

        Our academy creates a supportive and inspiring learning environment where students are encouraged to explore their potential, think critically, and develop creativity. We emphasize both theoretical knowledge and hands-on learning experiences to ensure a well-rounded education.

        Along with academic excellence, we promote extracurricular activities, leadership development, and teamwork to help students build confidence and communication skills. Our dedicated teachers work closely with students, guiding them at every step of their educational journey.

        At Shree Singhadevi Academy, we are committed to shaping responsible, skilled, and confident individuals who can contribute positively to society and achieve their dreams.
      </motion.p>
    </section>
  );
}