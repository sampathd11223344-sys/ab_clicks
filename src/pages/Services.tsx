import ServiceCard from '../components/ServiceCard';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const ALL_SERVICES = [
  {
    title: 'Wedding Photography',
    description: 'Comprehensive coverage of your wedding day, from getting ready to the final farewell.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=75&w=800&fm=webp',
    features: ['Full Day Coverage', '2 Photographers', '1000+ Edited Photos', 'Premium Wedding Album', 'Online Gallery']
  },
  {
    title: 'Pre-Wedding Shoot',
    description: 'Romantic and artistic photoshoots at scenic locations to celebrate your engagement.',
    image: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=75&w=800&fm=webp',
    features: ['3-4 Locations', 'Outfit Changes', 'Drone Photography', 'Cinematic Teaser Video', 'All Raw Images']
  },
  {
    title: 'Cinematic Videography',
    description: 'High-definition cinematic films that tell your story like a Bollywood masterpiece.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=75&w=800&fm=webp',
    features: ['4K Video Quality', 'Cinematic Storytelling', 'Professional Sound Design', '15-20 Min Highlight Film', 'Full Event Recording']
  },
  {
    title: 'Maternity Shoot',
    description: 'Celebrate the glow of motherhood with a graceful and artistic photoshoot.',
    image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=75&w=800&fm=webp',
    features: ['Studio or Outdoor', 'Gown Rentals Available', 'Gentle Posing Guidance', 'Family Included', '20 Retouched Photos']
  },
  {
    title: 'Baby & Kids Shoot',
    description: 'Capture the innocent smiles and playful moments of your children.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=75&w=800&fm=webp',
    features: ['Fun Props & Themes', 'Patient Photographers', 'Home Setup Available', 'Digital Downloads', 'Custom Photo Book']
  },
  {
    title: 'Event Coverage',
    description: 'Professional photography for birthdays, anniversaries, and corporate events.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=75&w=800&fm=webp',
    features: ['Candid & Group Shots', 'Fast Turnaround', 'High-Res Digital Files', 'Social Media Ready', 'Professional Lighting']
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6">
      <SEO 
        title="Our Services" 
        description="Explore our photography and cinematography services. From wedding packages and pre-wedding shoots to cinematic event films and maternity sessions."
        keywords="photography services, wedding packages, cinematography services, event videography, maternity shoot"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-amber-600">Services</span> & Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light text-lg"
          >
            Choose from our carefully curated packages or contact us for a custom quote tailored to your specific needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ALL_SERVICES.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>

        {/* Custom Quote Section */}
        <div className="mt-24 bg-zinc-900 text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Package?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto font-light">
            Every event is unique. If our standard packages don't fit your vision, we're happy to create a bespoke plan just for you.
          </p>
          <a
            href="https://wa.me/918919852330?text=Hello%20AB%20Clicks,%20I%20want%20a%20custom%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition-all shadow-xl"
          >
            Get a Custom Quote
          </a>
        </div>
      </div>
    </div>
  );
}
