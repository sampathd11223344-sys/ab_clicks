import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          
          // Use a promise with a timeout to prevent hanging if the DB is not initialized
          const fetchRole = async () => {
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              if (userDoc.exists()) {
                setRole(userDoc.data().role);
              } else if (firebaseUser.email === 'sampathdadi0921@gmail.com' || firebaseUser.email === 'd6036883@gmail.com') {
                setRole('admin');
              }
            } catch (e) {
              console.error("Auth DB check failed:", e);
              // Fallback to admin based on email even if DB fetch fails
              if (firebaseUser.email === 'sampathdadi0921@gmail.com' || firebaseUser.email === 'd6036883@gmail.com') {
                setRole('admin');
              }
            }
          };

          // Give the DB check 3 seconds, otherwise proceed with email-only check
          await Promise.race([
            fetchRole(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
          ]).catch(() => {
            console.warn("Auth check timed out, falling back to email check.");
            if (firebaseUser.email === 'sampathdadi0921@gmail.com' || firebaseUser.email === 'd6036883@gmail.com') {
              setRole('admin');
            }
          });
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (err) {
        console.error("Auth observer error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { 
    user, 
    role, 
    loading, 
    isAdmin: role === 'admin' || user?.email === 'sampathdadi0921@gmail.com' || user?.email === 'd6036883@gmail.com' 
  };
}
