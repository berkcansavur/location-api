import { LocationDomain } from '../../../domain/location/location.domain';

export interface LogAreaEntryUseCase {
  logEntry(userId: number, location: LocationDomain): Promise<boolean>;
}
