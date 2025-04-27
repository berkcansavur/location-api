export class LocationVO {
  constructor(
    public readonly longitude: number,
    public readonly latitude: number
  ) {}

  equals(other: LocationVO): boolean {
    return (
      this.longitude === other.longitude &&
      this.latitude === other.latitude
    );
  }

  static create(longitude: number, latitude: number): LocationVO {
    return new LocationVO(longitude, latitude);
  }
}