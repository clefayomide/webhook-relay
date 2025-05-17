import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import {
  ipgHeaderSignatureKey,
  rootPathText,
  supportedGateways,
} from '../../src/constant';
import { ipgMockData } from '../../test/mocks';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get entry route', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(rootPathText);
  });

  it('should receive post and return error if no payload or malformed payload supplied', () => {
    return request(app.getHttpServer())
      .post('/gateway/ipg')
      .expect(400)
      .expect({
        message:
          'Insufficient or malformed payload: check your header and body',
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('should receive post and return error if an invalid processor param is passed', () => {
    return request(app.getHttpServer())
      .post('/gateway/ipgg')
      .expect(400)
      .expect({
        message: `We only support the following gateways currently: ${supportedGateways}`,
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('should receive post and return error if a malformed payload supplied', () => {
    return request(app.getHttpServer())
      .post('/gateway/ipg')
      .set(
        ipgHeaderSignatureKey,
        ipgMockData.header[ipgHeaderSignatureKey] + 'invalid',
      )
      .send(ipgMockData.body)
      .expect(400)
      .expect({
        message:
          'Insufficient or malformed payload: check your header and body',
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('should receive post and return 200 in acknowledgement', () => {
    return request(app.getHttpServer())
      .post('/gateway/ipg')
      .set(ipgHeaderSignatureKey, ipgMockData.header[ipgHeaderSignatureKey])
      .send(ipgMockData.body)
      .expect(200);
  });
});
