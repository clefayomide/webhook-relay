import { Module } from '@nestjs/common';
import { IPGProvider } from './ipg.service';
import { IPGAdapter } from 'src/common/adapter/ipg.adapter';

@Module({
  providers: [IPGProvider, IPGAdapter],
})
export class ProviderModule {}
