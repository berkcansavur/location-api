import { AreaDomain } from '../../../domain/area/area.domain';

export interface CreateAreaPort {
  create(area: AreaDomain): Promise<void>;
}
