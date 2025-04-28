import { Injectable, OnApplicationShutdown, Inject, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RedisClientType } from 'redis';

@Injectable()
export class GracefulShutdownManager implements OnApplicationShutdown {
  private readonly logger = new Logger(GracefulShutdownManager.name);
  constructor(
    @Inject(DataSource) private readonly dataSource: DataSource,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async onApplicationShutdown(signal?: string) {
    if (signal) {
      this.logger.log(`Shutdown signal received: ${signal}`);
    }
    if (this.redisClient && this.redisClient.isOpen) {
      await this.redisClient.quit();
      this.logger.log('Redis connection closed gracefully.');
    }
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.logger.log('TypeORM connection closed gracefully.');
    }
  }
}