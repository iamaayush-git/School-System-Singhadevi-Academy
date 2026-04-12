import { motion } from "framer-motion";
import ourMission from "../assets/ourMission.jpg";
import ourVision from "../assets/ourVision.jpg";


export default function VisionMission() {
  return (
    <section className="px-6 py-12 space-y-10">

      {/* Vision (image left, text right) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center gap-6"
      >
        <img
          src={ourVision}
          className="w-60 h-60 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            Our vision is to create a learning environment where every student can grow intellectually, socially, and emotionally. We aim to nurture curiosity, creativity, and critical thinking so that learners are not only academically strong but also confident in expressing their ideas. We envision a place where education goes beyond textbooks, encouraging students to explore, question, and innovate. By fostering a supportive and inclusive atmosphere, we strive to help every individual discover their full potential and become responsible, compassionate, and future-ready global citizens.
          </p>
        </div>
      </motion.div>

      {/* Mission (text left, image right) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row-reverse items-center gap-6"
      >
        <img
          src={ourMission}
          className="w-60 h-60 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide high-quality education with modern teaching methods and practical learning opportunities. We are committed to creating an engaging and student-centered learning environment where knowledge is delivered in a clear, effective, and meaningful way. By combining experienced educators, innovative teaching tools, and hands-on activities, we aim to bridge the gap between theory and real-world application. Our mission also focuses on building strong values, discipline, and lifelong learning habits so that students are well-prepared to face academic challenges and succeed in their future careers.
          </p>
        </div>
      </motion.div>

    </section>
  );
}