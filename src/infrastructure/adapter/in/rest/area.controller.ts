import { CreateAreaUseCase } from '@/application/port/in/create-area.usecase';
import { GetAreasUseCase } from '@/application/port/in/get-areas.usecase';
import { AreaDomain } from '@/domain/area/area.domain';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Inject } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';

@ApiTags('areas')
@Controller('areas')
export class AreaController {
  constructor(
    @Inject('CreateAreaUseCase')
    private readonly createAreaUseCase: CreateAreaUseCase,
    @Inject('GetAreasUseCase')
    private readonly getAreasUseCase: GetAreasUseCase
  ) {}

  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'Area created successfully', type: AreaDomain })
  @ApiBody({ type: CreateAreaDto })
  @Post()
  async createArea(@Body() area: AreaDomain): Promise<void> {
    await this.createAreaUseCase.create(area);
  }

  @ApiOperation({ summary: 'Get all areas' })
  @ApiResponse({ status: 200, description: 'Returns all areas', type: [AreaDomain] })
  @Get()
  async getAreas(): Promise<AreaDomain[]> {
    return await this.getAreasUseCase.findAll();
  }
}
