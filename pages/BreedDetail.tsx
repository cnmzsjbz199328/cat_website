
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Added Cat to the list of imports from lucide-react
import { Heart, ChevronLeft, Info, Activity, ShieldCheck, MapPin, Clock, Star, Zap, Droplets, Smile, MessageSquare, Brain, Cat } from 'lucide-react';
import { CURATED_BREEDS } from '../constants';
import { catService } from '../services/catService';
import { Breed, CatImage, FavoriteItem } from '../types';

interface BreedDetailProps {
  favorites: FavoriteItem[];
  toggleFavorite: (slug: string) => void;
  addToHistory: (slug: string) => void;
}

const TraitBar = ({ label, score, icon: Icon }: any) => (
  <div className="bg-gray-50 p-4 rounded-xl">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2 text-gray-600">
        <Icon size={16} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <span className="text-xs font-bold text-amber-600">{score}/5</span>
    </div>
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div 
        className="h-full bg-amber-500 rounded-full transition-all duration-1000" 
        style={{ width: `${(score / 5) * 100}%` }}
      />
    </div>
  </div>
);

export default function BreedDetail({ favorites, toggleFavorite, addToHistory }: BreedDetailProps) {
  const { slug } = useParams();
  const [breed, setBreed] = useState<Breed | null>(null);
  const [images, setImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  const isFavorite = favorites.some(f => f.slug === slug);

  useEffect(() => {
    const found = CURATED_BREEDS.find(b => b.slug === slug);
    if (found) {
      setBreed(found);
      addToHistory(found.slug);
      setLoading(true);
      catService.getBreedImages(found.theCatApiBreedId, 6).then(imgs => {
        setImages(imgs);
        setLoading(false);
      });
    }
  }, [slug]);

  if (!breed) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/breeds" className="flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors font-medium">
          <ChevronLeft size={20} />
          Back to Breeds
        </Link>
        <button 
          onClick={() => toggleFavorite(breed.slug)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${
            isFavorite 
            ? 'bg-rose-50 text-rose-600' 
            : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600'
          }`}
        >
          <Heart size={20} className={isFavorite ? 'fill-rose-600' : ''} />
          {isFavorite ? 'Favorited' : 'Save Breed'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visual Content */}
        <div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 mb-4 shadow-lg">
             {images.length > 0 ? (
               <img src={images[activeImg].url} alt={breed.displayNameEn} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center">
                 <Cat size={64} className="text-gray-300 animate-pulse" />
               </div>
             )}
          </div>
          <div className="grid grid-cols-6 gap-2">
            {images.map((img, idx) => (
              <button 
                key={img.id}
                onClick={() => setActiveImg(idx)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  activeImg === idx ? 'border-amber-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Essential Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-5xl font-black text-gray-900 mb-4">{breed.displayNameEn}</h1>
            <div className="flex flex-wrap gap-2">
              {breed.temperament.map(tag => (
                <span key={tag} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {breed.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapPin size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Origin</p>
                <p className="font-bold text-gray-800">{breed.origin}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Clock size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Life Span</p>
                <p className="font-bold text-gray-800">{breed.lifeSpan}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Activity size={20} /></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Coat Type</p>
                <p className="font-bold text-gray-800">{breed.coat}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <TraitBar label="Energy Level" score={breed.traits.energy} icon={Zap} />
             <TraitBar label="Intelligence" score={breed.traits.intelligence} icon={Brain} />
             <TraitBar label="Shedding" score={breed.traits.shedding} icon={Droplets} />
             <TraitBar label="Affection" score={breed.traits.affection} icon={Smile} />
             <TraitBar label="Social Needs" score={breed.traits.friendliness} icon={ShieldCheck} />
             <TraitBar label="Vocalization" score={breed.traits.vocalization} icon={MessageSquare} />
          </div>
        </div>
      </div>

      {/* Habits & Care Sections */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
          <BookOpen className="text-amber-600" />
          Habits & Professional Care
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section icon={Activity} title="Exercise & Play" content={breed.habitsCare.exercise} />
          <Section icon={Droplets} title="Grooming" content={breed.habitsCare.grooming} />
          <Section icon={Info} title="Feeding & Nutrition" content={breed.habitsCare.feeding} />
          <Section icon={ShieldCheck} title="Health Monitoring" content={breed.habitsCare.health} />
        </div>
      </div>
    </div>
  );
}

const Section = ({ icon: Icon, title, content }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">
      {content}
    </p>
  </div>
);

const BookOpen = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
