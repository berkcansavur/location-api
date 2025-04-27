import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntryLogDomain } from '@/domain/log/area-entry-log';
import { IAreaEntryLogRepository } from '@/domain/repository/area-entry-log.repository';
import { LoadAreaEntryLogsPort } from '@/application/port/out/load-area-entry-logs.port';
import { AreaEntryLogModel } from './model/area-entry-log.model';

@Injectable()
export class AreaEntryLogAdapter implements IAreaEntryLogRepository, LoadAreaEntryLogsPort {
  constructor(
    @InjectRepository(AreaEntryLogModel)
    private readonly areaEntryLogRepository: Repository<AreaEntryLogModel>
  ) {}
  async create(domain: AreaEntryLogDomain): Promise<void> {
    await this.areaEntryLogRepository.insert(domain);
  }

  async update(domain: AreaEntryLogDomain): Promise<void> {

    if (!domain.id) {
      throw new Error('ID is required for persistence');
    }
    await this.areaEntryLogRepository.update(domain.id, domain);
  }

  async remove(domain: AreaEntryLogDomain): Promise<void> {
    if (!domain.id) {
      throw new Error('ID is required for persistence');
    }
    await this.areaEntryLogRepository.delete(domain.id);
  }

  async findAll(): Promise<AreaEntryLogDomain[]> {
    const entities = await this.areaEntryLogRepository.find();
    return entities.map(this.toDomain);
  }


  private toDomain(entity: AreaEntryLogModel): AreaEntryLogDomain {
    if (!entity.id) {
      throw new Error('ID is required for persistence');
    }
    return AreaEntryLogDomain.fromPersistence(
      entity.id,
      entity.userId,
      entity.areaId,
      entity.entryTime,
      entity.createdAt,
      entity.deletedAt
    );
  }
}