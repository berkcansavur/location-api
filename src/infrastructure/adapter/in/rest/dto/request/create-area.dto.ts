import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ example: 'Test Alanı', description: 'Alan adı' })
  name: string;

  @ApiProperty({
    example: {
      type: 'Polygon',
      coordinates: [[[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]]
    },
    description: 'GeoJSON Polygon objesi'
  })
  polygon: object;
}