import { LocationDomain } from '@/domain/location/location.domain';

export interface LocationFilter {
  userId?: number;
  areaId?: number;
  timestamp?: Date;
}

export interface ILocationRepository {
  create(location: LocationDomain): Promise<void>;
  findById(id: number): Promise<LocationDomain | null>;
  filter(filter: LocationFilter): Promise<LocationDomain[]>;
}
