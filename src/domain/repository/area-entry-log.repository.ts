import { AreaEntryLogDomain } from '../log/area-entry-log.domain';

export interface IAreaEntryLogRepository {  
  create(domain: AreaEntryLogDomain): Promise<AreaEntryLogDomain>;
  update(domain: AreaEntryLogDomain): Promise<AreaEntryLogDomain>;
  remove(domain: AreaEntryLogDomain): Promise<AreaEntryLogDomain>;
  findAll(): Promise<AreaEntryLogDomain[]>;
}
