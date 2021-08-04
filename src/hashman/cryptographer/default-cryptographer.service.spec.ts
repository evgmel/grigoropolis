import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCryptographerService } from './default-cryptographer.service';
import { CryptoAlgorithm } from '../interfaces/x-coder.interface';

describe('DefaultCryptographerService', () => {
  const secretKey = 'test-secret';
  const iv = 'test-initialization-vector';
  const algorithm = CryptoAlgorithm.AES_192_GCM;

  let service: DefaultCryptographerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DefaultCryptographerService,
          useValue: new DefaultCryptographerService(secretKey, algorithm, iv),
        },
      ],
    }).compile();

    service = module.get<DefaultCryptographerService>(
      DefaultCryptographerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt value', async () => {
    const valueToEncrypt = 'some value to encrypt';

    const encryptedValue: Buffer = await service.encrypt(valueToEncrypt);
    const decryptedValue: Buffer = await service.decrypt(
      encryptedValue.toString('utf-8'),
    );

    // expect(decryptedValue.toString('utf-8')).toEqual(valueToEncrypt);
  });
});
