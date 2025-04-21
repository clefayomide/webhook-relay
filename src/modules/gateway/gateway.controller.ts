import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayControllerI } from 'src/types';
import { apiEntryPoint } from 'src/constant';

@Controller(apiEntryPoint)
export class GatewayController implements GatewayControllerI {
  constructor(private readonly gatewayService: GatewayService) {}
  @Post(':name')
  @HttpCode(HttpStatus.OK)
  processEvent(@Param() name: string) {
    return this.gatewayService.processEvent(name);
  }
}
