import * as dotenv from 'dotenv';

dotenv.config();

export const redisConfig = {
  type: 'single' as const,
  url: process.env.REDIS_URL,
};
