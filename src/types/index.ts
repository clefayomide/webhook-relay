import { Request } from 'express';

export type ProcessEventResponseType = { eventId: string; eventType: string };

export interface GatewayControllerI {
  processEvent(): Promise<ProcessEventResponseType>;
}

export interface GatewayServiceI extends GatewayControllerI {}

export interface SecurityServiceI {
  verifyRequest(req: Request): boolean;
}

export interface GatewayReqSecurityBaseStrategyI extends SecurityServiceI {}

export interface IPGReqSecurityStrategyI
  extends GatewayReqSecurityBaseStrategyI {}

export type SecurityStrategyType = IPGReqSecurityStrategyI;

export type IPGVerifyHashParamsType = {
  signature: string;
  data: string;
};
