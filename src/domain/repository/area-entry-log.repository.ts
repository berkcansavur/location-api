import { AreaEntryLogDomain } from '../log/area-entry-log';

export interface IAreaEntryLogRepository {  
  create(domain: AreaEntryLogDomain): Promise<void>;
  update(domain: AreaEntryLogDomain): Promise<void>;
  remove(domain: AreaEntryLogDomain): Promise<void>;
  findAll(): Promise<AreaEntryLogDomain[]>;
}
