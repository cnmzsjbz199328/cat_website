
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search, ChevronRight, Star } from 'lucide-react';
import { CURATED_BREEDS } from '../constants';
import { Breed } from '../types';

export default function BreedList() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTrait = searchParams.get('trait') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCoat, setSelectedCoat] = useState<string>('All');
  
  const filteredBreeds = useMemo(() => {
    return CURATED_BREEDS.filter(breed => {
      const matchesSearch = breed.displayNameEn.toLowerCase().includes(query.toLowerCase()) || 
                            breed.temperament.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCoat = selectedCoat === 'All' || breed.coat === selectedCoat;
      
      let matchesTrait = true;
      if (initialTrait === 'energy') matchesTrait = breed.traits.energy >= 4;
      if (initialTrait === 'affection') matchesTrait = breed.traits.affection >= 4;
      if (initialTrait === 'intelligence') matchesTrait = breed.traits.intelligence >= 4;
      if (initialTrait === 'vocal') matchesTrait = breed.traits.vocalization <= 2;
      if (initialTrait === 'shedding') matchesTrait = breed.traits.shedding <= 2;

      return matchesSearch && matchesCoat && matchesTrait;
    });
  }, [query, selectedCoat, initialTrait]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Cat Breeds A-Z</h1>
        <p className="text-gray-500 max-w-2xl">
          Discover our curated database of common domestic cat breeds. Filter by physical traits or temperament.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter size={18} />
              Coat Length
            </h3>
            <div className="space-y-2">
              {['All', 'Short', 'Medium', 'Long', 'Hairless'].map((coat) => (
                <button
                  key={coat}
                  onClick={() => setSelectedCoat(coat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCoat === coat 
                    ? 'bg-amber-600 text-white font-medium shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {coat}
                </button>
              ))}
            </div>
          </div>

          {initialTrait && (
             <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-tighter mb-1">Active Filter</p>
                <p className="text-gray-700 font-medium">Top for: {initialTrait.charAt(0).toUpperCase() + initialTrait.slice(1)}</p>
                <Link to="/breeds" className="text-xs text-amber-600 hover:underline mt-2 inline-block">Clear trait filter</Link>
             </div>
          )}
        </aside>

        {/* Breed Grid */}
        <div className="flex-1">
          {filteredBreeds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBreeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No breeds found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {setQuery(''); setSelectedCoat('All')}}
                className="mt-6 text-amber-600 font-semibold hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const BreedCard = ({ breed }: { breed: Breed }) => {
  return (
    <Link 
      to={`/breed/${breed.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={`https://picsum.photos/seed/${breed.slug}/600/400`} 
          alt={breed.displayNameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-amber-600">
          {breed.coat}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {breed.displayNameEn}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {breed.summary}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-gray-700">{breed.traits.intelligence}/5</span>
            <span className="text-[10px] text-gray-400 font-medium ml-1">IQ</span>
          </div>
          <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
            Learn More
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};
