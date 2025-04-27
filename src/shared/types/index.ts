import { AreaDomain } from '../../domain/area/area.domain';


export type CachedAreas = {
  main: AreaDomain;
  neighbors: AreaDomain[];
};  