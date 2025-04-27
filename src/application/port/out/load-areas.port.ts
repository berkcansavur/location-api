import { AreaDomain } from '../../../domain/area/area.domain';

export interface LoadAreasPort {
  findAll(): Promise<AreaDomain[]>;
}
