import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Youtube, MessageCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/ab_clicks_officials/', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@abclicks_000?si=t0gOSvttzlVIcpwd', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://wa.me/918919852330', label: 'WhatsApp' },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <SEO 
        title="Contact Us" 
        description="Get in touch with AB Clicks for professional photography and cinematography services. We are located near Srinivasa Theatre, Bypass Road, Yellamanchili."
        keywords="contact AB Clicks, photography studio contact, hire cinematic videographer, wedding photography inquiry"
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Get in <span className="text-amber-600">Touch</span></h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
                Have a question or ready to start your visual journey? We'd love to hear from you. 
                Our team is available to discuss your vision and help you plan the perfect shoot.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
                <Phone className="w-8 h-8 text-amber-600 mb-4" />
                <h4 className="font-bold mb-2">Phone</h4>
                <p className="text-gray-500 dark:text-gray-500">+91 89198 52330</p>
              </div>
              <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
                <Mail className="w-8 h-8 text-amber-600 mb-4" />
                <h4 className="font-bold mb-2">Email</h4>
                <p className="text-gray-500 dark:text-gray-500 text-sm break-all">anilkothalanka@gmail.com</p>
              </div>
              <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 sm:col-span-2">
                <MapPin className="w-8 h-8 text-amber-600 mb-4" />
                <h4 className="font-bold mb-2">Studio Location</h4>
                <p className="text-gray-500 dark:text-gray-500">Near Srinivasa Theatre, Bypass Road, Yellamanchili, AP, 531055</p>
                <a 
                  href="https://maps.app.goo.gl/oiiLU1imhFiXixi79" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-600 font-bold mt-4 hover:underline"
                >
                  Get Directions <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Follow Our Journey</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center hover:bg-amber-600 transition-colors text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map & Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900">
              <iframe
                src="https://maps.google.com/maps?q=AB%20CLICKS%20Yellamanchili%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <a
              href="https://wa.me/918919852330"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-8 bg-green-500 text-white rounded-3xl hover:bg-green-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <MessageCircle className="w-10 h-10" />
                <div>
                  <h4 className="text-xl font-bold">Chat on WhatsApp</h4>
                  <p className="text-green-100">Quick response within 1 hour</p>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
