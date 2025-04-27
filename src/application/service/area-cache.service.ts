import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisCachePort } from '@/application/port/out/cache.port';
import { LoadAreasPort } from '@/application/port/out/load-areas.port';
import { CheckAreaPort } from '@/application/port/out/check-area.port';
import { NEAREST_AREAS_CACHE_TTL, DEFAULT_AREA_LIMIT } from '@/shared/constants';
import { AreaDomain } from '@/domain/area/area.domain';

export type CachedAreas = {
  main: AreaDomain;
  neighbors: AreaDomain[];
};  

@Injectable()
export class AreaCacheService {
  private readonly logger = new Logger(AreaCacheService.name);

  constructor(
    @Inject('RedisCachePort')
    private readonly cache: RedisCachePort,
    @Inject('LoadAreasPort')
    private readonly loadAreasPort: LoadAreasPort,
    @Inject('CheckAreaPort')
    private readonly checkAreaPort: CheckAreaPort,
  ) {}

  getCacheKey(userId: number): string {
    return `last-area:${userId}`;
  }
  
  isPointInArea(area: AreaDomain | undefined, latitude: number, longitude: number): boolean {
    return !!area && this.checkAreaPort.containsPoint(area.polygon, latitude, longitude);
  }

  splitMainAndNeighbors(areas: AreaDomain[], latitude: number, longitude: number): CachedAreas | null {
    const main = areas.find(area => this.isPointInArea(area, latitude, longitude));
    if (!main) return null;
    const neighbors = areas.filter(area => area.id !== main.id);
    return { main, neighbors };
  }
  
  async getCachedAreas(userId: number): Promise<CachedAreas | null> {
    return this.cache.get<CachedAreas>(this.getCacheKey(userId));
  }
  
  async updateCache(userId: number, main: AreaDomain, neighbors: AreaDomain[]): Promise<void> {
    await this.cache.set(this.getCacheKey(userId), { main, neighbors }, NEAREST_AREAS_CACHE_TTL);
  }
  
  async fetchNearestAreas(longitude: number, latitude: number, limit?: number): Promise<AreaDomain[]> {
    if (!limit) limit = DEFAULT_AREA_LIMIT;
    return this.loadAreasPort.findNearestAreas(longitude, latitude, limit);
  }
}