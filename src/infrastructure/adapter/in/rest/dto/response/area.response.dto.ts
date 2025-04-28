import { ApiProperty } from '@nestjs/swagger';

export class PolygonDto {
  @ApiProperty({ example: 'Polygon' })
  type: string;

  @ApiProperty({
    example: [
      [
        [30, 10],
        [40, 40],
        [20, 40],
        [10, 20],
        [30, 10],
      ],
    ],
    description: 'GeoJSON koordinatları',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'number' },
      },
    },
  })
  coordinates: number[][][];
}

export class AreaResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: PolygonDto })
  polygon: PolygonDto;

  @ApiProperty({ example: '2025-04-27T22:37:15.279Z' })
  createdAt: string;

  @ApiProperty({ nullable: true, example: null })
  deletedAt: string | null;
}