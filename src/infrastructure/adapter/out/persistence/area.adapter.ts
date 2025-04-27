import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
    private readonly areaRepository: Repository<AreaModel>
  ) {}

  async create(area: AreaDomain): Promise<void> {
    const model = this.toModel(area);
    await this.areaRepository.insert(model);
  }

  async update(area: AreaDomain): Promise<void> {
    if (!area.id) {
      throw new Error('Cannot update area without ID');
    }
    const model = this.toModel(area);
    await this.areaRepository.update(area.id, model);
  }

  async findById(id: number): Promise<AreaDomain | null> {
    const model = await this.areaRepository.findOne({ where: { id } });
    return model ? this.toDomain(model) : null;
  }

  async findAll(): Promise<AreaDomain[]> {
    const models = await this.areaRepository.find();
    return models.map(this.toDomain);
  }

  private toModel(domain: AreaDomain): AreaModel {
    const model = new AreaModel();
    if (domain.id) {
      model.id = domain.id;
    }
    model.name = domain.name;
    model.polygon = domain.polygon;
    return model;
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