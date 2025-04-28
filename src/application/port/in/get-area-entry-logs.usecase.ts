import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log.domain';

export interface GetAreaEntryLogsUseCase {
  findAll(): Promise<AreaEntryLogDomain[]>;
}
