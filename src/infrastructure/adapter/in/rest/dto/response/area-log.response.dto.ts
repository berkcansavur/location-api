import { ApiProperty } from "@nestjs/swagger";

export class AreaLogResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  areaId: number;

  @ApiProperty()
  entryTime: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  deletedAt: Date;
} 