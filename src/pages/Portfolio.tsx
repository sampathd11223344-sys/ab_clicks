import Gallery from '../components/Gallery';
import { motion } from 'motion/react';

export default function Portfolio() {
  return (
    <div className="pt-32 pb-24">
      <div className="px-6 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Visual <span className="text-amber-600">Stories</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light text-lg"
        >
          Explore our cinematic portfolio. Each film tells a unique story of love, emotion, and celebration.
        </motion.p>
      </div>
      
      <Gallery />
    </div>
  );
}
