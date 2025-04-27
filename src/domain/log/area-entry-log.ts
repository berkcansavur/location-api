export class AreaEntryLogDomain {
  id?: number ;
  userId: number;
  areaId: number;
  entryTime: Date;
  createdAt?: Date;
  deletedAt?: Date;

  constructor({id, userId, areaId, entryTime, createdAt, deletedAt}: {id?: number, userId: number, areaId: number, entryTime: Date, createdAt?: Date, deletedAt?: Date}) {
    this.id = id;
    this.userId = userId;
    this.areaId = areaId;
    this.entryTime = entryTime;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create(userId: number, areaId: number, entryTime: Date): AreaEntryLogDomain {
    return new AreaEntryLogDomain({userId, areaId, entryTime});
  }
  static fromPersistence(id: number, userId: number, areaId: number, entryTime: Date, createdAt: Date, deletedAt?: Date): AreaEntryLogDomain {
    return new AreaEntryLogDomain({id, userId, areaId, entryTime, createdAt, deletedAt});
  }
}
