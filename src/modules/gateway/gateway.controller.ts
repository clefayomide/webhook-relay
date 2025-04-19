import { Controller, HttpCode, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayControllerI } from 'src/types';
import { apiEntryPoint, RESPONSE_CODES } from 'src/constant';

@Controller(apiEntryPoint)
export class GatewayController implements GatewayControllerI {
  constructor(private readonly gatewayService: GatewayService) {}
  @Post(':name')
  @HttpCode(RESPONSE_CODES.SUCCESSFUL)
  processEvent() {
    return this.gatewayService.processEvent();
  }
}
