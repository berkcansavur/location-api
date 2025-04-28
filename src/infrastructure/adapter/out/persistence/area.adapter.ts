import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaModel } from './model/area.model';
import { LoadAreasPort } from '@/application/port/out/load-areas.port';
import { AreaDomain, GeoJSONPolygon } from '@/domain/area/area.domain';
import { IAreaRepository } from '@/domain/repository/area.repostiory';
import { CreateAreaPort } from '@/application/port/out/create-area.port';

@Injectable()
export class AreaAdapter implements IAreaRepository, CreateAreaPort, LoadAreasPort {
  constructor(
    @InjectRepository(AreaModel)
    private readonly areaRepository: Repository<AreaModel>,
    private readonly entityManager: EntityManager 
  ) {}

  async create(domain: AreaDomain): Promise<AreaDomain> {
    try {
      const entity = await this.areaRepository.save(domain);
      return this.toDomain(entity);
    } catch (error) {
      throw new Error('Failed to create area');
    }
  }

  async update(domain: AreaDomain): Promise<AreaDomain> {
    if (!domain.id) {
      throw new Error('Cannot update area without ID');
    }
    try {
      await this.areaRepository.update(domain.id, domain);
      return domain
    } catch (error) {
      throw new Error('Failed to update area');
    }
  }

  async findById(id: number): Promise<AreaDomain | null> {
    const model = await this.areaRepository.findOne({ where: { id } });
    return model ? this.toDomain(model) : null;
  }

  async findAll(): Promise<AreaDomain[]> {
    const models = await this.areaRepository.find();
    return models.map(this.toDomain);
  }

  async findNearestAreas(longitude: number, latitude: number, limit = 5): Promise<AreaDomain[]> {
    const areas = await this.entityManager
      .createQueryBuilder(AreaModel, 'area')
      .orderBy(
        `area.polygon <-> ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)`,
        'ASC'
      )
      .setParameters({ longitude, latitude })
      .limit(limit)
      .getMany();

    return areas.map(this.toDomain);
  }

  private toDomain(model: AreaModel): AreaDomain {
    if (!model.id) {
      throw new Error('ID is required for persistence');
    }
    return AreaDomain.fromPersistence(
      model.id,
      model.name,
      model.polygon as GeoJSONPolygon,
      model.createdAt,
      model.deletedAt
    );
  }
}