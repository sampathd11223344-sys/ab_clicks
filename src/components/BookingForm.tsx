import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  eventType: z.string().min(1, 'Please select an event type'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(3, 'Location is required'),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
        uid: auth.currentUser?.uid || 'anonymous',
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const values = watch();
    const phoneNumber = '918919852330';
    const message = `Hello AB Clicks, I want to book a ${values.eventType || 'shoot'} on ${values.date || 'a specific date'}. My name is ${values.name || 'Ravi'}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-zinc-900 p-12 rounded-3xl shadow-2xl text-center max-w-xl mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
        </div>
        <h3 className="text-3xl font-bold mb-4">Booking Received!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for choosing AB Clicks. We will review your request and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
        >
          Book Another Session
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              {...register('name')}
              className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="e.g. Ravi Kumar"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              {...register('phone')}
              className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all"
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Event Type</label>
            <select
              {...register('eventType')}
              className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all"
            >
              <option value="">Select Event</option>
              <option value="Wedding">Wedding</option>
              <option value="Pre-Wedding">Pre-Wedding</option>
              <option value="Maternity">Maternity</option>
              <option value="Baby Shoot">Baby Shoot</option>
              <option value="Birthday">Birthday</option>
              <option value="Cinematic Video">Cinematic Video</option>
            </select>
            {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Event Date</label>
            <input
              type="date"
              {...register('date')}
              className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Location</label>
          <input
            {...register('location')}
            className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all"
            placeholder="e.g. Hyderabad, Telangana"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message (Optional)</label>
          <textarea
            {...register('message')}
            rows={4}
            className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all"
            placeholder="Tell us more about your vision..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
          </button>
          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> Book via WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
