import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Qualified Teachers",
      desc: "Experienced and highly skilled teachers for better learning.",
    },
    {
      title: "Modern Labs",
      desc: "Well-equipped science and computer labs for practical learning.",
    },
    {
      title: "Library",
      desc: "Huge collection of books for knowledge and research.",
    },
    {
      title: "Sports Facilities",
      desc: "Indoor and outdoor games for physical development.",
    },
  ];

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-6 shadow-md rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}