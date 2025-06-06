import { AreaDomain } from '../../../domain/area/area.domain';

export interface LoadAreasPort {
  findAll(): Promise<AreaDomain[]>;
  findNearestAreas(longitude: number, latitude: number, limit?: number): Promise<AreaDomain[]>;
}
