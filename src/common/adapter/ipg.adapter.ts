import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CURRENCY_CODES,
  INTERNAL_EVENTS,
  IPG_EVENTS,
  SUPPORTED_GATEWAY,
} from 'src/constant';
import {
  IPGAdapterI,
  IPGWebhookPayloadType,
  NormalizedWebhookPayloadType,
} from 'src/types';
import { Utils } from '../utils/app.utils';

@Injectable()
export class IPGAdapter implements IPGAdapterI {
  constructor(
    @Inject(forwardRef(() => Utils))
    private readonly utils: Utils,
  ) {}

  private mapper(payload: IPGWebhookPayloadType): NormalizedWebhookPayloadType {
    const data = {
      eventId: payload.uuid,
      source: SUPPORTED_GATEWAY.IPG,
      data: {
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
        customer: {
          email: payload.data.merchantCustomerId,
          name: payload.data.merchantCustomerName,
        },
      },
      originalEvent: JSON.stringify(payload),
    };

    const map = {
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

    return map[payload.event];
  }

  public normalizeEvent(
    payload: IPGWebhookPayloadType,
  ): NormalizedWebhookPayloadType {
    return this.mapper(payload);
  }
}
