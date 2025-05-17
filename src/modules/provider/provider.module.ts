import { Module } from '@nestjs/common';
import { IPGProviderService } from './ipg.provider.service';
import { IPGAdapter } from 'src/common/adapter/ipg.adapter';

@Module({
  providers: [IPGProviderService, IPGAdapter],
})
export class ProviderModule {}
