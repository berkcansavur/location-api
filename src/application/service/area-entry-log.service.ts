import { AreaEntryLogDomain } from '../../domain/log/area-entry-log';
import { LogAreaEntryUseCase } from '../port/in/log-area-entry.usecase';
import { LoadAreasPort } from '../port/out/load-areas.port';
import { CreateAreaEntryLogPort } from '../port/out/create-area-entry-log.port';
import { CheckAreaPort } from '../port/out/check-area.port';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoadAreaEntryLogsPort } from '../port/out/load-area-entry-logs.port';
import { GetAreaEntryLogsUseCase } from '../port/in/get-area-entry-logs.usecase';
import { LocationVO } from '@/domain/value-objects/location.vo';

@Injectable()
export class AreaEntryLogService implements LogAreaEntryUseCase, GetAreaEntryLogsUseCase {
  private readonly logger = new Logger(AreaEntryLogService.name);
  
  constructor(
    @Inject('LoadAreaEntryLogPort')
    private readonly loadAreaEntryLogPort: LoadAreaEntryLogsPort,
    @Inject('CreateAreaEntryLogPort')
    private readonly createAreaEntryLogPort: CreateAreaEntryLogPort,
    @Inject('LoadAreasPort')
    private readonly loadAreasPort: LoadAreasPort,
    @Inject('CheckAreaPort')
    private readonly checkAreaPort: CheckAreaPort
  ) {}

  async logEntry(userId: number, location: LocationVO): Promise<boolean> {
    const areas = await this.loadAreasPort.findAll();
    
    if(!areas.length) {
      this.logger.warn('No areas found');
      return false;
    }

    const matchedArea = areas.find((area) => this.checkAreaPort.containsPoint(area.polygon, location.latitude, location.longitude));

    if (matchedArea?.id) {
      this.logger.log(`location is inside area: ${matchedArea.name}`);
      const log = AreaEntryLogDomain.create(userId, matchedArea.id, new Date());
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
