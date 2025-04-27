import { GetAreaEntryLogsUseCase } from '@/application/port/in/get-area-entry-logs.usecase';
import { AreaEntryLogDomain } from '@/domain/log/area-entry-log';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';  
import { Inject } from '@nestjs/common';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(
    @Inject('LoadAreaEntryLogPort')
    private readonly getAreaEntryLogsUseCase: GetAreaEntryLogsUseCase) {}
  @ApiOperation({ summary: 'Get all logs' })
  @ApiResponse({ status: 200, description: 'Returns all logs', type: [AreaEntryLogDomain] })
  @Get()
  async getLogs(): Promise<AreaEntryLogDomain[]> {
    return this.getAreaEntryLogsUseCase.getAllLogs();
  }
}
