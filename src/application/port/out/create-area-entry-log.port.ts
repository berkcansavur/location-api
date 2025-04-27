import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log';

export interface CreateAreaEntryLogPort {
  create(log: AreaEntryLogDomain): Promise<void>;
}
