import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=2000"
          alt="Indian Wedding Photography"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-amber-400 font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
            Premium Photography & Videography
          </span>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
            Capturing <span className="text-amber-500">Moments</span>,<br />
            Creating <span className="italic font-serif">Memories</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Professional cinematic storytelling for weddings, events, and portraits. 
            Experience the magic of Indian cultural aesthetics through our lens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              Book Your Shoot <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
            >
              View Portfolio <Play className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements for Cinematic Feel */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 hidden lg:block"
      >
        <div className="w-24 h-24 border border-amber-500/30 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 border border-amber-500/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
