import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log.domain';

export interface CreateAreaEntryLogPort {
  create(log: AreaEntryLogDomain): Promise<AreaEntryLogDomain>;
}
