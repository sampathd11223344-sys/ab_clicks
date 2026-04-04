import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  index: number;
}

export default function ServiceCard({ title, description, features, image, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-zinc-800"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                <Check className="w-3 h-3 text-amber-600 dark:text-amber-500" />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          to="/booking"
          className="block w-full text-center bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 py-3 rounded-xl font-semibold transition-all"
        >
          Book This Service
        </Link>
      </div>
    </motion.div>
  );
}
