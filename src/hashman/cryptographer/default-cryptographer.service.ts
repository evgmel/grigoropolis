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
export class DefaultCryptographerService implements Cryptographer {
  constructor(
    private readonly secretKey: string,
    private readonly algorithm?: CryptoAlgorithm,
    private readonly iv?: string,
  ) {}

  async decrypt(options: DecryptOptions): Promise<Buffer> {
    const decryptor = this.createDecryptor(
      options.algorithm,
      options.iv,
      options.secretKey &&
        DefaultCryptographerService.toBuffer(options.secretKey),
    );

    const authTag =
      options.authTag && DefaultCryptographerService.toBuffer(options.authTag);

    decryptor.setAuthTag(authTag);
    const value = DefaultCryptographerService.toBuffer(options.value);

    return Buffer.concat([decryptor.update(value), decryptor.final()]);
  }

  async encrypt(options: EncryptOptions): Promise<EncryptionResult> {
    const encryptor = this.createEncryptor(
      options.algorithm,
      options.iv,
      options.secretKey &&
        DefaultCryptographerService.toBuffer(options.secretKey),
    );

    const value = DefaultCryptographerService.toBuffer(options.value);

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
    const key = this.getKeyHash(secret);
    const IV = this.getIV(iv);

    return crypto.createCipheriv(algo, key, IV);
  }

  private createDecryptor(
    alg?: CryptoAlgorithm,
    iv?: Buffer,
    secret?: Buffer,
  ): crypto.DecipherGCM {
    const algo = this.getAlgorithm(alg);
    const key = this.getKeyHash(secret);
    const IV = this.getIV(iv);

    return crypto.createDecipheriv(algo, key, IV);
  }

  private getKeyHash(secretKey?: Buffer): Buffer {
    const key =
      secretKey || DefaultCryptographerService.toBuffer(this.secretKey || '');

    return crypto
      .createHash('sha256')
      .update(key)
      .digest()
      .slice(0, this.getKeyLength());
  }

  private getKeyLength(): number {
    const algorithm = this.getAlgorithm();

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
      (this.iv && DefaultCryptographerService.toBuffer(this.iv)) ||
      crypto.randomBytes(16);
    return ivBuffer.slice(0, 16);
  }

  private static toBuffer(value: string | Buffer): Buffer {
    return types.isAnyArrayBuffer(value)
      ? value
      : (Buffer.from(value) as Buffer);
  }
}
