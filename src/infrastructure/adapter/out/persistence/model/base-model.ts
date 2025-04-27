import { PrimaryGeneratedColumn } from "typeorm";

import { CreateDateColumn, DeleteDateColumn } from "typeorm";

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}