import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  link?: string;
  description?: string;
}

const SAMPLE_GALLERY: GalleryItem[] = [
  { 
    id: '1', 
    title: 'Grand Marriage Ceremony', 
    category: 'Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000', 
    link: 'https://www.instagram.com/p/DVig8fok_Vy/',
    description: 'A grand celebration of love and tradition, capturing the royal essence of an Indian wedding ceremony.'
  },
  { 
    id: '2', 
    title: 'Pre-Wedding Occasion', 
    category: 'Pre-Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=1000', 
    link: 'https://www.instagram.com/p/DVZ_zn8k1jp/',
    description: 'Intimate and romantic moments captured before the big day, set against a beautiful natural backdrop.'
  },
  { 
    id: '3', 
    title: 'Maternity Celebration', 
    category: 'Maternity', 
    imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=1000', 
    link: 'https://www.instagram.com/p/DVDajxLE8AT/',
    description: 'Celebrating the beautiful journey of motherhood with graceful and artistic portraits.'
  },
  { 
    id: '4', 
    title: 'Traditional Haldi Event', 
    category: 'Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&q=80&w=1000', 
    link: 'https://www.instagram.com/p/DRgiVIIk8qV/',
    description: 'The vibrant and joyful Haldi ceremony, filled with laughter, yellow hues, and traditional rituals.'
  },
  { 
    id: '5', 
    title: 'Save the Date Occasion', 
    category: 'Pre-Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=1000', 
    link: 'https://www.instagram.com/reel/DReov7mE5PW/',
    description: 'A cinematic save-the-date film that tells a unique love story with a modern touch.'
  },
  { 
    id: '6', 
    title: 'Wedding Haldi Ritual', 
    category: 'Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000', 
    link: 'https://www.instagram.com/reel/DR7Iwmuk1rw/',
    description: 'Capturing the raw emotions and cultural richness of a traditional Indian Haldi celebration.'
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Maternity', 'Baby', 'Portrait'];
  const filteredItems = filter === 'All' ? SAMPLE_GALLERY : SAMPLE_GALLERY.filter(item => item.category === filter);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our <span className="text-amber-600">Portfolio</span></h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
          A collection of our finest work, capturing the essence of love, joy, and celebration.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-zinc-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer aspect-[4/5] overflow-hidden rounded-3xl"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Always visible title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                <h4 className="text-white text-lg font-bold tracking-tight">{item.title}</h4>
                <p className="text-amber-500 text-xs font-medium uppercase tracking-wider">{item.category}</p>
              </div>
              
              {/* Hover effect for more details */}
              <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                  <Maximize2 className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-amber-500 transition-colors">
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-amber-500 mb-2">{selectedImage.category}</p>
                {selectedImage.description && (
                  <p className="text-gray-400 text-sm mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                    {selectedImage.description}
                  </p>
                )}
                {selectedImage.link && (
                  <a
                    href={selectedImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-full font-bold hover:bg-amber-700 transition-all"
                  >
                    View on Instagram
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
