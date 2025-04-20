import { Injectable } from '@nestjs/common';
import { GatewayServiceI, ProcessEventResponseType } from 'src/types';

@Injectable()
export class GatewayService implements GatewayServiceI {
  processEvent(): Promise<ProcessEventResponseType> {
    return Promise.resolve({ eventId: '1', eventType: '2' });
  }
}
