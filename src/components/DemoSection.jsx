import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DemoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            See <span className="text-yellow-300">FormEase</span> in Action!
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Explore how FormEase simplifies form booking, document handling, and
            automation for students — all in one place.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-white/90 transition-all"
            >
              ▶ Watch Demo
            </button>
            <a
              href="#features"
              className="border border-white/60 px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right Image Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-lg"
        >
          <img
            src="https://cdn.dribbble.com/userupload/14058958/file/original-3a9bda1c1e80b8a9c266c07c7e0541e1.png?resize=1600x1200"
            alt="FormEase Demo"
            className="w-[500px] h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-white text-4xl bg-indigo-600/80 p-4 rounded-full hover:scale-110 transition"
            >
              ▶
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full aspect-video"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="FormEase Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 bg-white/20 p-2 rounded-full hover:bg-white/40 transition"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DemoSection;
