import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDomain } from '@/domain/location/location.domain';
import { ILocationRepository, LocationFilter } from '@/domain/repository/location.repo';
import { LocationModel } from './model/location.model';

@Injectable()
export class LocationAdapter implements ILocationRepository {
  constructor(
    @InjectRepository(LocationModel)
    private readonly locationRepository: Repository<LocationModel>
  ) {}

  async create(location: LocationDomain): Promise<void> {
    const model = this.toModel(location);
    await this.locationRepository.insert(model);
  }

  async findById(id: number): Promise<LocationDomain | null> {
    const model = await this.locationRepository.findOne({ where: { id } });
    return model ? this.toDomain(model) : null;
  }

  async filter(filter: LocationFilter): Promise<LocationDomain[]> {
    const locations = await this.locationRepository.find({ where: filter });
    return locations.map(this.toDomain);
  }

  private toModel(domain: LocationDomain): LocationModel {
    const model = new LocationModel();
    if (domain.id) {
      model.id = domain.id;
    }
    model.userId = domain.userId;
    model.latitude = domain.latitude;
    model.longitude = domain.longitude;
    return model;
  }

  private toDomain(model: LocationModel): LocationDomain {
    if (!model.id) {
      throw new Error('ID is required for persistence');
    }
    return LocationDomain.fromPersistence(
      model.id,
      model.userId,
      model.latitude,
      model.longitude,
      model.createdAt,
      model.deletedAt
    );
  }
}