import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SECRET_PATHS, SUPPORTED_GATEWAY } from 'src/constant';
import { IPGProcessor } from 'src/modules/processor/providers/ipg.processor';
import { ProcessorStrategyType, StrategyFactoryI } from 'src/types';

@Injectable()
export class StrategyFactory implements StrategyFactoryI {
  constructor(private readonly configService: ConfigService) {}

  createStrategyMap(gateway: string) {
    const strategyMap = new Map<string, ProcessorStrategyType>([
      [SUPPORTED_GATEWAY.IPG, this.createIPGStrategy()],
    ]);

    return strategyMap.get(gateway) || null;
  }

  private createIPGStrategy() {
    const secret = this.configService.get<string>(SECRET_PATHS.IPG) as string;
    return new IPGProcessor(secret);
  }
}
