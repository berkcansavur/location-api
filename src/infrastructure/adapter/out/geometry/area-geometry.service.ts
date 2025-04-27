import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { Polygon } from '@turf/turf';
import { CheckAreaPort } from '@/application/port/out/check-area.port';

export class TurfGeometryService implements CheckAreaPort {
  containsPoint(polygon: Polygon, latitude: number, longitude: number): boolean {
    const point = {
      type: "Point" as const,
      coordinates: [longitude, latitude],
    };
    return booleanPointInPolygon(point, polygon);
  }
}