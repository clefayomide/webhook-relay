import { Injectable } from '@nestjs/common';
import {
  SecurityServiceI,
  SecurityServicePayload,
  GatewayStrategyType,
} from 'src/types';
import { UtilsService } from 'src/modules/utils/utils.service';

@Injectable()
export class SecurityService implements SecurityServiceI {
  constructor(private readonly utils: UtilsService) {}

  private strategy: GatewayStrategyType;

  private setStrategy(strategy: GatewayStrategyType) {
    this.strategy = strategy;
  }

  private determineStrategy(gateway: string) {
    const strategy = this.utils.resolveGatewayStrategy(gateway);
    this.setStrategy(strategy);
  }

  public verifyRequest({ gateway, ...rest }: SecurityServicePayload) {
    this.determineStrategy(gateway);

    if (!this.strategy) {
      throw new Error("couldn't determine strategy");
    }

    return this.strategy.verifyRequest(rest);
  }
}
