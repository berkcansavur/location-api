import { GeoJSONPolygon } from "@/domain/area/area.domain";

export interface CheckAreaPort {
  containsPoint(polygon: GeoJSONPolygon, latitude: number, longitude: number): boolean;
}
  