import { LocationVO } from '@/domain/value-objects/location.vo';

export interface LogAreaEntryUseCase {
  logEntry(userId: number, location: LocationVO): Promise<boolean>;
}
