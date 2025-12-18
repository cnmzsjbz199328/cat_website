
import { Breed } from './types';

export const CURATED_BREEDS: Breed[] = [
  {
    id: '1',
    slug: 'abyssinian',
    displayNameEn: 'Abyssinian',
    theCatApiBreedId: 'abys',
    origin: 'Ethiopia',
    lifeSpan: '12 - 15 years',
    coat: 'Short',
    temperament: ['Active', 'Energetic', 'Independent', 'Intelligent', 'Gentle'],
    summary: 'The Abyssinian is a highly active, curious cat that loves to explore every nook and cranny of their home.',
    description: 'Abyssinians are elegant, medium-sized cats with muscular bodies and alert, large ears. Their "ticked" coat, which features multiple bands of color on each hair, gives them a unique, wild appearance.',
    habitsCare: {
      feeding: 'Requires a high-quality, balanced diet to support their high energy levels. Monitor portion sizes to prevent obesity.',
      grooming: 'Low maintenance; weekly brushing is usually sufficient to remove loose hair.',
      exercise: 'Needs plenty of mental and physical stimulation. Cat trees and interactive puzzles are highly recommended.',
      health: 'Generally healthy, but susceptible to gingivitis and some genetic kidney issues.'
    },
    traits: {
      energy: 5,
      shedding: 3,
      affection: 4,
      friendliness: 5,
      vocalization: 1,
      intelligence: 5
    }
  },
  {
    id: '2',
    slug: 'bengal',
    displayNameEn: 'Bengal',
    theCatApiBreedId: 'beng',
    origin: 'USA',
    lifeSpan: '12 - 16 years',
    coat: 'Short',
    temperament: ['Alert', 'Agile', 'Energetic', 'Demanding', 'Intelligent'],
    summary: 'A wild-looking hybrid cat with striking spotted or marbled patterns and an incredibly high energy level.',
    description: 'Bengals are descended from crosses between domestic cats and Asian Leopard Cats. They are famous for their athletic ability and love of water.',
    habitsCare: {
      feeding: 'A protein-rich diet is essential. They are known for being active hunters if allowed outdoors.',
      grooming: 'Minimal shedding; brushing once a week helps keep the coat shiny and healthy.',
      exercise: 'Extremely high. They need vertical space and possibly leash-training for outdoor walks.',
      health: 'Watch for Hypertrophic Cardiomyopathy (HCM) and progressive retinal atrophy.'
    },
    traits: {
      energy: 5,
      shedding: 2,
      affection: 3,
      friendliness: 4,
      vocalization: 4,
      intelligence: 5
    }
  },
  {
    id: '3',
    slug: 'maine-coon',
    displayNameEn: 'Maine Coon',
    theCatApiBreedId: 'mcoo',
    origin: 'USA',
    lifeSpan: '12 - 15 years',
    coat: 'Long',
    temperament: ['Adaptable', 'Gentle', 'Social', 'Intelligent', 'Loving'],
    summary: 'The "Gentle Giant" of the cat world, known for its massive size, bushy tail, and tufted ears.',
    description: 'Maine Coons are one of the largest domesticated cat breeds. They have a rugged appearance and a sweet, bird-like chirping voice.',
    habitsCare: {
      feeding: 'Larger bodies require more calories, but maintain weight carefully. High-protein dry food helps dental health.',
      grooming: 'High maintenance. Requires thorough brushing 2-3 times a week to prevent matting in their dense fur.',
      exercise: 'Enjoys play but is generally more relaxed than the Bengal. They love interactive toys.',
      health: 'Predisposed to HCM and hip dysplasia due to their size.'
    },
    traits: {
      energy: 3,
      shedding: 4,
      affection: 5,
      friendliness: 5,
      vocalization: 3,
      intelligence: 4
    }
  },
  {
    id: '4',
    slug: 'siamese',
    displayNameEn: 'Siamese',
    theCatApiBreedId: 'siam',
    origin: 'Thailand',
    lifeSpan: '12 - 20 years',
    coat: 'Short',
    temperament: ['Active', 'Affectionate', 'Intelligent', 'Social', 'Vocal'],
    summary: 'The chatty socialite of cat breeds, famous for their striking blue eyes and dark "points" on their ears and limbs.',
    description: 'Siamese cats are extremely intelligent and communicative. They often follow their owners from room to room.',
    habitsCare: {
      feeding: 'Prone to pica (eating non-food items), so keep a safe environment. Feed measured meals.',
      grooming: 'Very low maintenance. Their short, fine coat needs minimal care.',
      exercise: 'Highly active. They love to climb and play fetch.',
      health: 'Check for respiratory issues and heart conditions common to the breed.'
    },
    traits: {
      energy: 4,
      shedding: 2,
      affection: 5,
      friendliness: 4,
      vocalization: 5,
      intelligence: 5
    }
  },
  {
    id: '5',
    slug: 'ragdoll',
    displayNameEn: 'Ragdoll',
    theCatApiBreedId: 'ragd',
    origin: 'USA',
    lifeSpan: '12 - 17 years',
    coat: 'Long',
    temperament: ['Affectionate', 'Friendly', 'Gentle', 'Quiet', 'Easy-going'],
    summary: 'Named for their tendency to go limp like a ragdoll when picked up, these cats are the ultimate lap companions.',
    description: 'Ragdolls are large, heavy cats with semi-long, silky hair and beautiful blue eyes.',
    habitsCare: {
      feeding: 'Moderation is key, as they are not as active as other breeds and can gain weight easily.',
      grooming: 'Despite long hair, it doesn\'t mat easily. Twice-weekly brushing is sufficient.',
      exercise: 'Relatively low energy. They prefer ground-level play and lots of cuddling.',
      health: 'Watch for bladder stones and HCM.'
    },
    traits: {
      energy: 2,
      shedding: 4,
      affection: 5,
      friendliness: 5,
      vocalization: 2,
      intelligence: 3
    }
  },
  {
    id: '6',
    slug: 'british-shorthair',
    displayNameEn: 'British Shorthair',
    theCatApiBreedId: 'bsho',
    origin: 'United Kingdom',
    lifeSpan: '12 - 17 years',
    coat: 'Short',
    temperament: ['Affectionate', 'Easy-going', 'Gentle', 'Loyal', 'Patient'],
    summary: 'Sturdy and plush, the British Shorthair is the quintessential "teddy bear" cat with a calm demeanor.',
    description: 'Known for its distinctively chunky body, broad face, and dense, velvety coat.',
    habitsCare: {
      feeding: 'Prone to obesity. Strict portion control and low-carb food are recommended.',
      grooming: 'Their dense coat requires weekly brushing to remove dead hair.',
      exercise: 'Low to moderate. They enjoy toys but aren\'t overly demanding.',
      health: 'Generally robust but can be prone to HCM.'
    },
    traits: {
      energy: 2,
      shedding: 3,
      affection: 3,
      friendliness: 4,
      vocalization: 1,
      intelligence: 3
    }
  },
  {
    id: '7',
    slug: 'russian-blue',
    displayNameEn: 'Russian Blue',
    theCatApiBreedId: 'rblu',
    origin: 'Russia',
    lifeSpan: '15 - 20 years',
    coat: 'Short',
    temperament: ['Active', 'Quiet', 'Shy', 'Intelligent', 'Loyal'],
    summary: 'A refined breed with a shimmering silvery-blue coat and brilliant emerald green eyes.',
    description: 'Russian Blues are reserved around strangers but deeply devoted to their primary caregivers.',
    habitsCare: {
      feeding: 'They love food! Be careful not to overfeed, as they will keep asking for more.',
      grooming: 'Low maintenance. Their thick double coat needs weekly brushing.',
      exercise: 'Moderate. They love playing with feathers and chasing laser pointers.',
      health: 'Very healthy breed with few genetic predispositions.'
    },
    traits: {
      energy: 3,
      shedding: 2,
      affection: 4,
      friendliness: 3,
      vocalization: 1,
      intelligence: 5
    }
  },
  {
    id: '8',
    slug: 'persian',
    displayNameEn: 'Persian',
    theCatApiBreedId: 'pers',
    origin: 'Iran',
    lifeSpan: '10 - 15 years',
    coat: 'Long',
    temperament: ['Affectionate', 'Loyal', 'Quiet', 'Sedentary', 'Sweet'],
    summary: 'The epitome of feline luxury, Persians are famous for their long, glamorous fur and flat, "pansy" faces.',
    description: 'A dignified breed that thrives in a calm, stable household.',
    habitsCare: {
      feeding: 'Use shallow bowls to accommodate their flat faces. High-quality wet food is often preferred.',
      grooming: 'Extremely high. Daily brushing is mandatory to prevent painful matting.',
      exercise: 'Very low. They prefer a comfortable pillow to a cat tower.',
      health: 'Watch for breathing issues, tear duct staining, and polycystic kidney disease (PKD).'
    },
    traits: {
      energy: 1,
      shedding: 5,
      affection: 5,
      friendliness: 4,
      vocalization: 1,
      intelligence: 2
    }
  }
];
