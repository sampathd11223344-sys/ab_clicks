import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Play } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  youtubeId?: string;
  link?: string;
  description?: string;
}

const SAMPLE_GALLERY: GalleryItem[] = [
  { 
    id: 'yt1', 
    title: 'Cover Song - Cinematic', 
    category: 'Films', 
    imageUrl: 'https://img.youtube.com/vi/Pxm1-79TffQ/maxresdefault.jpg', 
    youtubeId: 'Pxm1-79TffQ',
    description: 'A soulful cinematic cover song experience captured with emotional depth.'
  },
  { 
    id: 'yt2', 
    title: 'Half Saree Shoot', 
    category: 'Films', 
    imageUrl: 'https://img.youtube.com/vi/3oLWr50Jpho/maxresdefault.jpg', 
    youtubeId: '3oLWr50Jpho',
    description: 'Traditional Half Saree ceremony captured in a vibrant and cinematic style.'
  },
  { 
    id: 'yt3', 
    title: 'Haldi Teaser', 
    category: 'Wedding', 
    imageUrl: 'https://img.youtube.com/vi/biFwl_rXo-w/maxresdefault.jpg', 
    youtubeId: 'biFwl_rXo-w',
    description: 'Vibrant and joyful Haldi ceremony teaser full of colors and emotions.'
  },
  { 
    id: 'yt4', 
    title: 'Pre-Wedding Film', 
    category: 'Pre-Wedding', 
    imageUrl: 'https://img.youtube.com/vi/ib-6Vb_xmMA/maxresdefault.jpg', 
    youtubeId: 'ib-6Vb_xmMA',
    description: 'A romantic pre-wedding story told through cinematic visuals.'
  },
  { 
    id: 'yt5', 
    title: 'Wedding Teaser I', 
    category: 'Wedding', 
    imageUrl: 'https://img.youtube.com/vi/6iHnVsndmno/maxresdefault.jpg', 
    youtubeId: '6iHnVsndmno',
    description: 'The grand highlights of a beautiful wedding celebration.'
  },
  { 
    id: 'yt6', 
    title: 'Wedding Teaser II', 
    category: 'Wedding', 
    imageUrl: 'https://img.youtube.com/vi/1A-MGLuG9U0/maxresdefault.jpg', 
    youtubeId: '1A-MGLuG9U0',
    description: 'Emotional and grand moments from a royal wedding ceremony.'
  },
  { 
    id: 'yt7', 
    title: 'Save the Date', 
    category: 'Pre-Wedding', 
    imageUrl: 'https://img.youtube.com/vi/F_ziRbazfxc/maxresdefault.jpg', 
    youtubeId: 'F_ziRbazfxc',
    description: 'Creative and fun Save the Date film to announce the big day.'
  },
  { 
    id: 'yt8', 
    title: 'Birthday Candid', 
    category: 'Birthday', 
    imageUrl: 'https://img.youtube.com/vi/OQjfHyVHM1I/maxresdefault.jpg', 
    youtubeId: 'OQjfHyVHM1I',
    description: 'Candid moments from a joyful birthday celebration.'
  },
  { 
    id: 'yt9', 
    title: 'Birthday Celebration', 
    category: 'Birthday', 
    imageUrl: 'https://img.youtube.com/vi/yhrQHP3r6PE/maxresdefault.jpg', 
    youtubeId: 'yhrQHP3r6PE',
    description: 'A complete cinematic highlight of a special birthday event.'
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Films', 'Birthday'];
  const filteredItems = filter === 'All' ? SAMPLE_GALLERY : SAMPLE_GALLERY.filter(item => item.category === filter);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our <span className="text-amber-600">Portfolio</span></h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
          A collection of our finest work, capturing the essence of love, joy, and celebration through cinematic films.
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
              className="relative group cursor-pointer aspect-[4/5] overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              onClick={() => setSelectedItem(item)}
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
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                  {item.youtubeId ? (
                    <Play className="text-white w-8 h-8 fill-current ml-1" />
                  ) : (
                    <Maximize2 className="text-white w-8 h-8" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox / Video Player */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors z-[110]">
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
                {selectedItem.youtubeId ? (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=1`}
                      title={selectedItem.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-[4/5] md:aspect-auto md:max-h-[70vh] overflow-hidden">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-full object-contain"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                
                <div className="p-8 text-center bg-zinc-900">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                  <p className="text-amber-500 mb-4">{selectedItem.category}</p>
                  {selectedItem.description && (
                    <p className="text-gray-400 text-sm mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                      {selectedItem.description}
                    </p>
                  )}
                  {selectedItem.link && (
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition-all shadow-xl"
                    >
                      View on Instagram
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
