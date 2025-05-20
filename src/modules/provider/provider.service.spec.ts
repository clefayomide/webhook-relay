import { Test, TestingModule } from '@nestjs/testing';
import { IPGProviderService } from '../../modules/provider/ipg.provider.service';
import { ipgMockData } from '../../../test/mocks/index';
import { Utils } from '../../common/utils/app.utils';
import { IPGAdapter } from '../../common/adapter/ipg.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { ipgEventCases, ipgHeaderSignatureKey } from '../../constant';
import { IPGWebhookPayloadType } from 'src/types';

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
    ).toBe(true);
  });

  it('should return false if IPG signature is invalid', () => {
    const localMockData = JSON.parse(
      JSON.stringify(ipgMockData),
    ) as typeof ipgMockData;
    localMockData.header[ipgHeaderSignatureKey] = 'invalid';
    expect(
      IPGService.verifyRequest({
        body: localMockData.body,
        headers: localMockData.header,
      }),
    ).toBe(false);
  });
});

describe('Test the normalization logic that transforms event payloads into the internal format', () => {
  it.each(ipgEventCases)(
    'should normalize IPG event payload',
    ({ event, internal }) => {
      const localMockData = JSON.parse(
        JSON.stringify(ipgMockData),
      ) as typeof ipgMockData;
      const originalEvent = JSON.parse(
        localMockData.normalizedEvent.originalEvent,
      ) as IPGWebhookPayloadType;

      originalEvent.event = event;
      localMockData.body.event = event;
      localMockData.normalizedEvent.eventType = internal;
      localMockData.normalizedEvent.originalEvent =
        JSON.stringify(originalEvent);

      expect(
        IPGService.normalizeEvent(localMockData.body as IPGWebhookPayloadType),
      ).toStrictEqual(localMockData.normalizedEvent);
    },
  );
});
