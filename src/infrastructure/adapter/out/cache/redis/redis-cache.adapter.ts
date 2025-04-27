import { RedisCachePort } from '@/application/port/out/cache.port';
import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';


@Injectable()
export class RedisCacheAdapter implements RedisCachePort {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    this.client.connect();
  }

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