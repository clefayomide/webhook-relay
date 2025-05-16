import { Global, Logger, Module } from '@nestjs/common';
import { Utils } from '../../common/utils/app.utils';
import { IPGProvider } from '../provider/ipg.service';
import { ProcessorService } from '../processor/processor.service';
import { IPGAdapter } from '../../common/adapter/ipg.adapter';
import { GatewayModule } from '../gateway/gateway.module';

@Global()
@Module({
  imports: [GatewayModule],
  providers: [Utils, Logger, IPGProvider, ProcessorService, IPGAdapter],
  exports: [Utils, Logger, IPGProvider, ProcessorService, IPGAdapter],
})
export class CommonModule {}
