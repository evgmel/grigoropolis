import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as faker from 'faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const userName = faker.name.firstName();
  const singleCharName = faker.name.firstName().substr(0, 1);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/?userName=${userName} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/?name=${userName}`)
      .expect(200)
      .expect(`Hello ${userName}!`);
  });

  it(`/?userName=${singleCharName} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/?name=${singleCharName}`)
      .expect(400);
  });
});
