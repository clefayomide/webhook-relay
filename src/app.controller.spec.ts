import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { rootPathText } from './constant';

describe('AppController', () => {
  let appController: AppController;
  

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it(`should return "${rootPathText}"`, () => {
      expect(appController.getGreeting()).toBe(rootPathText);
    });
  });
});
