import { motion } from 'motion/react';
import { ShoppingBag, Truck, Gift, CheckCircle } from 'lucide-react';

const PRODUCTS = [
  {
    id: '1',
    title: 'Candid Memory Frame (12x18)',
    price: '₹1300',
    description: 'High-quality printed frame with premium finish, perfect for special memories',
    tag: 'Door Delivery Free',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
    features: ['Premium Matte Finish', 'Durable Wood Frame', 'High-Res Printing', 'Wall Mount Ready']
  },
  {
    id: '2',
    title: 'Couple Frame (10x15)',
    price: '₹700',
    description: 'Beautiful couple frame with clear print and elegant design',
    tag: 'Available for Delivery',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    features: ['Elegant Design', 'Crystal Clear Glass', 'Perfect for Gifting', 'Tabletop or Wall Mount']
  },
  {
    id: '3',
    title: 'Custom Gift Frames',
    price: 'Starting from ₹500',
    description: 'Customized frames for birthdays, weddings, and special occasions',
    tag: 'Personalized',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    features: ['Fully Customizable', 'Multiple Sizes', 'Collage Options', 'Fast Turnaround']
  }
];

export default function Gifts() {
  return (
    <div className="pt-32 pb-24">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, i) => (
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
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.tag}
                  </span>
                </div>
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
                  {product.features.map((feature, idx) => (
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
