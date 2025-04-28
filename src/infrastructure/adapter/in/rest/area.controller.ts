import { CreateAreaUseCase } from '@/application/port/in/create-area.usecase';
import { GetAreasUseCase } from '@/application/port/in/get-areas.usecase';
import { AreaDomain } from '@/domain/area/area.domain';
import { Controller, Post, Get, Body, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Inject } from '@nestjs/common';
import { CreateAreaDto } from './dto/request/create-area.dto';
import { AreaResponseDto } from './dto/response/area.response.dto';

@ApiTags('areas')
@Controller('areas')
export class AreaController {
  private readonly logger = new Logger(AreaController.name);
  constructor(
    @Inject('CreateAreaUseCase')
    private readonly createAreaUseCase: CreateAreaUseCase,
    @Inject('GetAreasUseCase')
    private readonly getAreasUseCase: GetAreasUseCase
  ) {}

  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'Area created successfully', type: AreaResponseDto })
  @ApiBody({ type: CreateAreaDto })
  @Post()
  async create(@Body() area: AreaDomain): Promise<AreaDomain> {
    this.logger.log('Creating area');
    return this.createAreaUseCase.create(area);
  }

  @ApiOperation({ summary: 'Get all areas' })
  @ApiResponse({ status: 200, description: 'Returns all areas', type: [AreaResponseDto] })
  @Get()
  async getAll(): Promise<AreaDomain[]> {
    this.logger.log('Getting all areas');
    return this.getAreasUseCase.findAll();
  }
}
