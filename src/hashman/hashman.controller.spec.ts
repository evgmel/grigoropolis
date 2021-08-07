import { Test, TestingModule } from '@nestjs/testing';
import { HashmanController } from './hashman.controller';
import { HashmanService } from './hashman.service';
import {
  CRYPTOGRAPHER,
  DECODER,
  ENCODER,
  HASHMAN_SECRET_KEY,
} from '../constants';
import { CryptographerService } from './cryptographer/cryptographer.service';

describe('HashmanController', () => {
  const secretKey = 'fake-secret-key';
  let controller: HashmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashmanController],
      providers: [
        HashmanService,
        {
          provide: CRYPTOGRAPHER,
          useValue: new CryptographerService(secretKey),
        },
        {
          provide: HASHMAN_SECRET_KEY,
          useValue: secretKey,
        },
        {
          provide: ENCODER,
          useExisting: HashmanService,
        },
        {
          provide: DECODER,
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
