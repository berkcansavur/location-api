import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log';

export interface LoadAreaEntryLogsPort {
  findAll(): Promise<AreaEntryLogDomain[]>;
}
