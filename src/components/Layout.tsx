import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import PWAInstallPrompt from './PWAInstallPrompt';

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <PWAInstallPrompt />
    </div>
  );
}
