export class LocationDomain {
  id?: number;
  userId: number;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  deletedAt?: Date;

  constructor({id, userId, latitude, longitude, createdAt, deletedAt}: {id?: number, userId: number, latitude: number, longitude: number, createdAt?: Date, deletedAt?: Date}) {
    this.id = id;
    this.userId = userId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create({userId, latitude, longitude}: {userId: number, latitude: number, longitude: number}): LocationDomain {
    return new LocationDomain({ userId, latitude, longitude});
  }

  static fromPersistence(id: number, userId: number, latitude: number, longitude: number, createdAt: Date, deletedAt?: Date): LocationDomain {
    return new LocationDomain({id, userId, latitude, longitude, createdAt, deletedAt});
  }
}