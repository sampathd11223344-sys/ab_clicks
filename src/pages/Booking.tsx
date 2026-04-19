import { motion } from 'motion/react';
import BookingForm from '../components/BookingForm';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import SEO from '../components/SEO';

export default function Booking() {
  return (
    <div className="pt-32 pb-24 px-6">
      <SEO 
        title="Book a Shoot" 
        description="Book your next professional photoshoot with AB Clicks. Choose from wedding photography, pre-wedding films, maternity sessions, or event coverage."
        keywords="book photographer, hire wedding photographer, professional photoshoot booking, photography reservation"
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Book Your <span className="text-amber-600">Session</span></h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
                We're excited to be a part of your special journey. Fill out the form or reach out via WhatsApp to secure your date. 
                Our team will get in touch with you to discuss the details and customize your experience.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-2xl">
                  <Calendar className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Flexible Scheduling</h4>
                  <p className="text-gray-500 dark:text-gray-500 font-light">We work around your timeline to ensure the perfect lighting and mood.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-2xl">
                  <Clock className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Fast Delivery</h4>
                  <p className="text-gray-500 dark:text-gray-500 font-light">Get your sneak peeks within 48 hours and full gallery in 2-3 weeks.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-2xl">
                  <MapPin className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Location Scouting</h4>
                  <p className="text-gray-500 dark:text-gray-500 font-light">We help you find the most picturesque spots for your pre-wedding and portraits.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
              <h4 className="text-lg font-bold mb-4">Need Immediate Assistance?</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">Call us directly or chat with us for urgent bookings.</p>
              <div className="flex items-center gap-4 text-amber-600 font-bold text-xl">
                <Phone className="w-6 h-6" /> +91 89198 52330
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
