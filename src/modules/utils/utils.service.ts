import { Injectable } from '@nestjs/common';
import { UtilsServiceType } from 'src/types';
import { StrategyFactory } from 'src/common/factory/strategy/strategy.factory';

@Injectable()
export class UtilsService implements UtilsServiceType {
  constructor(private readonly strategyFactory: StrategyFactory) {}

  resolveGatewayStrategy(gateway: string) {
    return this.strategyFactory.createStrategyMap(gateway);
  }
}
