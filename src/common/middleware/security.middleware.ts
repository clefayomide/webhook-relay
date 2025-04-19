import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { APP_MSG } from 'src/constant';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(
    private readonly securityService: SecurityService,
    private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    if (!this.securityService.verifyRequest(req)) {
      this.logger.error(
        `[${req.method}] ${req.url}: ${APP_MSG.INVALID_REQ_ORIGIN}`,
        { headers: req.headers, ip: req.ip },
        SecurityMiddleware.name,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: APP_MSG.INVALID_REQ_ORIGIN,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(APP_MSG.INVALID_REQ_ORIGIN),
        },
      );
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
