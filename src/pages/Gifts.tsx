import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { ShoppingBag, Truck, Gift, CheckCircle, Loader2 } from 'lucide-react';

export default function Gifts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-32 pb-24">
      <SEO 
        title="Gifts & Frames" 
        description="Preserve your memories with beautifully crafted frames and custom gifts from AB Clicks. Browse our collection of memory frames, couple frames, and personalized gifts."
        keywords="custom frames, photo gifts, personalized frames, memory frames, AB Clicks gifts"
      />
      <div className="px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 px-4 py-2 rounded-full text-sm font-bold mb-6"
        >
          <Gift className="w-4 h-4" />
          <span>Gifts & Frames</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Preserve Your <span className="text-amber-600">Memories</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light text-lg"
        >
          Beautifully crafted frames and custom gifts to keep your special moments alive forever.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800 group hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {product.tag && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-amber-600 transition-colors">
                      {product.title}
                    </h3>
                    <span className="text-amber-600 font-bold text-lg">{product.price}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 font-light leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {product.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/918919852330?text=I'm interested in the ${product.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-800 text-white py-4 rounded-2xl font-bold hover:bg-amber-600 dark:hover:bg-amber-600 transition-all shadow-lg group/btn"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Order via WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">New products coming soon!</p>
          </div>
        )}

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-amber-50 dark:bg-amber-900/10 rounded-[3rem] p-12 text-center border border-amber-100 dark:border-amber-900/30"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
              <Truck className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Fast & Secure Delivery</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            We ensure your precious frames are packed with care and delivered safely to your doorstep. 
            Free delivery available on selected products in Yellamanchili and surrounding areas.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
