import { Test, TestingModule } from '@nestjs/testing';
import { IPGProviderService } from '../../modules/provider/ipg.provider.service';
import { ipgMockData } from '../../../test/mocks/index';
import { Utils } from '../../common/utils/app.utils';
import { IPGAdapter } from '../../common/adapter/ipg.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
// import { IPGWebhookPayloadType } from 'src/types';

let IPGService: IPGProviderService;

beforeEach(async () => {
  const processor: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
    providers: [IPGProviderService, Utils, IPGAdapter, ConfigService],
  }).compile();

  IPGService = processor.get<IPGProviderService>(IPGProviderService);
});

describe('Test the signature validation logic that verifies the event authenticity', () => {
  it('should return true if IPG signature is valid', () => {
    expect(
      IPGService.verifyRequest({
        body: ipgMockData.body,
        headers: ipgMockData.header,
      }),
    ).toStrictEqual<boolean>(true);
  });

  it('should return false if IPG signature is invalid', () => {
    ipgMockData.header['x-interswitch-signature'] = 'invalid';
    expect(
      IPGService.verifyRequest({
        body: ipgMockData.body,
        headers: ipgMockData.header,
      }),
    ).toStrictEqual<boolean>(false);
  });
});

// describe('Test the normalization logic that transforms event payloads into the internal format', () => {
//   it(`should normalize IPG event payload`, () => {
//     expect(
//       IPGService.normalizeEvent(ipgMockData.body as IPGWebhookPayloadType),
//     ).toStrictEqual(ipgMockData.normalizedEvent);
//   });
// });
