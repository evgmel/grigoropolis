import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  Cryptographer,
  DecryptOptions,
  EncryptionResult,
  EncryptOptions,
} from '../interfaces/x-coder.interface';
import { types } from 'util';
import { CryptoAlgorithm } from '../constants/crypto-algorithm.enum';

@Injectable()
export class CryptographerService implements Cryptographer {
  constructor(
    private readonly secretKey: string,
    private readonly algorithm?: CryptoAlgorithm,
    private readonly iv?: string,
  ) {}

  async decrypt(options: DecryptOptions): Promise<Buffer> {
    const decryptor = this.createDecryptor(
      options.algorithm,
      options.iv,
      options.secretKey && CryptographerService.toBuffer(options.secretKey),
    );

    const authTag =
      options.authTag && CryptographerService.toBuffer(options.authTag);

    decryptor.setAuthTag(authTag);
    const value = CryptographerService.toBuffer(options.value);

    return Buffer.concat([decryptor.update(value), decryptor.final()]);
  }

  async encrypt(options: EncryptOptions): Promise<EncryptionResult> {
    const encryptor = this.createEncryptor(
      options.algorithm,
      options.iv,
      options.secretKey && CryptographerService.toBuffer(options.secretKey),
    );

    const value = CryptographerService.toBuffer(options.value);

    const encryptedValue = Buffer.concat([
      encryptor.update(value),
      encryptor.final(),
    ]);
    const authTag = encryptor.getAuthTag();

    return {
      authTag,
      value: encryptedValue,
      iv: this.getIV(options.iv),
      algorithm: this.getAlgorithm(options.algorithm),
    };
  }

  private createEncryptor(
    alg?: CryptoAlgorithm,
    iv?: Buffer,
    secret?: Buffer,
  ): crypto.CipherGCM {
    const algo = this.getAlgorithm(alg);
    const keyLength = this.getKeyLength(alg);
    const key = this.getKeyHash(secret, keyLength);
    const IV = this.getIV(iv);

    return crypto.createCipheriv(algo, key, IV);
  }

  private createDecryptor(
    alg?: CryptoAlgorithm,
    iv?: Buffer,
    secret?: Buffer,
  ): crypto.DecipherGCM {
    const algo = this.getAlgorithm(alg);
    const keyLength = this.getKeyLength(alg);
    const key = this.getKeyHash(secret, keyLength);
    const IV = this.getIV(iv);

    return crypto.createDecipheriv(algo, key, IV);
  }

  private getKeyHash(secretKey?: Buffer, keyLength?: number): Buffer {
    const key = secretKey || CryptographerService.toBuffer(this.secretKey);

    return crypto.createHash('sha256').update(key).digest().slice(0, keyLength);
  }

  private getKeyLength(alg?: CryptoAlgorithm): number {
    const algorithm = this.getAlgorithm(alg);

    if (algorithm === CryptoAlgorithm.AES_256_GCM) {
      return 32;
    }

    if (algorithm === CryptoAlgorithm.AES_192_GCM) {
      return 24;
    }

    return 16;
  }

  private getAlgorithm(alg?: CryptoAlgorithm): CryptoAlgorithm {
    return alg || this.algorithm || CryptoAlgorithm.AES_256_GCM;
  }

  private getIV(iv?: Buffer): Buffer {
    const ivBuffer =
      iv ||
      (this.iv && CryptographerService.toBuffer(this.iv)) ||
      crypto.randomBytes(16);
    return ivBuffer.slice(0, 16);
  }

  private static toBuffer(value: string | Buffer): Buffer {
    return types.isAnyArrayBuffer(value)
      ? value
      : (Buffer.from(value) as Buffer);
  }
}
