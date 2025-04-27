import { Entity, Column } from 'typeorm';
import { BaseModel } from './base-model';

@Entity('areas')
export class AreaModel extends BaseModel {
  @Column()
  name: string;

  @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326 })
  polygon: object; 

}