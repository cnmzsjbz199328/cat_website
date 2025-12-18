
import { CatImage } from '../types';

const THE_CAT_API_BASE = 'https://api.thecatapi.com/v1';
const CATAAS_BASE = 'https://cataas.com';

// Note: Using demo key or no key for public endpoints
const FETCH_CONFIG = {
  headers: {
    'x-api-key': 'live_WnU1gV6oWshI8Bv9Uv0rF2r8G9g2s2d3d4f5g6h7j8k9l0' // Example key or empty
  }
};

export const catService = {
  async getBreedImages(breedId: string, limit: number = 5): Promise<CatImage[]> {
    try {
      const response = await fetch(
        `${THE_CAT_API_BASE}/images/search?breed_ids=${breedId}&limit=${limit}`,
        FETCH_CONFIG
      );
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      return data.map((img: any) => ({
        id: img.id,
        url: img.url,
        width: img.width,
        height: img.height,
      }));
    } catch (error) {
      console.error('Error fetching breed images:', error);
      return [];
    }
  },

  async getRandomCat(): Promise<string> {
    // CATAAS simple random image
    return `${CATAAS_BASE}/cat?t=${Date.now()}`;
  },

  async getBreedThumbnails(breedIds: string[]): Promise<Record<string, string>> {
    // Fetch a single image for each breed to serve as a thumbnail
    const results: Record<string, string> = {};
    await Promise.all(
      breedIds.map(async (id) => {
        const imgs = await this.getBreedImages(id, 1);
        if (imgs.length > 0) {
          results[id] = imgs[0].url;
        }
      })
    );
    return results;
  }
};
