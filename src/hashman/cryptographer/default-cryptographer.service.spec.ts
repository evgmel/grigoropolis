import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCryptographerService } from './default-cryptographer.service';
import { CryptoAlgorithm } from '../interfaces/x-coder.interface';
import * as faker from 'faker';

const createTestModule = async ({
  secretKey,
  algorithm,
  iv,
}: {
  secretKey: string;
  algorithm?: CryptoAlgorithm;
  iv?: string;
}) => {
  return Test.createTestingModule({
    providers: [
      {
        provide: DefaultCryptographerService,
        useValue: new DefaultCryptographerService(secretKey, algorithm, iv),
      },
    ],
  }).compile();
};

const getCryptographerService = (module: TestingModule) => {
  return module.get<DefaultCryptographerService>(DefaultCryptographerService);
};

describe('DefaultCryptographerService', () => {
  const secretKey = 'test-secret';
  const iv = 'test-initialization-vector';
  const algorithm = CryptoAlgorithm.AES_192_GCM;

  let service: DefaultCryptographerService;

  beforeEach(async () => {
    const module: TestingModule = await createTestModule({
      secretKey,
      algorithm,
      iv,
    });

    service = getCryptographerService(module);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should encrypt and decrypt value', async () => {
  //   const valueToEncrypt = faker.company.companyName();
  //
  //   const encryptedValue: Buffer = await service.encrypt(valueToEncrypt);
  //   const decryptedValue: Buffer = await service.decrypt(encryptedValue);
  //
  //   expect(decryptedValue.toString('utf-8')).toBe(valueToEncrypt);
  // });

  it('should encrypt value', async () => {
    const valueToEncrypt = 'some-test-secret';

    const encryptedValue: Buffer = await service.encrypt(valueToEncrypt);
    const expectedValue = 'aHmQaywOUcPVD3un87rleQ==';

    expect(encryptedValue.toString('base64')).toBe(expectedValue);
  });

  it('should get same encrypted value with fixed IV', async () => {
    const valueToEncrypt = faker.company.companyName();

    const encryptedValue1: Buffer = await service.encrypt(valueToEncrypt);
    const encryptedValue2: Buffer = await service.encrypt(valueToEncrypt);

    expect(encryptedValue1).toEqual(encryptedValue2);
  });

  it('should get different encrypted value with different IV', async () => {
    const valueToEncrypt = faker.company.companyName();

    const module: TestingModule = await createTestModule({
      secretKey,
      iv: null,
    });

    service = getCryptographerService(module);

    const encryptedValue1: Buffer = await service.encrypt(valueToEncrypt);
    const encryptedValue2: Buffer = await service.encrypt(valueToEncrypt);

    expect(encryptedValue1.toString('utf-8')).not.toBe(
      encryptedValue2.toString('utf-8'),
    );
  });
});
