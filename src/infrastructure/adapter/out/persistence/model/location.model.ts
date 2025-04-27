import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseModel } from './base-model';

@Entity('locations')
export class LocationModel extends BaseModel {
  @Column()
  userId: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}