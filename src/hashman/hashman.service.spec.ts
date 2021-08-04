import { Test, TestingModule } from '@nestjs/testing';
import { HashmanService } from './hashman.service';
import { DECODER, ENCODER, HASHMAN_SECRET_KEY } from '../constants';

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
          provide: ENCODER,
          useExisting: HashmanService,
        },
        {
          provide: DECODER,
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
