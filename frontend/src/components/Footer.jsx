import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-10">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-4 text-center"
      >
        <h2 className="text-2xl font-bold">Visit Shree Singhadevi Academy</h2>

        <p>
          📞{" "}
          <a href="tel:+9779700842644" className="text-blue-400 hover:underline">
            +977-970-084-2644
          </a>
        </p>

        <p>
          💬{" "}
          <a
            href="https://wa.me/9779700842644"
            target="_blank"
            className="text-green-400 hover:underline"
          >
            WhatsApp Chat
          </a>
        </p>

        <p>
          ✉️{" "}
          <a
            href="mailto:info@shreesinghadevi.edu.np"
            className="text-blue-400 hover:underline"
          >
            info@shreesinghadevi.edu.np
          </a>
        </p>

        <p>
          🌐{" "}
          <a
            href="https://shreesinghadevi.edu.np"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            shreesinghadevi.edu.np
          </a>
        </p>

        <p className="text-gray-400 pt-4">
          Shree Singhadevi Academy is committed to building bright futures with
          practical training and supportive learning.
        </p>
      </motion.div>

    </footer>
  );
}