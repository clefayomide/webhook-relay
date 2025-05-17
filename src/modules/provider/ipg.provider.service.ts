import {
  ProviderVerifyReqPayloadType,
  IPGProviderI,
  IPGVerifyHashParamsType,
  IPGWebhookPayloadType,
} from '../../types';
import * as crypto from 'crypto';
import { IPGAdapter } from '../../common/adapter/ipg.adapter';
import { APP_MSG, SUPPORTED_GATEWAY } from '../../constant';
import { Utils } from '../../common/utils/app.utils';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class IPGProviderService implements IPGProviderI {
  constructor(
    @Inject(forwardRef(() => Utils))
    private readonly utils: Utils,
    private readonly adapter: IPGAdapter,
  ) {}

  public verifyRequest({ body, headers }: ProviderVerifyReqPayloadType) {
    const signature = headers['x-interswitch-signature'] as string;

    if (!signature) {
      return false;
    }

    const data = JSON.stringify(body ?? {});

    return this.verifySignature({ signature, data });
  }

  private verifySignature({ signature, data }: IPGVerifyHashParamsType) {
    const secret = this.utils.getProviderSecret(
      SUPPORTED_GATEWAY.IPG,
    ) as string;

    if (!secret) {
      throw new Error(APP_MSG.SECRET_NOT_FOUND);
    }

    const generatedHash = crypto
      .createHmac('sha512', secret)
      .update(data)
      .digest('hex');

    return generatedHash === signature;
  }

  normalizeEvent(payload: IPGWebhookPayloadType) {
    return this.adapter.normalizeEvent(payload);
  }
}
