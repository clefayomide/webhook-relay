import {
  ProviderVerifyReqPayloadType,
  IPGProcessorI,
  IPGVerifyHashParamsType,
} from 'src/types';
import * as crypto from 'crypto';

export class IPGProcessor implements IPGProcessorI {
  constructor(private readonly secret: string) {}
  verifyRequest({ body, headers }: ProviderVerifyReqPayloadType) {
    const signature = headers['x-interswitch-signature'] as string;

    if (!signature) {
      return false;
    }

    const data = JSON.stringify(body ?? {});

    return this.verifySignature({ signature, data });
  }

  private verifySignature({
    signature,
    data,
  }: IPGVerifyHashParamsType): boolean {
    const generatedHash = crypto
      .createHmac('sha512', this.secret)
      .update(data)
      .digest('hex');

    return generatedHash === signature;
  }
}
