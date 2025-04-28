import { AreaDomain } from '../area/area.domain';

export interface IAreaRepository {
  create(area: AreaDomain): Promise<AreaDomain>;
  findById(id: number): Promise<AreaDomain | null>;
  findAll(): Promise<AreaDomain[] | null>;
  update(area: AreaDomain): Promise<AreaDomain>;
  findNearestAreas(longitude: number, latitude: number, limit?: number): Promise<AreaDomain[]>;
}
