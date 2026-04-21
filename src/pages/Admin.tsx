import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  CheckCircle, Clock, Trash2, ExternalLink, Filter, Search, User, LogIn, 
  Plus, Image as ImageIcon, Save, LayoutGrid, Package, ShoppingBag, X, Loader2 
} from 'lucide-react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'products'>('bookings');
  
  // Bookings state
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // Products state
  const [products, setProducts] = useState<any[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;

    // Listen to bookings
    const qb = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubBookings = onSnapshot(qb, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen to products
    const qp = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubProducts = onSnapshot(qp, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubBookings();
      unsubProducts();
    };
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    if (email !== 'sampathdadi0921@gmail.com' && email !== 'd6036883@gmail.com') {
      setLoginError('Invalid details. Access restricted.');
      setIsLoggingIn(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError('Invalid details or connection error.');
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => signOut(auth);

  // Booking handlers
  const handleStatusUpdate = async (id: string, status: string) => {
    await updateDoc(doc(db, 'bookings', id), { status });
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Delete this booking?')) {
      await deleteDoc(doc(db, 'bookings', id));
    }
  };

  // Product handlers
  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadProgress(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const imageUrlInput = formData.get('imageUrl') as string;
      const productData: any = {
        title: formData.get('title') as string,
        price: formData.get('price') as string,
        description: formData.get('description') as string,
        tag: formData.get('tag') as string,
        features: (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f),
        image: imageUrlInput || editingProduct?.image || '',
      };

      const fileInput = (e.currentTarget.elements.namedItem('imageFile') as HTMLInputElement);
      if (fileInput.files?.[0]) {
        const file = fileInput.files[0];
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
          alert('Cloudinary configuration missing. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your environment variables (Settings > Secrets).');
          setUploadProgress(false);
          return;
        }

        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', file);
        formDataCloudinary.append('upload_preset', uploadPreset);

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formDataCloudinary
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Cloudinary upload failed');
          }

          const data = await response.json();
          productData.image = data.secure_url;
        } catch (uploadError: any) {
          console.error("Cloudinary Error:", uploadError);
          alert(`Upload Error: ${uploadError.message}`);
          setUploadProgress(false);
          return;
        }
      }

      if (!productData.image) {
        alert('Please provide an image URL or upload a file');
        setUploadProgress(false);
        return;
      }

      const finalData = {
        ...productData,
        updatedAt: serverTimestamp()
      };

      if (editingProduct?.id) {
        await updateDoc(doc(db, 'products', editingProduct.id), finalData);
      } else {
        await addDoc(collection(db, 'products'), { ...finalData, createdAt: serverTimestamp() });
      }

      setIsAddingProduct(false);
      setEditingProduct(null);
      alert('Product saved successfully!');
    } catch (firestoreError: any) {
      console.error("Firestore Error:", firestoreError);
      alert(`Failed to save product: ${firestoreError.message}`);
    } finally {
      setUploadProgress(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  if (loading) return (
    <div className="pt-40 flex justify-center">
      <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
    </div>
  );

  if (!user || !isAdmin) {
    return (
      <div className="pt-40 pb-24 px-6 flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950">
        <SEO title="Admin Login" noindex={true} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 w-full max-w-md"
        >
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <LogIn className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
          <p className="text-gray-500 text-center mb-8 text-sm">Secure access for AB Clicks Management</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm font-medium ml-1 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold hover:bg-amber-700 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilter === 'all' || b.status === bookingFilter;
    const matchesSearch = b.name.toLowerCase().includes(bookingSearch.toLowerCase()) || 
                         b.phone.includes(bookingSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <SEO title="Admin Dashboard" noindex={true} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold tracking-tight">Admin <span className="text-amber-600">Console</span></h1>
              <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Protected
              </div>
            </div>
            <p className="text-gray-500">Welcome back, {user.email}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'bookings' ? 'bg-zinc-900 text-white shadow-lg' : 'text-gray-500 hover:text-amber-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Bookings
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'products' ? 'bg-zinc-900 text-white shadow-lg' : 'text-gray-500 hover:text-amber-600'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Gifts
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-800 mx-1" />
            <button onClick={handleLogout} className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
              <LogIn className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-6">
            <div className="flex flex-col md:row justify-between gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search client or phone..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex gap-2 p-1 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                {['all', 'pending', 'confirmed', 'completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setBookingFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
                      bookingFilter === f ? 'bg-amber-600 text-white' : 'text-gray-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredBookings.map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm"
                >
                  <div className="flex flex-col lg:row justify-between gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Client</span>
                        <h4 className="font-bold">{b.name}</h4>
                        <p className="text-xs text-gray-500">{b.phone}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Event</span>
                        <h4 className="font-bold text-amber-600">{b.eventType}</h4>
                        <p className="text-xs text-gray-500">{b.date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Location</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{b.location}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Status</span>
                        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase mt-1 ${
                          b.status === 'completed' ? 'text-green-500' : 
                          b.status === 'confirmed' ? 'text-blue-500' : 'text-amber-500'
                        }`}>
                          {b.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {b.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <button onClick={() => handleStatusUpdate(b.id, 'confirmed')} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><CheckCircle className="w-4 h-4" /></button>
                       <button onClick={() => handleStatusUpdate(b.id, 'completed')} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle className="w-4 h-4" /></button>
                       <button onClick={() => handleDeleteBooking(b.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Gift Inventory</h2>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(true);
                }}
                className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-amber-700 shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm group">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={p.image} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => {
                          setEditingProduct(p);
                          setIsAddingProduct(true);
                        }}
                        className="p-3 bg-white text-zinc-900 rounded-full hover:bg-amber-600 hover:text-white transition-all shadow-xl"
                        title="Edit Product"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-3 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl"
                        title="Delete Product"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {/* Persistent Edit/Delete for Mobile/Touch UX */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 lg:hidden">
                       <button 
                        onClick={() => {
                          setEditingProduct(p);
                          setIsAddingProduct(true);
                        }}
                        className="p-2.5 bg-white/90 backdrop-blur text-zinc-900 rounded-xl shadow-lg border border-white/20"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2.5 bg-red-500/90 backdrop-blur text-white rounded-xl shadow-lg border border-white/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{p.title}</h4>
                      <span className="text-amber-600 font-bold">{p.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-medium">
                      {p.features?.slice(0, 3).map((f: string, i: number) => (
                        <span key={i} className="bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full uppercase">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Modal */}
        <AnimatePresence>
          {isAddingProduct && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
              >
                <div className="p-8 border-b border-gray-50 dark:border-zinc-800 flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{editingProduct ? 'Edit' : 'Add New'} Product</h3>
                  <button onClick={() => setIsAddingProduct(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSaveProduct} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Title</label>
                        <input name="title" required defaultValue={editingProduct?.title} className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Price (e.g., ₹1300)</label>
                        <input name="price" required defaultValue={editingProduct?.price} className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Tag</label>
                        <input name="tag" placeholder="Door Delivery Free" defaultValue={editingProduct?.tag} className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Image (Upload File)</label>
                        <div className="relative group">
                          {editingProduct?.image ? (
                            <img 
                              src={editingProduct.image} 
                              className="w-full h-32 object-cover rounded-2xl" 
                              referrerPolicy="no-referrer" 
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 dark:border-zinc-700">
                              <ImageIcon className="w-8 h-8 mb-1" />
                              <span className="text-[10px] font-bold uppercase">Click to Upload</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            name="imageFile" 
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">OR Image Link (Cloudinary URL)</label>
                        <input 
                          name="imageUrl" 
                          placeholder="https://res.cloudinary.com/..." 
                          defaultValue={editingProduct?.image} 
                          className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-500" 
                        />
                        <p className="text-[10px] text-gray-400 mt-2 font-medium leading-relaxed">
                          Tip: Upload your image to Cloudinary and paste the <strong className="text-amber-600">Secure URL</strong> here.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Features (comma separated)</label>
                        <textarea name="features" defaultValue={editingProduct?.features?.join(', ')} className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px]" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
                    <textarea name="description" required defaultValue={editingProduct?.description} className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={uploadProgress}
                    className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-700 disabled:opacity-50 transition-all"
                  >
                    {uploadProgress ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

