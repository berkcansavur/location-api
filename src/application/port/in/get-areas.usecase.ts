import { CachedAreas } from '../../service/area-cache.service';
import { AreaDomain } from '../../../domain/area/area.domain';
export interface GetAreasUseCase {
  findAll(): Promise<AreaDomain[]>;
  findNearestAreas(longitude: number, latitude: number, limit?: number): Promise<CachedAreas | null>;
}
