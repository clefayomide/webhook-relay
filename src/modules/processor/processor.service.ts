import { Injectable } from '@nestjs/common';
import {
  ProcessorServiceI,
  ProcessorVerifyReqPayloadType,
  ProcessorStrategyType,
  SupportedGatewayType,
  IPGWebhookPayloadType,
  // NormalizedWebhookPayloadType,
} from '../../types';
import { APP_MSG } from '../../constant';
import { Utils } from '../../common/utils/app.utils';

@Injectable()
export class ProcessorService implements ProcessorServiceI {
  constructor(private readonly utils: Utils) {}

  private strategy: ProcessorStrategyType;

  private setStrategy(strategy: ProcessorStrategyType) {
    this.strategy = strategy;
  }

  private determineStrategy(gateway: SupportedGatewayType) {
    const strategy = this.utils.resolveGatewayStrategy(gateway);
    this.setStrategy(strategy);
  }

  public verifyRequest({ gateway, ...rest }: ProcessorVerifyReqPayloadType) {
    this.determineStrategy(gateway);

    if (!this.strategy) {
      throw new Error(APP_MSG.STRATEGY_NOT_FOUND);
    }

    return this.strategy.verifyRequest(rest);
  }

  public normalizeEvent(payload: IPGWebhookPayloadType) {
    if (!this.strategy) {
      throw new Error(APP_MSG.STRATEGY_NOT_FOUND);
    }
    return this.strategy.normalizeEvent(payload);
  }
}
