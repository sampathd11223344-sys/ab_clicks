import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Lazy load non-critical components
const WhatsAppButton = lazy(() => import('./WhatsAppButton'));
const PWAInstallPrompt = lazy(() => import('./PWAInstallPrompt'));

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppButton />
        <PWAInstallPrompt />
      </Suspense>
    </div>
  );
}
