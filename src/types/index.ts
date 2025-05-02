import { Request, Response } from 'express';
import { IPGProcessor } from 'src/modules/processor/providers/ipg.processor';

export type ProcessEventResponseType = { eventId: string; eventType: string };

export interface GatewayControllerI {
  receiveEvent(
    name: string,
    response: Response,
  ): Promise<ProcessEventResponseType>;
}

export interface GatewayServiceI {
  processEvent(
    name: string,
    response: Response,
  ): Promise<ProcessEventResponseType>;
}

export type ProcessorStrategyType = IPGProcessor | null;

export type ProcessorVerifyReqPayloadType = {
  gateway: string;
  body: Request['body'];
  headers: Request['headers'];
};

export type ProviderVerifyReqPayloadType = Omit<
  ProcessorVerifyReqPayloadType,
  'gateway'
>;
export interface ProcessorServiceI {
  verifyRequest(payload: ProcessorVerifyReqPayloadType): boolean;
}

interface BaseProcessorI {
  verifyRequest(payload: ProviderVerifyReqPayloadType): boolean;
}

export interface IPGProcessorI extends BaseProcessorI {}

export type IPGVerifyHashParamsType = {
  signature: string;
  data: string;
};

export type UtilsServiceType = {
  resolveGatewayStrategy(gateway: string): ProcessorStrategyType;
};

export interface StrategyFactoryI {
  createStrategyMap(gateway: string): ProcessorStrategyType;
}
