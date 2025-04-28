import { ApiProperty } from "@nestjs/swagger";

export class SubmitLocationDto {

  @ApiProperty({
    example: 20,
    description: 'Longitude'
  })
  longitude: number;

  @ApiProperty({
    example: 30,
    description: 'Latitude'
  })
  latitude: number;

  @ApiProperty({
    example: '2025-04-27T10:00:00Z',
    description: 'Lokasyonun zamanı (ISO formatında)'
  })
  timestamp: string;
}