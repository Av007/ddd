import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class ApiTimingMiddleware implements NestMiddleware {
  constructor(@Inject('REDIS_CLIENT') private readonly client: Redis) {
    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const start = process.hrtime();
    const endpoint = req.originalUrl;
    const countKey = `requests:${endpoint}`;

    try {
      try {
        await this.client.call(
          'TS.CREATE',
          countKey,
          'RETENTION',
          '60000',
          'DUPLICATE_POLICY',
          'LAST',
          'LABELS',
          'type',
          'api_timing'
        );
      } catch (err) {
        console.error('Error creating time series:', err);
      }

      res.on('finish', async () => {
        try {
          const diff = process.hrtime(start);
          const durationMs = diff[0] * 1000 + diff[1] / 1e6;

          await this.client.call(
            'TS.ADD',
            countKey,
            Date.now().toString(),
            durationMs.toFixed(2)
          );

          console.log({
            endpoint,
            duration: `${durationMs.toFixed(2)}ms`,
            status: res.statusCode,
          });
        } catch (error) {
          console.error('Error recording response time:', error);
        }
      });

      next();
    } catch (error) {
      console.error('Middleware error:', error);
      next(error);
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
