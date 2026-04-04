import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold tracking-tighter text-amber-500">AB CLICKS</span>
          </Link>
          <p className="text-gray-400 font-light leading-relaxed">
            Capturing the soul of Indian weddings and events with a cinematic touch. 
            Based in India, serving worldwide.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-amber-500">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'About', 'Services', 'Portfolio', 'Booking', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-500 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-amber-500">Services</h4>
          <ul className="space-y-4">
            {['Wedding Shoots', 'Pre-Wedding', 'Maternity', 'Baby Shoots', 'Cinematography', 'Event Coverage'].map((item) => (
              <li key={item} className="text-gray-400">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-amber-500">Get In Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Yellamanchili, Andhra Pradesh, 531055</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <span>+91 89198 52330</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Mail className="w-5 h-5 text-amber-500 shrink-0" />
              <span>anilkothalanka@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-zinc-900 flex flex-col md:row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} AB Clicks Photography. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-amber-500">Privacy Policy</a>
          <a href="#" className="hover:text-amber-500">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
