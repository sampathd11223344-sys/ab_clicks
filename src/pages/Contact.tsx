import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6">
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
                <p className="text-gray-500 dark:text-gray-500">+91 89198 5233</p>
              </div>
              <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
                <Mail className="w-8 h-8 text-amber-600 mb-4" />
                <h4 className="font-bold mb-2">Email</h4>
                <p className="text-gray-500 dark:text-gray-500">hello@abclicks.com</p>
              </div>
              <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 sm:col-span-2">
                <MapPin className="w-8 h-8 text-amber-600 mb-4" />
                <h4 className="font-bold mb-2">Studio Location</h4>
                <p className="text-gray-500 dark:text-gray-500">Plot 42, Film Nagar, Jubilee Hills, Hyderabad, Telangana 500033</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Follow Our Journey</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center hover:bg-amber-600 transition-colors text-white"
                  >
                    <Icon className="w-6 h-6" />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222661234!2d78.4066!3d17.4126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96d8f8f8f8f8%3A0x8f8f8f8f8f8f8f8f!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <a
              href="https://wa.me/91891985233"
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
                <Instagram className="w-6 h-6 rotate-45" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
