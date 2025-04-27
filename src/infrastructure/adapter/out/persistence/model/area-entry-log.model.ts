import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseModel } from './base-model';

@Entity('area_entry_logs')
export class AreaEntryLogModel extends BaseModel{
  @Column()
  userId: number;

  @Column()
  areaId: number;

  @Column()
  entryTime: Date;
}