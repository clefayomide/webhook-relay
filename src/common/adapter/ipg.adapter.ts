import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  APP_MSG,
  CURRENCY_CODES,
  INTERNAL_EVENTS,
  IPG_EVENTS,
  SUPPORTED_GATEWAY,
} from '../../constant';
import {
  IPGAdapterI,
  IPGWebhookPayloadType,
  NormalizedWebhookPayloadType,
} from '../../types';
import { Utils } from '../utils/app.utils';

/**
 * The IPGAdapter class is responsible for normalizing webhook payloads received
 * from the IPG (Interswitch Payment Gateway). It maps the raw payload data into
 * a standardized format that can be processed by the application. The class
 * includes methods to map event data, and customer details,
 * ensuring compatibility with the application's internal event structure.
 *
 * Key functionalities:
 * - Validates and normalizes incoming webhook payloads.
 * - Maps raw event data to internal event types.
 * - Handles unsupported events and missing fields gracefully by throwing errors.
 */

@Injectable()
export class IPGAdapter implements IPGAdapterI {
  constructor(
    @Inject(forwardRef(() => Utils))
    private readonly utils: Utils,
  ) {}

  private mapDataField(payload: IPGWebhookPayloadType) {
    return {
      reference: payload.data.merchantReference,
      status: this.utils.resolveTransactionStatus(payload.data.responseCode),
      amount: payload.data.amount,
      currency:
        CURRENCY_CODES[
          payload.data.currencyCode as keyof typeof CURRENCY_CODES
        ],
      channel: payload.data.channel,
      timestamp: payload.timestamp,
      statusDescription: payload.data.responseDescription,
      customer: this.mapCustomerField(payload),
    };
  }

  private mapCustomerField(payload: IPGWebhookPayloadType) {
    return {
      email: payload.data.merchantCustomerId,
      name: payload.data.merchantCustomerName,
    };
  }

  private mapEventData(payload: IPGWebhookPayloadType) {
    const data = {
      eventId: payload.uuid,
      source: SUPPORTED_GATEWAY.IPG,
      data: this.mapDataField(payload),
      originalEvent: JSON.stringify(payload),
    };

    return {
      [IPG_EVENTS.TRANSACTION.CREATED]: {
        eventType: INTERNAL_EVENTS.TRANSACTION.CREATED,
        ...data,
      },

      [IPG_EVENTS.TRANSACTION.UPDATED]: {
        eventType: INTERNAL_EVENTS.TRANSACTION.UPDATED,
        ...data,
      },

      [IPG_EVENTS.TRANSACTION.COMPLETED]: {
        eventType: INTERNAL_EVENTS.TRANSACTION.COMPLETED,
        ...data,
      },
    };
  }

  private mapper(payload: IPGWebhookPayloadType): NormalizedWebhookPayloadType {
    if (!payload.event || !payload.data) {
      throw new Error(`${APP_MSG.MISSING_FIELD}`);
    }

    const map = this.mapEventData(payload);

    if (!map[payload.event]) {
      throw new Error(`${APP_MSG.UNSUPPORTED_EVENT}: ${payload.event}`);
    }

    return map[payload.event];
  }

  public normalizeEvent(
    payload: IPGWebhookPayloadType,
  ): NormalizedWebhookPayloadType {
    return this.mapper(payload);
  }
}
