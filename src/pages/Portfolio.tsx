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
          Explore our diverse portfolio across various categories. Each image tells a unique story of love, emotion, and celebration.
        </motion.p>
      </div>
      
      <Gallery />

      {/* Video Section */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Cinematic <span className="text-amber-600">Films</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Experience the magic of motion. Our cinematic films capture the grand scale and the tiny details of your celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Pre-Wedding Love Story', url: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=1000', link: 'https://www.instagram.com/reel/DVOZ3HNk7WU/' },
              { title: 'Save the Date Film', url: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=1000', link: 'https://www.instagram.com/reel/DReov7mE5PW/' },
              { title: 'Haldi Ceremony Highlights', url: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&q=80&w=1000', link: 'https://www.instagram.com/reel/DSKgVIeCHeN/' },
            ].map((video, i) => (
              <a
                key={i}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img src={video.url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 bg-amber-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-white text-xl font-bold">{video.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
