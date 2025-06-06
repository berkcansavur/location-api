import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaModel } from './infrastructure/adapter/out/persistence/model/area.model';
import { AreaEntryLogModel } from './infrastructure/adapter/out/persistence/model/area-entry-log.model';
import { AreaAdapter } from './infrastructure/adapter/out/persistence/area.adapter';
import { TurfGeometryService } from './infrastructure/adapter/out/geometry/area-geometry.service';
import { AreaEntryLogService } from './application/service/area-entry-log.service';
import { AreaEntryLogAdapter } from './infrastructure/adapter/out/persistence/area-entry-log.adapter';
import { databaseConfig } from './config/database.config';
import { AreaService } from './application/service/area.service';
import { LogController } from './infrastructure/adapter/in/rest/log.controller';
import { LocationController } from './infrastructure/adapter/in/rest/location.controller';
import { AreaController } from './infrastructure/adapter/in/rest/area.controller';
import { RedisCacheAdapter } from './infrastructure/adapter/out/cache/redis/redis.adapter';
import { redisConfig } from './config/redis.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AreaCacheService } from './application/service/area-cache.service';
import { dataSource } from './config/data-source';
import { DataSource } from 'typeorm';
import { createClient } from 'redis';
import { GracefulShutdownManager } from './infrastructure/adapter/greaceful-shutdown-manager';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([AreaModel, AreaEntryLogModel]),
    RedisModule.forRoot(redisConfig),
  ],
  providers: [
    AreaAdapter,
    AreaEntryLogAdapter,
    TurfGeometryService,
    AreaCacheService,
    AreaService,
    {
      provide: 'CreateAreaEntryLogPort',
      useClass: AreaEntryLogAdapter,
    },
    {
      provide: 'LoadAreasPort',
      useClass: AreaAdapter,
    },
    {
      provide: 'LoadAreaEntryLogPort',
      useClass: AreaEntryLogAdapter,
    },
    {
      provide: 'CheckAreaPort',
      useClass: TurfGeometryService,
    },
    {
      provide: 'CreateAreaPort',
      useClass: AreaAdapter,
    },
    {
      provide: 'CreateAreaUseCase',
      useClass: AreaService,
    },
    {
      provide: 'GetAreasUseCase',
      useClass: AreaService,
    },
    {
      provide: 'LogAreaEntryUseCase',
      useClass: AreaEntryLogService,
    },
    {
      provide: 'RedisCachePort',
      useClass: RedisCacheAdapter,
    },
    {
      provide: DataSource,
      useFactory: async () => {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
        return dataSource;
      },
    },
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();
        return client;
      },
    },
    GracefulShutdownManager
  ],
  controllers: [
    AreaController,
    LocationController,
    LogController,
  ],
})
export class AppModule {}