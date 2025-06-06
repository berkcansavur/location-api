import { GetAreaEntryLogsUseCase } from '@/application/port/in/get-area-entry-logs.usecase';
import { AreaEntryLogDomain } from '@/domain/log/area-entry-log.domain';
import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';  
import { Inject } from '@nestjs/common';
import { AreaLogResponseDto } from './dto/response/area-log.response.dto';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  private readonly logger = new Logger(LogController.name);
  constructor(
    @Inject('LoadAreaEntryLogPort')
    private readonly getAreaEntryLogsUseCase: GetAreaEntryLogsUseCase
  ) {}
  
  @ApiOperation({ summary: 'Get all logs' })
  @ApiResponse({ status: 200, description: 'Returns all logs', type: [AreaLogResponseDto] })
  @Get()
  async getLogs(): Promise<AreaEntryLogDomain[]> {
    this.logger.log('Getting all logs');
    return this.getAreaEntryLogsUseCase.findAll();
  }
}
