import { RedisCachePort } from '@/application/port/out/cache.port';
import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';


@Injectable()
export class RedisCacheAdapter implements RedisCachePort {
  constructor(@Inject('REDIS_CLIENT') private readonly client: RedisClientType) {}

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttl = 60): Promise<void> {
    await this.client.set(key, JSON.stringify(value), { EX: ttl });
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}