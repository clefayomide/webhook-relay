import { Request, Response } from 'express';
import { INTERNAL_EVENTS, IPG_EVENTS, SUPPORTED_GATEWAY } from 'src/constant';
import { IPGProvider } from 'src/modules/provider/ipg.service';

export interface GatewayControllerI {
  receiveEvent(body: any, response: Response): NormalizedWebhookPayloadType;
}

export interface GatewayServiceI {
  processEvent(body: any): NormalizedWebhookPayloadType;
}

export type ProcessorStrategyType = IPGProvider | null;

export type ProcessorVerifyReqPayloadType = {
  gateway: SupportedGatewayType;
  body: Request['body'];
  headers: Request['headers'];
};

export type ProviderVerifyReqPayloadType = Omit<
  ProcessorVerifyReqPayloadType,
  'gateway'
>;
export interface ProcessorServiceI {
  verifyRequest(payload: ProcessorVerifyReqPayloadType): boolean;
  normalizeEvent(payload: IPGWebhookPayloadType): NormalizedWebhookPayloadType;
}

interface BaseProviderI {
  verifyRequest(payload: ProviderVerifyReqPayloadType): boolean;
}

export interface IPGProviderI extends BaseProviderI {
  normalizeEvent(payload: IPGWebhookPayloadType): NormalizedWebhookPayloadType;
}

export type IPGVerifyHashParamsType = {
  signature: string;
  data: string;
};

export type UtilsType = {
  resolveGatewayStrategy(gateway: string): ProcessorStrategyType;
  resolveTransactionStatus(staus: string): string;
  getProviderSecret(gateway: SupportedGatewayType): string | null;
};

export interface StrategyFactoryI {
  createStrategyMap(gateway: string): ProcessorStrategyType;
}

export type SupportedGatewayType =
  (typeof SUPPORTED_GATEWAY)[keyof typeof SUPPORTED_GATEWAY];

type IPGWebhookPayloadDataFieldType = {
  remittanceAmount: number;
  bankCode: string;
  amount: number;
  paymentReference: string;
  channel: string;
  splitAccounts: any[];
  retrievalReferenceNumber: string;
  transactionDate: number;
  accountNumber: string | null;
  responseCode: string;
  token: string | null;
  responseDescription: string;
  paymentId: number;
  merchantCustomerId: string;
  escrow: boolean;
  merchantReference: string;
  currencyCode: string;
  merchantCustomerName: string;
  cardNumber: string;
};

export type IPGWebhookTransactionEventType =
  (typeof IPG_EVENTS.TRANSACTION)[keyof typeof IPG_EVENTS.TRANSACTION];

export type InternalTransactionEventType =
  (typeof INTERNAL_EVENTS.TRANSACTION)[keyof typeof INTERNAL_EVENTS.TRANSACTION];

export type IPGWebhookPayloadType = {
  event: IPGWebhookTransactionEventType;
  uuid: string;
  timestamp: number;
  data: IPGWebhookPayloadDataFieldType;
};

export type NormalizedWebhookPayloadType = {
  eventType: InternalTransactionEventType;
  eventId: string;
  source: SupportedGatewayType;
  data: {
    reference: string;
    status: string;
    amount: number;
    currency: string;
    channel: string;
    timestamp: number;
    statusDescription: string;
    customer: {
      email: string;
      name: string;
    } | null;
  };
  originalEvent: string;
};

export interface IPGAdapterI {
  normalizeEvent(payload: IPGWebhookPayloadType): NormalizedWebhookPayloadType;
}
