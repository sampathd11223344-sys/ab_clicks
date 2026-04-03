import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'motion/react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Wedding Photography',
    description: 'Capturing the grand celebrations and intimate moments of your big day with a cinematic flair.',
    price: '45,000',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    features: ['Full Day Coverage', 'High-Res Edited Photos', 'Cinematic Highlight Video', 'Premium Wedding Album']
  },
  {
    title: 'Pre-Wedding Shoot',
    description: 'Tell your love story through beautiful, romantic shots at stunning locations.',
    price: '15,000',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    features: ['2-3 Locations', 'Multiple Outfit Changes', 'Drone Shots Included', 'Digital Gallery Access']
  },
  {
    title: 'Maternity & Baby',
    description: 'Cherish the beautiful journey of motherhood and the first smiles of your little one.',
    price: '10,000',
    image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=800',
    features: ['Home or Studio Session', 'Props Provided', 'Gentle Posing Guidance', 'Edited Digital Photos']
  }
];

const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Bride',
    text: 'AB Clicks captured our wedding so beautifully. Every time we look at the photos, we relive those moments. Highly recommended!',
    rating: 5
  },
  {
    name: 'Vikram Reddy',
    role: 'Client',
    text: 'The pre-wedding shoot was amazing. The team made us feel so comfortable and the results were beyond our expectations.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'New Mom',
    text: 'The maternity shoot was handled with such care. The photos are stunning and very emotional. Thank you AB Clicks!',
    rating: 5
  }
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Services Preview */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our <span className="text-amber-600">Services</span></h2>
              <p className="text-gray-600 dark:text-gray-400 font-light text-lg">
                We offer a wide range of photography and videography services tailored to your needs. 
                From traditional weddings to modern cinematic videos.
              </p>
            </div>
            <Link to="/services" className="text-amber-600 font-semibold flex items-center gap-2 hover:gap-4 transition-all">
              View All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <ServiceCard key={i} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <Gallery />

      {/* Testimonials */}
      <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Client <span className="text-amber-500">Stories</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">
              Don't just take our word for it. Here's what our wonderful clients have to say about their experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/5"
              >
                <Quote className="w-10 h-10 text-amber-500/30 mb-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 italic font-light leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-amber-500 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-amber-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-64 h-64 border-8 border-white rounded-full -ml-32 -mt-32" />
             <div className="absolute bottom-0 right-0 w-96 h-96 border-8 border-white rounded-full -mr-48 -mb-48" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to Capture Your Story?</h2>
            <p className="text-amber-100 text-xl mb-12 max-w-2xl mx-auto font-light">
              Book your session today and let us create timeless memories for you and your loved ones.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/booking"
                className="w-full sm:w-auto bg-white text-amber-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all shadow-xl"
              >
                Book Now
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
