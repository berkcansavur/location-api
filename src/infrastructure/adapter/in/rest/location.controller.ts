import { LogAreaEntryUseCase } from '@/application/port/in/log-area-entry.usecase';
import { LocationDomain } from '@/domain/location/location.domain';
import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Inject } from '@nestjs/common';
import { SubmitLocationDto } from './dto/submit-location.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(
    @Inject('LogAreaEntryUseCase')
    private readonly logAreaEntryUseCase: LogAreaEntryUseCase
  ) {}

  @ApiOperation({ summary: 'Submits Location' })
  @ApiResponse({ status: 200, description: 'Location submitted successfully' })
  @ApiBody({ type: SubmitLocationDto })
  @Post(':userId')
  async submitLocation(@Body() location: LocationDomain, @Param('userId') userId: number): Promise<void> {
    await this.logAreaEntryUseCase.logEntry(userId, location);
  }
}
