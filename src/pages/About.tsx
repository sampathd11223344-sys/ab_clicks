import { motion } from 'motion/react';
import { Camera, Users, Award, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Crafting <span className="text-amber-600">Visual</span> Masterpieces</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
              Founded in 2015, AB Clicks began with a simple passion: to tell stories through the lens. 
              Over the years, we've evolved into one of India's premier photography and videography services, 
              specializing in the vibrant, emotional, and grand celebrations of Indian culture.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
              Our approach is cinematic and emotional. We don't just take photos; we capture the essence of the moment—the 
              unspoken words, the shared glances, and the raw joy of celebration.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
                <div className="text-gray-500 dark:text-gray-500 text-sm font-medium uppercase tracking-wider">Weddings Shot</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
                <div className="text-gray-500 dark:text-gray-500 text-sm font-medium uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=1000"
                alt="Photographer at work"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-amber-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <Heart className="w-10 h-10 mb-4" />
              <p className="font-bold text-xl">Passion in Every Frame</p>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Meet the <span className="text-amber-600">Visionaries</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Arjun Bhardwaj', role: 'Lead Photographer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500' },
              { name: 'Sneha Rao', role: 'Cinematographer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500' },
              { name: 'Karan Singh', role: 'Editor', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500' },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-full overflow-hidden mb-6 border-4 border-amber-500/20 group-hover:border-amber-500 transition-all duration-500">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-2xl font-bold">{member.name}</h4>
                <p className="text-amber-600 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Camera, title: 'Quality', desc: 'We use the latest high-end gear to ensure every shot is crisp and cinematic.' },
            { icon: Users, title: 'Connection', desc: 'We build relationships with our clients to capture their true personalities.' },
            { icon: Award, title: 'Excellence', desc: 'Our work has been recognized for its artistic and technical brilliance.' },
          ].map((item, i) => (
            <div key={i} className="p-10 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
              <item.icon className="w-12 h-12 text-amber-600 mb-6" />
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
