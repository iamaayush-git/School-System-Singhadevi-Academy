import { motion } from "framer-motion";
import aboutus from "../assets/aboutus.png";


export default function About() {
  return (
    <div className="pb-12">

      {/* Top Banner Image */}
      <div className="w-full h-[80vh]">
        <img
          src={aboutus}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title + Intro */}
      <section className="px-6 py-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          About Our College
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Shree Singhadevi Academy is a modern and dynamic educational institution located in Koshi Province, Belbari-8, Morang District. The academy is dedicated to providing quality education up to Grade 12 across diverse academic and technical streams, including Science, Computer Science, and Hotel Management.

          At Shree Singhadevi Academy, we believe that every student is unique and deserves an environment that nurtures their individual talents and potential. Our mission is to deliver holistic education that combines academic excellence with practical skills, discipline, creativity, and personal growth. We are committed to helping each learner discover their strengths and prepare confidently for future challenges.

          The academy provides a supportive and inclusive learning atmosphere where students are encouraged to think critically, explore new ideas, and develop a passion for lifelong learning. We value creativity and innovation, ensuring that students are not limited to textbooks but are actively engaged in experiential and hands-on learning.

          To support this approach, Shree Singhadevi Academy is equipped with well-facilitated Science laboratories, modern Computer labs, and a fully functional Hotel Management lab, enabling students to gain real-world practical experience alongside theoretical knowledge. These facilities help bridge the gap between learning and application, preparing students for higher education and professional careers.

          We are committed to fostering academic excellence, technical competence, and strong moral values in our students. Through a balanced emphasis on Science, Technology, and Vocational studies, Shree Singhadevi Academy strives to shape responsible, skilled, and confident individuals who can contribute positively to society and succeed in their chosen paths.
        </motion.p>
      </section>
    </div>
  );
}