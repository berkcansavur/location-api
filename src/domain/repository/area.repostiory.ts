import { AreaDomain } from '../area/area.domain';

export interface IAreaRepository {
  create(area: AreaDomain): Promise<void>;
  findById(id: number): Promise<AreaDomain | null>;
  findAll(): Promise<AreaDomain[]>;
  update(area: AreaDomain): Promise<void>;
  findNearestAreas(longitude: number, latitude: number, limit?: number): Promise<AreaDomain[]>;
}
