import { SECRET_PATHS, STATUSES, SUPPORTED_GATEWAY } from 'src/constant';
import {
  ProcessorStrategyType,
  SupportedGatewayType,
  UtilsType,
} from 'src/types';
import { ConfigService } from '@nestjs/config';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IPGProvider } from 'src/modules/provider/ipg.service';

@Injectable()
export class Utils implements UtilsType {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => IPGProvider))
    private readonly IPGProvider: IPGProvider,
  ) {}

  public resolveGatewayStrategy(gateway: SupportedGatewayType) {
    return this.createStrategyMap(gateway);
  }

  public resolveTransactionStatus(status: string) {
    switch (true) {
      case STATUSES.successful.possibleStatus.includes(status.toLowerCase()):
        return STATUSES.successful.slug;
      default:
        return '';
    }
  }

  private createStrategyMap(gateway: SupportedGatewayType) {
    const strategyMap: Record<SupportedGatewayType, ProcessorStrategyType> = {
      [SUPPORTED_GATEWAY.IPG]: this.IPGProvider,
    };

    return strategyMap[gateway] || null;
  }

  public getProviderSecret(gateway: SupportedGatewayType) {
    const secrets = {
      [SUPPORTED_GATEWAY.IPG]: this.configService.get<string>(
        SECRET_PATHS.IPG,
      ) as string,
    };

    return secrets[gateway] || null;
  }
}
