import { Test, TestingModule } from '@nestjs/testing';
import { HashmanController } from './hashman.controller';
import { HashmanService } from './hashman.service';
import {
  DECODER_INTERFACE,
  ENCODER_INTERFACE,
  HASHMAN_SECRET_KEY,
} from '../constants';

describe('HashmanController', () => {
  const secretKey = 'fake-secret-key';
  let controller: HashmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashmanController],
      providers: [
        HashmanService,
        {
          provide: HASHMAN_SECRET_KEY,
          useValue: secretKey,
        },
        {
          provide: ENCODER_INTERFACE,
          useExisting: HashmanService,
        },
        {
          provide: DECODER_INTERFACE,
          useExisting: HashmanService,
        },
      ],
    }).compile();

    controller = module.get<HashmanController>(HashmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
