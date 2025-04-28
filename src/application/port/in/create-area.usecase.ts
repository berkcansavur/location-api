import { AreaDomain } from '../../../domain/area/area.domain';

export interface CreateAreaUseCase {
  create(area: AreaDomain): Promise<AreaDomain>;
}
