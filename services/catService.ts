
import { CatImage, Breed } from '../types';
import { transformBreeds } from './breedTransformer';

const THE_CAT_API_BASE = 'https://api.thecatapi.com/v1';
const CATAAS_BASE = 'https://cataas.com';

// Note: Using demo key or no key for public endpoints
const FETCH_CONFIG = {
  headers: {
    'x-api-key': 'demo_key'
  }
};

// 缓存管理
const CACHE = {
  breeds: null as Breed[] | null,
  breedsExpiry: 0,
};

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24小时

export const catService = {
  /**
   * 获取所有猫咪品种
   * 使用缓存避免频繁 API 请求
   */
  async getAllBreeds(): Promise<Breed[]> {
    // 检查缓存是否有效
    if (CACHE.breeds && Date.now() < CACHE.breedsExpiry) {
      console.log('Using cached breeds');
      return CACHE.breeds;
    }

    try {
      const response = await fetch(
        `${THE_CAT_API_BASE}/breeds`,
        FETCH_CONFIG
      );
      if (!response.ok) throw new Error('Failed to fetch breeds');
      
      const apiBreeds = await response.json();
      const transformedBreeds = transformBreeds(apiBreeds);
      
      // 按字母顺序排序
      transformedBreeds.sort((a, b) => 
        a.displayNameEn.localeCompare(b.displayNameEn)
      );
      
      // 更新缓存
      CACHE.breeds = transformedBreeds;
      CACHE.breedsExpiry = Date.now() + CACHE_TTL;
      
      return transformedBreeds;
    } catch (error) {
      console.error('Error fetching breeds:', error);
      // 如果有旧缓存，返回旧缓存（降级处理）
      if (CACHE.breeds) {
        console.warn('Using stale cache due to API error');
        return CACHE.breeds;
      }
      return [];
    }
  },

  /**
   * 获取单个品种（通过 slug 或 API ID）
   */
  async getBreed(identifier: string): Promise<Breed | null> {
    const breeds = await this.getAllBreeds();
    return breeds.find(b => b.slug === identifier || b.theCatApiBreedId === identifier) || null;
  },

  /**
   * 搜索品种（按名称或气质）
   */
  async searchBreeds(query: string): Promise<Breed[]> {
    const breeds = await this.getAllBreeds();
    const q = query.toLowerCase();
    
    return breeds.filter(breed =>
      breed.displayNameEn.toLowerCase().includes(q) ||
      breed.temperament.some(t => t.toLowerCase().includes(q)) ||
      breed.origin.toLowerCase().includes(q)
    );
  },

  /**
   * 过滤品种（按毛发长度）
   */
  async getBreedsByCoat(coat: 'Short' | 'Medium' | 'Long' | 'Hairless'): Promise<Breed[]> {
    const breeds = await this.getAllBreeds();
    return breeds.filter(b => b.coat === coat);
  },

  /**
   * 清空缓存（用于更新）
   */
  clearCache(): void {
    CACHE.breeds = null;
    CACHE.breedsExpiry = 0;
  },

  /**
   * 获取品种的猫咪图片
   */
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

  /**
   * 获取随机猫咪图片
   */
  async getRandomCat(): Promise<string> {
    // CATAAS simple random image
    return `${CATAAS_BASE}/cat?t=${Date.now()}`;
  },

  /**
   * 获取多个品种的缩略图
   */
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
