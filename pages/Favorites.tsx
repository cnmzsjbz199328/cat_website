
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Cat, ArrowRight, Trash2 } from 'lucide-react';
import { FavoriteItem, Breed } from '../types';
import { catService } from '../services/catService';

export default function Favorites({ favorites, toggleFavorite }: { favorites: FavoriteItem[], toggleFavorite: (slug: string) => void }) {
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catService.getAllBreeds().then(breeds => {
      setAllBreeds(breeds);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading breeds:', err);
      setLoading(false);
    });
  }, []);

  const favoriteBreeds = allBreeds.filter(b => favorites.some(f => f.slug === b.slug));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-500">Your personalized library of saved cat breeds.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-bold">
          <Heart size={20} className="fill-rose-600" />
          {favoriteBreeds.length} Saved
        </div>
      </div>

      {favoriteBreeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteBreeds.map((breed) => (
            <div 
              key={breed.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${breed.slug}/600/800`} 
                  alt={breed.displayNameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <button 
                  onClick={() => toggleFavorite(breed.slug)}
                  className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur rounded-full text-white hover:bg-rose-500 hover:text-white transition-colors z-30"
                >
                  <Trash2 size={20} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{breed.displayNameEn}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {breed.temperament.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/20 backdrop-blur rounded text-[10px] text-white uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/breed/${breed.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors"
                  >
                    View Full Guide
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <Heart size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No favorites yet</h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Start exploring breeds and tap the heart icon to save the ones you love to this list.
          </p>
          <Link 
            to="/breeds" 
            className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-colors flex items-center gap-2"
          >
            <Cat size={20} />
            Browse Breeds
          </Link>
        </div>
      )}
    </div>
  );
}
