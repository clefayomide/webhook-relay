import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SUPPORTED_GATEWAY } from 'src/constant';
import { IPGSecurityService } from 'src/modules/security/providers.service';
import { GatewayStrategyType, UtilsServiceType } from 'src/types';

@Injectable()
export class UtilsService implements UtilsServiceType {
  constructor(private readonly configService: ConfigService) {}
  resolveGatewayStrategy(gateway: string) {
    let strategy: GatewayStrategyType = null;
    switch (true) {
      case gateway === SUPPORTED_GATEWAY.IPG: {
        const secret = this.configService.get<string>(
          'gatewaySecretkeys.ipg',
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
