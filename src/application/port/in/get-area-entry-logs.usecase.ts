import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log';

export interface GetAreaEntryLogsUseCase {
  findAll(): Promise<AreaEntryLogDomain[]>;
}
