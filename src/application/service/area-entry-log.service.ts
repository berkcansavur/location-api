import { LocationDomain } from '../../domain/location/location.domain';
import { AreaEntryLogDomain } from '../../domain/log/area-entry-log';
import { LogAreaEntryUseCase } from '../port/in/log-area-entry.usecase';
import { LoadAreasPort } from '../port/out/load-areas.port';
import { CreateAreaEntryLogPort } from '../port/out/create-area-entry-log.port';
import { CheckAreaPort } from '../port/out/check-area.port';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoadAreaEntryLogsPort } from '../port/out/load-area-entry-logs.port';

@Injectable()
export class AreaEntryLogService implements LogAreaEntryUseCase {
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

  async logEntry(userId: number, location: LocationDomain): Promise<void> {
    const areas = await this.loadAreasPort.findAll();
    
    if(!areas.length) {
      this.logger.warn('No areas found');
      return ;
    }

    const matchedArea = areas.find((area) => this.checkAreaPort.containsPoint(area.polygon, location.latitude, location.longitude));

    if (matchedArea?.id) {
      this.logger.log(`location is inside area: ${matchedArea.name}`);
      const log = AreaEntryLogDomain.create(userId, matchedArea.id, new Date());
      this.logger.log('Creating area entry log');
      await this.createAreaEntryLogPort.create(log);
    } else {
      this.logger.warn('No area found for location');
    }
  }

  async getAll(): Promise<AreaEntryLogDomain[]> {
    return this.loadAreaEntryLogPort.findAll();
  }
}
