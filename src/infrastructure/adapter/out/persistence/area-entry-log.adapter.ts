import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntryLogDomain } from '@/domain/log/area-entry-log.domain';
import { IAreaEntryLogRepository } from '@/domain/repository/area-entry-log.repository';
import { LoadAreaEntryLogsPort } from '@/application/port/out/load-area-entry-logs.port';
import { AreaEntryLogModel } from './model/area-entry-log.model';

@Injectable()
export class AreaEntryLogAdapter implements IAreaEntryLogRepository, LoadAreaEntryLogsPort {
  constructor(
    @InjectRepository(AreaEntryLogModel)
    private readonly areaEntryLogRepository: Repository<AreaEntryLogModel>
  ) {}
  async create(domain: AreaEntryLogDomain): Promise<AreaEntryLogDomain> {
    try {
      const entity = await this.areaEntryLogRepository.save(domain);
      return this.toDomain(entity);
    } catch (error) {
      throw new Error('Failed to create area entry log');
    }
  }

  async update(domain: AreaEntryLogDomain): Promise<AreaEntryLogDomain> {
    if (!domain.id) {
      throw new Error('ID is required for persistence');
    }
    try {
      await this.areaEntryLogRepository.update(domain.id, domain);
      return domain;
    } catch (error) {
      throw new Error('Failed to update area entry log');
    }
  }

  async remove(domain: AreaEntryLogDomain): Promise<AreaEntryLogDomain> {
    if (!domain.id) {
      throw new Error('ID is required for persistence');
    }
    try {
      await this.areaEntryLogRepository.delete(domain.id);
      return domain;
    } catch (error) {
      throw new Error('Failed to delete area entry log');
    }
  }

  async findAll(): Promise<AreaEntryLogDomain[]> {
    try {
      const entities = await this.areaEntryLogRepository.find();
      return entities.map(this.toDomain);
    } catch (error) {
      throw new Error('Failed to find all area entry logs');
    }
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