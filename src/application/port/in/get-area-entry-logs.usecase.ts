import { AreaEntryLogDomain } from '../../../domain/log/area-entry-log';

export interface GetAreaEntryLogsUseCase {
  getAllLogs(): Promise<AreaEntryLogDomain[]>;
}
