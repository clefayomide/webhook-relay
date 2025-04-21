import { Injectable } from '@nestjs/common';
import { GatewayServiceI, ProcessEventResponseType } from 'src/types';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class GatewayService implements GatewayServiceI {
  constructor(private readonly utils: UtilsService) {}
  processEvent(name: string): Promise<ProcessEventResponseType> {
    return Promise.resolve({ eventId: '1', eventType: '2' });
  }
}
