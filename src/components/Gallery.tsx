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
    title: 'Serene Boat Wedding Shoot', 
    category: 'Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200', 
    link: 'https://www.instagram.com/p/DVig8fok_Vy/',
    description: 'A romantic boat ride capturing the serene beauty of a couple in traditional Indian wedding attire.'
  },
  { 
    id: '2', 
    title: 'Lakeside Pre-Wedding Bliss', 
    category: 'Pre-Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=80&w=1200', 
    link: 'https://www.instagram.com/p/DVZ_zn8k1jp/',
    description: 'Capturing intimate moments amidst the lily pads, a perfect pre-wedding celebration of love.'
  },
  { 
    id: '3', 
    title: 'Cinematic Gazebo Portraits', 
    category: 'Portrait', 
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200', 
    link: 'https://www.instagram.com/p/DVDajxLE8AT/',
    description: 'Elegant portraits captured under the soft glow of a white gazebo, creating a timeless cinematic feel.'
  },
  { 
    id: '4', 
    title: 'Vibrant Lakeside Celebration', 
    category: 'Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&q=80&w=1200', 
    link: 'https://www.instagram.com/p/DRgiVIIk8qV/',
    description: 'Joyful moments on the water, reflecting the vibrant colors and traditions of an Indian wedding.'
  },
  { 
    id: '5', 
    title: 'Graceful Maternity Portraits', 
    category: 'Maternity', 
    imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=1200', 
    link: 'https://www.instagram.com/reel/DReov7mE5PW/',
    description: 'Celebrating the beauty of motherhood with graceful portraits in a lush green setting.'
  },
  { 
    id: '6', 
    title: 'Joyful Save the Date', 
    category: 'Pre-Wedding', 
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=1200', 
    link: 'https://www.instagram.com/reel/DR7Iwmuk1rw/',
    description: 'A playful and joyful save-the-date moment, capturing the excitement of the journey ahead.'
  },
  { 
    id: '7', 
    title: 'Baby Milestone Shoot', 
    category: 'Baby', 
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200', 
    description: 'Capturing the innocent smiles and precious milestones of your little ones.'
  },
  { 
    id: '8', 
    title: 'Elegant Outdoor Portraits', 
    category: 'Portrait', 
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200', 
    description: 'Timeless outdoor portraits that capture the natural beauty and personality of our clients.'
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
                loading="lazy"
                decoding="async"
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
                loading="eager"
                decoding="async"
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
