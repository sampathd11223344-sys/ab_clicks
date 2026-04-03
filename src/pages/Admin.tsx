import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Clock, Trash2, ExternalLink, Filter, Search, User, LogIn } from 'lucide-react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleStatusUpdate = async (id: string, status: string) => {
    await updateDoc(doc(db, 'bookings', id), { status });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      await deleteDoc(doc(db, 'bookings', id));
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="pt-40 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-8">
          <LogIn className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Please log in to access the admin dashboard and manage bookings.
        </p>
        <button
          onClick={handleLogin}
          className="bg-amber-600 text-white px-10 py-4 rounded-full font-bold hover:bg-amber-700 transition-all flex items-center gap-2"
        >
          <User className="w-5 h-5" /> Login with Google
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400">
          You do not have administrative privileges to view this page.
        </p>
      </div>
    );
  }

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'all' || b.status === filter;
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         b.phone.includes(searchTerm) ||
                         b.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin <span className="text-amber-600">Dashboard</span></h1>
            <p className="text-gray-500 dark:text-gray-500">Manage your bookings and client requests.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-1 rounded-xl">
              {['all', 'pending', 'confirmed', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                    filter === f ? 'bg-amber-600 text-white shadow-md' : 'text-gray-500 hover:text-amber-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:row justify-between gap-6">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Client</span>
                      <h4 className="font-bold text-lg">{booking.name}</h4>
                      <p className="text-sm text-gray-500">{booking.phone}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Event</span>
                      <h4 className="font-bold text-lg text-amber-600">{booking.eventType}</h4>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Location</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{booking.location}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Status</span>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {booking.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {booking.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                      className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                      title="Confirm"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking.id, 'completed')}
                      className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all"
                      title="Complete"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <a
                      href={`https://wa.me/${booking.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all"
                      title="WhatsApp"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                {booking.message && (
                  <div className="mt-4 pt-4 border-t border-gray-50 dark:border-zinc-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{booking.message}"</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredBookings.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800">
              <p className="text-gray-500">No bookings found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
