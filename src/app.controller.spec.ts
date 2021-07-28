import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as faker from 'faker';

describe('AppController', () => {
  let appController: AppController;
  const userName = faker.name.firstName();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!" when no name supplied', () => {
      expect(appController.getHello(undefined)).toBe('Hello World!');
    });

    it(`should return "Hello ${userName}!" when a name supplied`, () => {
      expect(appController.getHello(userName)).toBe(`Hello ${userName}!`);
    });
  });
});
