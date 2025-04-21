import {
  GatewaySecurityServicePayload,
  IPGSecurityServiceI,
  IPGVerifyHashParamsType,
} from 'src/types';
import * as crypto from 'crypto';

export class IPGSecurityService implements IPGSecurityServiceI {
  constructor(private readonly secretKey: string) {}
  verifyRequest({ body, headers }: GatewaySecurityServicePayload) {
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
      .createHmac('sha512', this.secretKey)
      .update(data)
      .digest('hex');

    return generatedHash === signature;
  }
}
