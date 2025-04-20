import { Request } from 'express';
import { IPGReqSecurityStrategyI, IPGVerifyHashParamsType } from 'src/types';
import * as crypto from 'crypto';

export class IPGSecurityService implements IPGReqSecurityStrategyI {
  constructor(private readonly secretKey: string) {}
  verifyRequest(req: Request): boolean {
    const signature = req.headers['x-interswitch-signature'];

    if (!signature) {
      return false;
    }

    const data = JSON.stringify(req.body ?? {});

    return this.verifySignature({ signature: signature as string, data });
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
