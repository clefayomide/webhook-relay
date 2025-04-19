import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { APP_MSG, RESPONSE_CODES } from 'src/constant';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private readonly securityService: SecurityService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (!this.securityService.verifyRequest(req)) {
      return res
        .status(RESPONSE_CODES.BAD_REQUEST)
        .json({ message: APP_MSG.INVALID_REQ_ORIGIN });
    }
    next();
  }
}
