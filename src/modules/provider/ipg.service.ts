import {
  ProviderVerifyReqPayloadType,
  IPGProviderI,
  IPGVerifyHashParamsType,
  IPGWebhookPayloadType,
} from 'src/types';
import * as crypto from 'crypto';
import { IPGAdapter } from 'src/common/adapter/ipg.adapter';
import { SUPPORTED_GATEWAY } from 'src/constant';
import { Utils } from 'src/common/utils/app.utils';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class IPGProvider implements IPGProviderI {
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
