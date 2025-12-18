
export interface TraitScores {
  energy: number;
  shedding: number;
  affection: number;
  friendliness: number;
  vocalization: number;
  intelligence: number;
}

export interface Breed {
  id: string;
  slug: string;
  displayNameEn: string;
  theCatApiBreedId: string;
  summary: string;
  description: string;
  origin: string;
  lifeSpan: string;
  temperament: string[];
  coat: 'Short' | 'Medium' | 'Long' | 'Hairless';
  habitsCare: {
    feeding: string;
    grooming: string;
    exercise: string;
    health: string;
  };
  traits: TraitScores;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface FavoriteItem {
  slug: string;
  timestamp: number;
}
