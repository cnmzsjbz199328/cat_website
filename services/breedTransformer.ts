/**
 * API 数据转换层
 * 将 The Cat API 原始数据转换为应用的 Breed 接口格式
 */

interface ApiBreed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  adaptability: number;
  affection_level: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  [key: string]: any;
}

import { Breed } from '../types';

/**
 * 将 API temperament 字符串转换为数组
 * "Active, Energetic, Independent" => ["Active", "Energetic", "Independent"]
 */
function parseTemperament(tempStr: string): string[] {
  if (!tempStr) return [];
  return tempStr
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);
}

/**
 * 推断毛发长度
 * 基于毛发相关的 API 字段
 */
function inferCoatType(apiBreed: ApiBreed): 'Short' | 'Medium' | 'Long' | 'Hairless' {
  // 使用 hairless 字段
  if (apiBreed.hairless === 1) return 'Hairless';
  
  // 尝试从描述或品种名称推断
  const desc = `${apiBreed.name} ${apiBreed.description}`.toLowerCase();
  
  if (desc.includes('long') || desc.includes('longhair') || desc.includes('semi-long')) {
    return 'Long';
  }
  if (desc.includes('hairless') || desc.includes('naked')) {
    return 'Hairless';
  }
  if (desc.includes('semi') || desc.includes('medium')) {
    return 'Medium';
  }
  
  // 默认为 Short
  return 'Short';
}

/**
 * 生成摘要（summary）
 * 从 description 的前两句提取
 */
function generateSummary(description: string): string {
  if (!description) return '';
  
  // 提取前1-2句
  const sentences = description.match(/[^.!?]+[.!?]/g) || [];
  return (sentences[0] || description).trim().substring(0, 150);
}

/**
 * 生成饲养建议（habitsCare）
 * 基于 trait scores 和描述生成推理建议
 */
function generateHabitsCare(apiBreed: ApiBreed) {
  const high = (num: number) => num >= 4;
  const low = (num: number) => num <= 2;
  
  return {
    feeding: generateFeedingAdvice(apiBreed),
    grooming: generateGroomingAdvice(apiBreed),
    exercise: generateExerciseAdvice(apiBreed),
    health: generateHealthAdvice(apiBreed),
  };
}

function generateFeedingAdvice(breed: ApiBreed): string {
  const parts = [];
  
  if (breed.energy_level >= 4) {
    parts.push('High-energy breed requires high-protein diet');
  } else {
    parts.push('Moderate calorie diet recommended');
  }
  
  if (breed.health_issues >= 3) {
    parts.push('Monitor diet carefully and consult veterinarian');
  }
  
  return parts.join('. ') + '.';
}

function generateGroomingAdvice(breed: ApiBreed): string {
  if (breed.hairless === 1) {
    return 'High maintenance; weekly baths required. Regular ear and skin care essential.';
  }
  
  if (breed.grooming >= 4) {
    return 'High maintenance; daily or frequent brushing required to prevent matting.';
  } else if (breed.grooming >= 2) {
    return 'Moderate maintenance; brush 2-3 times per week.';
  }
  return 'Low maintenance; occasional brushing is sufficient.';
}

function generateExerciseAdvice(breed: ApiBreed): string {
  if (breed.energy_level >= 4) {
    return 'Very high energy; needs extensive playtime, climbing structures, and mental stimulation.';
  } else if (breed.energy_level >= 3) {
    return 'Moderate energy; enjoys interactive play and environmental enrichment.';
  }
  return 'Low energy; prefers calm environment with light activity.';
}

function generateHealthAdvice(breed: ApiBreed): string {
  if (breed.health_issues >= 3) {
    return 'Breed has known health predispositions. Regular veterinary check-ups recommended.';
  }
  return 'Generally healthy breed. Maintain regular wellness care.';
}

/**
 * 转换单个品种
 */
export function transformBreed(apiBreed: ApiBreed): Breed {
  return {
    id: apiBreed.id,
    slug: apiBreed.name.toLowerCase().replace(/\s+/g, '-'),
    displayNameEn: apiBreed.name,
    theCatApiBreedId: apiBreed.id,
    origin: apiBreed.origin || 'Unknown',
    lifeSpan: apiBreed.life_span ? `${apiBreed.life_span} years` : 'Unknown',
    coat: inferCoatType(apiBreed),
    temperament: parseTemperament(apiBreed.temperament),
    summary: generateSummary(apiBreed.description),
    description: apiBreed.description,
    habitsCare: generateHabitsCare(apiBreed),
    traits: {
      energy: apiBreed.energy_level || 3,
      shedding: apiBreed.shedding_level || 3,
      affection: apiBreed.affection_level || 3,
      friendliness: apiBreed.stranger_friendly || 3,
      vocalization: apiBreed.vocalisation || 2,
      intelligence: apiBreed.intelligence || 3,
    },
  };
}

/**
 * 批量转换多个品种
 */
export function transformBreeds(apiBreeds: ApiBreed[]): Breed[] {
  return apiBreeds
    .map(breed => {
      try {
        return transformBreed(breed);
      } catch (error) {
        console.error(`Failed to transform breed ${breed.id}:`, error);
        return null;
      }
    })
    .filter((breed): breed is Breed => breed !== null);
}
