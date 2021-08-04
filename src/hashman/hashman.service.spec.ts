import { Test, TestingModule } from '@nestjs/testing';
import { HashmanService } from './hashman.service';
import {
  DECODER_INTERFACE,
  ENCODER_INTERFACE,
  HASHMAN_SECRET_KEY,
} from './interfaces/x-coder.interface';

describe('HashmanService', () => {
  const secretKey = 'fake-secret-key';

  let service: HashmanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<HashmanService>(HashmanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encode value', async () => {
    const valueToEncode = 'SomeValue';
    const encodedValue = await service.encode(valueToEncode);

    expect(encodedValue).toBe(encodedValue);
  });
});
