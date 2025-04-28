import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log.domain';

export interface LoadAreaEntryLogsPort {
  findAll(): Promise<AreaEntryLogDomain[]>;
}
