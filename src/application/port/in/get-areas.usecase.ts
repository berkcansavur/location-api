import { AreaDomain } from '../../../domain/area/area.domain';

export interface GetAreasUseCase {
  findAll(): Promise<AreaDomain[]>;
}
