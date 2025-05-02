import { Global, Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { StrategyFactory } from 'src/common/factory/strategy/strategy.factory';

@Global()
@Module({
  providers: [UtilsService, StrategyFactory],
  exports: [UtilsService],
})
export class UtilsModule {}
