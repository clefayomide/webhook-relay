import { Injectable } from '@nestjs/common';
import {
  ProcessorServiceI,
  ProcessorVerifyReqPayloadType,
  ProcessorStrategyType,
} from 'src/types';
import { UtilsService } from 'src/modules/utils/utils.service';
import { APP_MSG } from 'src/constant';

@Injectable()
export class ProcessorService implements ProcessorServiceI {
  constructor(private readonly utils: UtilsService) {}

  private strategy: ProcessorStrategyType;

  private setStrategy(strategy: ProcessorStrategyType) {
    this.strategy = strategy;
  }

  private determineStrategy(gateway: string) {
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
}
