import { SECRET_PATHS, STATUSES, SUPPORTED_GATEWAY } from '../../constant';
import {
  ProcessorStrategyType,
  SupportedGatewayType,
  UtilsType,
} from '../../types';
import { ConfigService } from '@nestjs/config';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IPGProviderService } from '../../modules/provider/ipg.provider.service';

@Injectable()
export class Utils implements UtilsType {
  private readonly strategyRegistry: Record<
    SupportedGatewayType,
    ProcessorStrategyType
  >;
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => IPGProviderService))
    private readonly IPGProviderService: IPGProviderService,
  ) {
    this.strategyRegistry = {
      [SUPPORTED_GATEWAY.IPG]: this.IPGProviderService,
    };
  }

  public resolveGatewayStrategy(gateway: SupportedGatewayType) {
    return this.strategyRegistry[gateway] || null;
  }

  public resolveTransactionStatus(status: string) {
    switch (true) {
      case STATUSES.successful.possibleStatus.includes(status.toLowerCase()):
        return STATUSES.successful.slug;
      default:
        return '';
    }
  }

  public getProviderSecret(gateway: SupportedGatewayType) {
    const secretKey = gateway.toUpperCase() as keyof typeof SECRET_PATHS;
    return this.configService.get<string>(SECRET_PATHS[secretKey]) ?? null;
  }
}
