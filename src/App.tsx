import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Gifts from './pages/Gifts';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="booking" element={<Booking />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="gifts" element={<Gifts />} />
        </Route>
      </Routes>
    </Router>
  );
}
