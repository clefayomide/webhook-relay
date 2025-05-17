import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayControllerI } from '../../types';
import { apiEntryPoint } from '../../constant';
import { Response } from 'express';

@Controller(apiEntryPoint)
export class GatewayController implements GatewayControllerI {
  constructor(private readonly gatewayService: GatewayService) {}
  @Post(':name')
  @HttpCode(HttpStatus.OK)
  receiveEvent(@Body() body: any, @Res() response: Response) {
    response.end();
    return this.gatewayService.processEvent(body);
  }
}
