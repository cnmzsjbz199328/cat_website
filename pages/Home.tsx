
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
    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full font-medium text-sm transition-colors bg-white border border-gray-200 hover:${color} hover:bg-opacity-10 hover:border-current group`}
  >
    <Icon size={16} className="flex-shrink-0 text-gray-700 group-hover:text-current transition-colors" />
    <span className="text-gray-800 group-hover:text-current transition-colors">{label}</span>
  </button>
);

export default function Home({ recentlyViewed }: { recentlyViewed: string[] }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyCat, setDailyCat] = useState('');
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [breedImages, setBrédImages] = useState<Record<string, CatImage>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [randomQuote, setRandomQuote] = useState('');
  const [isHoveringDobby, setIsHoveringDobby] = useState(false);

  // Local image files from public folder - add your image filenames here
  const localImages = [
    '/cat-1.jpg',
    '/cat-2.jpg',
    '/cat-3.jpg',
    '/cat-4.jpg',
    '/cat-5.jpg',
  ];

  // Cat quotes collection
  const catQuotes = [
    "A house is not a home without a cat.",
    "Cats are connoisseurs of comfort.",
    "In a cat's eyes, all things belong to cats.",
    "Cats have it all – admiration, an endless supply of food, and immortality.",
    "A cat is a puzzle for which there is no answer.",
    "Cats choose us; we don't own them.",
    "The smallest feline is a masterpiece.",
    "Cats are intended to teach us that not everything in nature has a purpose.",
    "Way down deep, we're all motivated by the same urges. Cats just help us get in touch with them.",
    "A meow massages the heart.",
    "Cats are little lions that love us.",
    "The cat is nature's masterpiece.",
    "Cats are my life. I am a cat in my soul.",
    "A cat's meow can be many things – a greeting, a question, a demand, a greeting.",
    "Purring is the cat's way of saying all is well with the world.",
  ];

  useEffect(() => {
    catService.getRandomCat().then(setDailyCat);
    
    // 加载所有品种
    catService.getAllBreeds().then(setAllBreeds);

    // Set random quote on page load
    const randomIndex = Math.floor(Math.random() * catQuotes.length);
    setRandomQuote(catQuotes[randomIndex]);

    // Carousel rotation for local images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % localImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
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
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8">
            The Ultimate <span className="text-amber-600">Cat Breed</span> Encyclopedia
          </h1>
          <p className="text-xl text-gray-500 mb-4 max-w-2xl">
            Explore {allBreeds.length}+ cat breeds with detailed information, temperament analysis, and professional photography.
          </p>
          
          {/* Memorial Section for Dobby */}
          <div
            className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 p-6 rounded-lg mb-10 max-w-2xl cursor-pointer relative overflow-auto flex-1 min-h-[160px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[8rem]"
            style={{ minHeight: '160px' }}
            onMouseEnter={() => setIsHoveringDobby(true)}
            onMouseLeave={() => setIsHoveringDobby(false)}
          >
            {/* Chinese Text */}
            <p className={`text-gray-700 leading-relaxed absolute inset-0 p-4 transition-opacity duration-700 text-left ${
              isHoveringDobby ? 'opacity-0' : 'opacity-100'
            }`}>
              <span className="font-bold text-amber-600">怀念哆比</span> - 哆比的名字来源于《哈利波特》中忠诚的家养小精灵。哆比的主人深深地爱着它，但遗憾的是在它去世时没能陪伴在身边。人世间的事，遗憾多有。但万物皆是如此，生前有人尊重和怜爱，死后有人怀念，已经是难得的幸福。希望失去孩子的主人可以勇敢地看向前方，也希望包括小猫在内的所有生命都能得到温柔的对待。
            </p>
            
            {/* English Text */}
            <p className={`text-sm text-gray-700 leading-relaxed absolute inset-0 p-4 transition-opacity duration-700 text-left ${
              isHoveringDobby ? 'opacity-100' : 'opacity-0'
            }`}>
              <span className="font-bold text-amber-600">In loving memory of Dobby</span> - named after the loyal house-elf from Harry Potter. Dobby's owner cherished him deeply, though sadly wasn't by his side at the end. Life is filled with such sorrows, yet this is the nature of all things. To be loved and cherished in life, and remembered fondly after - that is a rare blessing. We hope Dobby's owner finds courage to look forward, and wish all creatures, including beloved Dobby, the gentle care and affection they deserve.
            </p>
          </div>


        </div>

        <div className="flex-1 relative w-full max-w-md">
          <div className="aspect-[4/5] bg-amber-100 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 relative">
             <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden">
               {localImages.length > 0 ? (
                  <div className="w-full h-full relative">
                    {localImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Cat ${idx + 1}`}
                        className={`absolute w-full h-full object-cover -rotate-2 scale-110 transition-opacity duration-1000 ${
                          idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
               ) : dailyCat ? (
                  <img src={dailyCat} alt="Random Cat" className="w-full h-full object-cover -rotate-2 scale-110" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Cat size={48} className="text-gray-400 animate-pulse" />
                  </div>
               )}
             </div>
             <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg -rotate-2">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Daily Meow</p>
                <p className="text-gray-800 font-medium italic">"{randomQuote}"</p>
             </div>
             
             {/* Image carousel indicators */}
             {localImages.length > 1 && (
               <div className="absolute top-4 right-4 flex gap-2">
                 {localImages.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => setCurrentImageIndex(idx)}
                     className={`w-2 h-2 rounded-full transition-all ${
                       idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                     }`}
                   />
                 ))}
               </div>
             )}
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-0">
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6 group flex items-center gap-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search breeds (e.g. Siamese, Bengal...)"
            className="w-full pl-12 pr-24 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none text-base shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-4 py-1.5 rounded-lg font-semibold text-base hover:bg-amber-700 transition-colors">
            Find
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="mb-24 flex items-center justify-center gap-8 flex-wrap">
        <div className="flex flex-wrap justify-center gap-1">
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
