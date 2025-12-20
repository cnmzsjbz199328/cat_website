
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Search, Home as HomeIcon, Info, Cat, BookOpen, Menu, X, ChevronRight, Github } from 'lucide-react';
import Home from './pages/Home';
import BreedList from './pages/BreedList';
import BreedDetail from './pages/BreedDetail';
import Favorites from './pages/Favorites';
import { FavoriteItem } from './types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Breeds', path: '/breeds', icon: Cat },
    { name: 'Favorites', path: '/favorites', icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-amber-600 font-bold text-xl group">
           <div className="p-2 rounded-xl group-hover:rotate-12 transition-transform">
             <img src="/favicon.png" alt="FelineFinder Logo" className="w-6 h-6" />
           </div>
          <span className="tracking-tight">FelineFinder</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === link.path 
                ? 'bg-amber-50 text-amber-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-4 px-4 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                location.pathname === link.path ? 'bg-amber-50 text-amber-600' : 'text-gray-600'
              }`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <div className="flex items-center justify-center md:justify-start gap-2 text-amber-600 font-bold text-lg mb-4">
          <img src="/favicon.png" alt="FelineFinder Logo" className="w-5 h-5" />
          <span>FelineFinder</span>
        </div>
        <p className="text-gray-500 text-sm">
          A premium dictionary for cat lovers. Curated knowledge on every breed, care advice, and beautiful photos.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
        <ul className="text-gray-500 text-sm space-y-2">
          <li><Link to="/breeds" className="hover:text-amber-600">Browse All Breeds</Link></li>
          <li><Link to="/favorites" className="hover:text-amber-600">My Favorites</Link></li>
          <li><a href="#" className="hover:text-amber-600">Care Guides</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Data Sources</h4>
        <p className="text-gray-500 text-sm mb-4">
          Powered by The Cat API & CATAAS. Built with love for feline companions.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4 text-gray-400">
          <Github size={20} className="hover:text-gray-900 cursor-pointer" />
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 text-xs mt-12">
      © {new Date().getFullYear()} FelineFinder. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('feline_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('feline_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('feline_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('feline_history', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.slug === slug);
      if (exists) return prev.filter(f => f.slug !== slug);
      return [...prev, { slug, timestamp: Date.now() }];
    });
  };

  const addToHistory = (slug: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s !== slug);
      return [slug, ...filtered].slice(0, 10);
    });
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home recentlyViewed={recentlyViewed} />} />
            <Route path="/breeds" element={<BreedList />} />
            <Route path="/breed/:slug" element={
              <BreedDetail 
                favorites={favorites} 
                toggleFavorite={toggleFavorite}
                addToHistory={addToHistory}
              />
            } />
            <Route path="/favorites" element={
              <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
