
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AreaDomain } from '../../domain/area/area.domain';
import { CreateAreaUseCase } from '../port/in/create-area.usecase';
import { GetAreasUseCase } from '../port/in/get-areas.usecase';
import { CreateAreaPort } from '../port/out/create-area.port';
import { LoadAreasPort } from '../port/out/load-areas.port';
import { AreaCacheService, CachedAreas } from './area-cache.service';

@Injectable()
export class AreaService implements CreateAreaUseCase, GetAreasUseCase {
  private readonly logger = new Logger(AreaService.name);
  constructor(
    @Inject('CreateAreaPort')
    private readonly createAreaPort: CreateAreaPort,
    @Inject('LoadAreasPort')
    private readonly loadAreasPort: LoadAreasPort,
    private readonly areaCacheService: AreaCacheService
  ) {}

  async create(areaInput: AreaDomain): Promise<AreaDomain> {
    try {
      this.logger.log('Creating area');
      const area = AreaDomain.create(areaInput.name, areaInput.polygon);
      return this.createAreaPort.create(area);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to create area');
    }
  }

  async findAll(): Promise<AreaDomain[]> {
    try {
      this.logger.log('Finding all areas');
      return this.loadAreasPort.findAll();
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to find all areas');
    }
  }

  async findNearestAreas(userId: number, longitude: number, latitude: number, limit?: number): Promise<CachedAreas | null> {
    let cached = await this.areaCacheService.getCachedAreas(userId);
  
    if (this.areaCacheService.isPointInArea(cached?.main, latitude, longitude)) {
      this.logger.log('Cache hit: location is inside main area');
      return cached;
    }
  
    if (cached?.neighbors?.length) {
      const neighbor = cached.neighbors.find(area => this.areaCacheService.isPointInArea(area, latitude, longitude));
      if (neighbor) {
        this.logger.log('Cache hit: location is inside neighbor area');
        const areas = await this.areaCacheService.fetchNearestAreas(longitude, latitude, limit);
        const newCache = this.areaCacheService.splitMainAndNeighbors(areas, latitude, longitude);
        if (newCache) {
          await this.areaCacheService.updateCache(userId, newCache.main, newCache.neighbors);
          return newCache;
        }
        return null;
      }
    }
  
    this.logger.log('Cache miss, querying DB for nearest areas');
    const areas = await this.areaCacheService.fetchNearestAreas(longitude, latitude, limit);
    const newCache = this.areaCacheService.splitMainAndNeighbors(areas, latitude, longitude);
    
    if (newCache) {
      await this.areaCacheService.updateCache(userId, newCache.main, newCache.neighbors);
      return newCache;
    }
    
    this.logger.warn('No areas found');
    return null;
  }
}
