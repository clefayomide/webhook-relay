import { Request } from 'express';
import { IPGSecurityService } from 'src/modules/security/providers.service';

export type ProcessEventResponseType = { eventId: string; eventType: string };

export interface GatewayControllerI {
  processEvent(name: string): Promise<ProcessEventResponseType>;
}

export interface GatewayServiceI
  extends Pick<GatewayControllerI, 'processEvent'> {}

export type GatewayStrategyType = IPGSecurityService | null;

export type SecurityServicePayload = {
  gateway: string;
  body: Request['body'];
  headers: Request['headers'];
};

export type GatewaySecurityServicePayload = Omit<
  SecurityServicePayload,
  'gateway'
>;
export interface SecurityServiceI {
  verifyRequest(payload: SecurityServicePayload): boolean;
}

interface BaseGatewaySecurityServiceType {
  verifyRequest(payload: GatewaySecurityServicePayload): boolean;
}

export interface IPGSecurityServiceI extends BaseGatewaySecurityServiceType {}

export type IPGVerifyHashParamsType = {
  signature: string;
  data: string;
};

export type UtilsServiceType = {
  resolveGatewayStrategy(gateway: string): GatewayStrategyType;
};
