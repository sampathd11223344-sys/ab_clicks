import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Camera, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Gifts', path: '/gifts' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center group py-1">
          <img 
            src="https://ik.imagekit.io/ii90mdvyj/1776702280139.png" 
            alt="AB CLICKS" 
            className="h-12 w-12 rounded-full object-cover border-2 border-amber-500/20 brightness-110"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-amber-500',
                location.pathname === link.path
                  ? 'text-amber-600 dark:text-amber-500'
                  : 'text-gray-600 dark:text-gray-300'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-amber-600 dark:text-amber-500 border border-amber-500 px-3 py-1 rounded-full">
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={() => auth.signOut()}
              className="text-sm font-medium bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/booking"
              className="text-sm font-medium bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
            >
              Book Now
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-lg font-medium',
                    location.pathname === link.path ? 'text-amber-500' : 'text-gray-600 dark:text-gray-300'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    auth.signOut();
                    setIsOpen(false);
                  }}
                  className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium text-center"
                >
                  Book Now
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
