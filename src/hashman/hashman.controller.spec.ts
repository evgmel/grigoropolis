import { Test, TestingModule } from '@nestjs/testing';
import { HashmanController } from './hashman.controller';

describe('HashmanController', () => {
  let controller: HashmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashmanController],
    }).compile();

    controller = module.get<HashmanController>(HashmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
