import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SUPPORTED_PROVIDERS } from 'src/constant';
import { SecurityServiceI, SecurityStrategyType } from 'src/types';
import { IPGSecurityService } from './provider.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityService implements SecurityServiceI {
  constructor(private readonly configService: ConfigService) {}

  private strategy: SecurityStrategyType;

  private setStrategy(strategy: SecurityStrategyType) {
    this.strategy = strategy;
  }

  private determineStrategy(gateway: string) {
    switch (true) {
      case gateway === SUPPORTED_PROVIDERS.IPG: {
        const secretKey = this.configService.get<string>(
          'gatewaySecretkeys.ipg',
        ) as string;
        this.setStrategy(new IPGSecurityService(secretKey));
        break;
      }
      case gateway === SUPPORTED_PROVIDERS.PAYSTACK:
        break;
      default:
        break;
    }
  }
  verifyRequest(req: Request) {
    const { name = '' } = req.params ?? {};
    const gateway = name.toLowerCase();
    this.determineStrategy(gateway);
    return this.strategy.verifyRequest(req);
  }
}
