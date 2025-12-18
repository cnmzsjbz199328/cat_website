
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Added BookOpen to the lucide-react imports
import { Search, Sparkles, Zap, Heart, Wind, Volume2, ArrowRight, Cat, BookOpen } from 'lucide-react';
import { Breed, CatImage } from '../types';
import { catService } from '../services/catService';

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const CategoryButton = ({ icon: Icon, label, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-3 group"
  >
    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl ${color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg`}>
      <Icon size={32} className="text-white" />
    </div>
    <span className="text-sm font-semibold text-gray-700">{label}</span>
  </button>
);

export default function Home({ recentlyViewed }: { recentlyViewed: string[] }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyCat, setDailyCat] = useState('');
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [breedImages, setBrédImages] = useState<Record<string, CatImage>>({});

  useEffect(() => {
    catService.getRandomCat().then(setDailyCat);
    
    // 加载所有品种
    catService.getAllBreeds().then(setAllBreeds);
  }, []);

  // 获取最近查看的品种的图片
  useEffect(() => {
    const loadHistoryImages = async () => {
      const images: Record<string, CatImage> = {};
      for (const slug of recentlyViewed.slice(0, 4)) {
        const breed = allBreeds.find(b => b.slug === slug);
        if (breed) {
          const imgs = await catService.getBreedImages(breed.theCatApiBreedId, 1);
          if (imgs.length > 0) {
            images[slug] = imgs[0];
          }
        }
      }
      setBrédImages(images);
    };
    
    if (allBreeds.length > 0) {
      loadHistoryImages();
    }
  }, [allBreeds, recentlyViewed]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/breeds?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const historyBreeds = allBreeds.filter(b => recentlyViewed.includes(b.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-bold mb-6">
            <Sparkles size={16} />
            <span>Discover your purr-fect companion</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8">
            The Ultimate <span className="text-amber-600">Cat Breed</span> Encyclopedia
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl">
            Explore {allBreeds.length}+ cat breeds with detailed information, temperament analysis, and professional photography.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={24} />
            <input
              type="text"
              placeholder="Search breeds (e.g. Siamese, Bengal...)"
              className="w-full pl-14 pr-32 py-5 rounded-2xl border-2 border-gray-100 focus:border-amber-500 focus:outline-none text-lg shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-3 bottom-3 bg-amber-600 text-white px-6 rounded-xl font-bold hover:bg-amber-700 transition-colors">
              Find
            </button>
          </form>
        </div>

        <div className="flex-1 relative w-full max-w-md">
          <div className="aspect-[4/5] bg-amber-100 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 relative">
             {dailyCat ? (
                <img src={dailyCat} alt="Random Cat" className="w-full h-full object-cover -rotate-2 scale-110" />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <Cat size={48} className="text-gray-400 animate-pulse" />
                </div>
             )}
             <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg -rotate-2">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Daily Meow</p>
                <p className="text-gray-800 font-medium italic">"A house is not a home without a cat."</p>
             </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Personality</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <CategoryButton icon={Zap} label="High Energy" color="bg-orange-500" onClick={() => navigate('/breeds?trait=energy')} />
          <CategoryButton icon={Heart} label="Affectionate" color="bg-rose-500" onClick={() => navigate('/breeds?trait=affection')} />
          <CategoryButton icon={BookOpen} label="Intelligent" color="bg-blue-500" onClick={() => navigate('/breeds?trait=intelligence')} />
          <CategoryButton icon={Volume2} label="Quiet Breeds" color="bg-emerald-500" onClick={() => navigate('/breeds?trait=vocal')} />
          <CategoryButton icon={Wind} label="Low Shedding" color="bg-purple-500" onClick={() => navigate('/breeds?trait=shedding')} />
        </div>
      </div>

      {/* Recently Viewed */}
      {historyBreeds.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            <Link to="/breeds" className="text-amber-600 font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {historyBreeds.map((breed) => (
              <Link 
                key={breed.slug}
                to={`/breed/${breed.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-white font-bold">{breed.displayNameEn}</p>
                </div>
                {breedImages[breed.slug] ? (
                  <img 
                    src={breedImages[breed.slug].url} 
                    alt={breed.displayNameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Cat size={32} className="text-gray-400 animate-pulse" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Cat} 
          title="Breed Standards" 
          desc="Learn about physical traits, ancestry, and the unique history of domestic cats worldwide."
          color="bg-amber-600"
        />
        <FeatureCard 
          icon={BookOpen} 
          title="Care Guides" 
          desc="Expert advice on grooming, nutrition, and exercise tailored to each specific breed's needs."
          color="bg-indigo-600"
        />
        <FeatureCard 
          icon={Heart} 
          title="Temperament" 
          desc="Detailed behavioral analysis to help you find a cat that matches your lifestyle and family."
          color="bg-rose-600"
        />
      </div>
    </div>
  );
}
