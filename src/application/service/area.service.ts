
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AreaDomain } from '../../domain/area/area.domain';
import { CreateAreaUseCase } from '../port/in/create-area.usecase';
import { GetAreasUseCase } from '../port/in/get-areas.usecase';
import { CreateAreaPort } from '../port/out/create-area.port';
import { LoadAreasPort } from '../port/out/load-areas.port';

@Injectable()
export class AreaService implements CreateAreaUseCase, GetAreasUseCase {
  private readonly logger = new Logger(AreaService.name);
  constructor(
    @Inject('CreateAreaPort')
    private readonly createAreaPort: CreateAreaPort,
    @Inject('LoadAreasPort')
    private readonly loadAreasPort: LoadAreasPort
  ) {}

  async create(areaInput: AreaDomain): Promise<void> {
    try {
      this.logger.log('Creating area');
      const area = AreaDomain.create(areaInput.name, areaInput.polygon);
      await this.createAreaPort.create(area);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to create area');
    }
  }

  async findAll(): Promise<AreaDomain[]> {
    try {
      this.logger.log('Finding all areas');
      return this.loadAreasPort.findAll();
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to find all areas');
    }
  }
}
