import { LogAreaEntryUseCase } from '@/application/port/in/log-area-entry.usecase';
import { Controller, Post, Body, Param, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Inject } from '@nestjs/common';
import { SubmitLocationDto } from './dto/submit-location.dto';
import { LocationVO } from '@/domain/value-objects/location.vo';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  private readonly logger = new Logger(LocationController.name);
  constructor(
    @Inject('LogAreaEntryUseCase')
    private readonly logAreaEntryUseCase: LogAreaEntryUseCase
  ) {}

  @ApiOperation({ summary: 'Submits Location' })
  @ApiResponse({ status: 200, description: 'Location submitted successfully' })
  @ApiBody({ type: SubmitLocationDto })
  @Post(':userId')
  async submitLocation(@Body() location: SubmitLocationDto, @Param('userId') userId: number): Promise<boolean> {
    this.logger.log('Submitting location');
    const locationVO = LocationVO.create(location.longitude, location.latitude);
    return this.logAreaEntryUseCase.logEntry(userId, locationVO);
  }
}
