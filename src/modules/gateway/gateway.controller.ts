import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayControllerI } from 'src/types';
import { apiEntryPoint } from 'src/constant';
import { Response } from 'express';

@Controller(apiEntryPoint)
export class GatewayController implements GatewayControllerI {
  constructor(private readonly gatewayService: GatewayService) {}
  @Post(':name')
  @HttpCode(HttpStatus.OK)
  processEvent(@Param() name: string, @Res() response: Response) {
    response.end();
    return this.gatewayService.processEvent(name);
  }
}
