import { AreaEntryLogDomain } from '../../domain/log/area-entry-log.domain';
import { LogAreaEntryUseCase } from '../port/in/log-area-entry.usecase';
import { CreateAreaEntryLogPort } from '../port/out/create-area-entry-log.port';
import { CheckAreaPort } from '../port/out/check-area.port';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoadAreaEntryLogsPort } from '../port/out/load-area-entry-logs.port';
import { GetAreaEntryLogsUseCase } from '../port/in/get-area-entry-logs.usecase';
import { LocationVO } from '@/domain/value-objects/location.vo';
import { AreaService } from './area.service';


@Injectable()
export class AreaEntryLogService implements LogAreaEntryUseCase, GetAreaEntryLogsUseCase {
  private readonly logger = new Logger(AreaEntryLogService.name);
  
  constructor(
    @Inject('LoadAreaEntryLogPort')
    private readonly loadAreaEntryLogPort: LoadAreaEntryLogsPort,
    @Inject('CreateAreaEntryLogPort')
    private readonly createAreaEntryLogPort: CreateAreaEntryLogPort,
    private readonly areaService: AreaService
  ) {}

  async logEntry(userId: number, location: LocationVO): Promise<boolean> {
   const areas = await this.areaService.findNearestAreas(userId, location.longitude, location.latitude);

    if(areas == null) {
      this.logger.warn('No areas found');
      return false;
    }
    const {main} = areas;

    if (main?.id) {
      this.logger.log(`location is inside area: ${main.name}`);
      const log = AreaEntryLogDomain.create(userId, main.id, new Date());
      this.logger.log('Creating area entry log');
      await this.createAreaEntryLogPort.create(log);
      return true;
    } else {
      this.logger.warn('No area found for location');
      return false;
    }
  }

  async findAll(): Promise<AreaEntryLogDomain[]> {
    return this.loadAreaEntryLogPort.findAll();
  }

}
