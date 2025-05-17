import { Global, Logger, Module } from '@nestjs/common';
import { Utils } from '../../common/utils/app.utils';
import { IPGProviderService } from '../provider/ipg.provider.service';
import { ProcessorService } from '../processor/processor.service';
import { IPGAdapter } from '../../common/adapter/ipg.adapter';
import { GatewayModule } from '../gateway/gateway.module';

@Global()
@Module({
  imports: [GatewayModule],
  providers: [Utils, Logger, IPGProviderService, ProcessorService, IPGAdapter],
  exports: [Utils, Logger, IPGProviderService, ProcessorService, IPGAdapter],
})
export class CommonModule {}
