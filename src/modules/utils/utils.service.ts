import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SECRET_PATHS, SUPPORTED_GATEWAY } from 'src/constant';
import { IPGSecurityService } from '../security/providers/ipg.security.service';
import { GatewayStrategyType, UtilsServiceType } from 'src/types';

@Injectable()
export class UtilsService implements UtilsServiceType {
  constructor(private readonly configService: ConfigService) {}

  resolveGatewayStrategy(gateway: string) {
    let strategy: GatewayStrategyType = null;

    switch (true) {
      case gateway === SUPPORTED_GATEWAY.IPG: {
        const secret = this.configService.get<string>(
          SECRET_PATHS.IPG,
        ) as string;
        strategy = new IPGSecurityService(secret);
        break;
      }

      default:
        break;
    }

    return strategy;
  }
}
