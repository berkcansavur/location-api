export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][];
}
export class AreaDomain {
  id?: number;
  name: string;
  polygon: GeoJSONPolygon;
  createdAt?: Date;
  deletedAt?: Date;

  constructor({id, name, polygon, createdAt, deletedAt}: {id?: number, name: string, polygon: GeoJSONPolygon, createdAt?: Date, deletedAt?: Date}) {
    this.id = id;
    this.name = name;
    this.polygon = polygon;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create(name: string, polygon: GeoJSONPolygon): AreaDomain {
    return new AreaDomain({name, polygon});
  }

  static fromPersistence(id: number, name: string, polygon: GeoJSONPolygon, createdAt: Date, deletedAt?: Date): AreaDomain {
    return new AreaDomain({id, name, polygon, createdAt, deletedAt});
  }
}