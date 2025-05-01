import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { APP_MSG, SUPPORTED_GATEWAY } from 'src/constant';
import { SecurityService } from 'src/modules/security/security.service';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(
    private readonly securityService: SecurityService,
    private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const gateway = req.params.name?.toLowerCase();

    // We validate the `provider` param here instead of using a ValidationPipe
    // because middleware in NestJS executes before the controller layer.
    // Since this middleware depends on the provider to determine the appropriate
    // security strategy, it's crucial to ensure the provider is valid early in
    // the request lifecycle — before it ever reaches the route handler or pipes.
    
    if (!gateway || !Object.values(SUPPORTED_GATEWAY).includes(gateway)) {
      this.logger.error(
        `[${req.method}] ${req.url}: ${APP_MSG.UNSUPPORTED_GATEWAY} - supplied gateway:${gateway}`,
        { headers: req.headers, ip: req.ip },
        SecurityMiddleware.name,
      );
      throw new BadRequestException(APP_MSG.UNSUPPORTED_GATEWAY);
    }

    if (
      !this.securityService.verifyRequest({
        gateway,
        body: req.body,
        headers: req.headers,
      })
    ) {
      this.logger.error(
        `[${req.method}] ${req.url}: ${APP_MSG.INVALID_PAYLOAD}`,
        { headers: req.headers, ip: req.ip },
        SecurityMiddleware.name,
      );
      throw new BadRequestException(APP_MSG.INVALID_PAYLOAD);
    }

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      this.logger.log(
        `[${req.method}] ${req.url} - ${res.statusCode} (${responseTime}ms)`,
        { headers: req.headers, ip: req.ip },
        SecurityMiddleware.name,
      );
    });
    next();
  }
}
