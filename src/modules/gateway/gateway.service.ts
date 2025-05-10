import { Injectable } from '@nestjs/common';
import { GatewayServiceI, NormalizedWebhookPayloadType } from 'src/types';
import { ProcessorService } from '../processor/processor.service';

@Injectable()
export class GatewayService implements GatewayServiceI {
  constructor(private readonly processorService: ProcessorService) {}
  processEvent(body: any): NormalizedWebhookPayloadType {
    return this.processorService.normalizeEvent(body);
  }
}
