import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  CryptoAlgorithm,
  Cryptographer,
} from '../interfaces/x-coder.interface';

@Injectable()
export class DefaultCryptographerService implements Cryptographer {
  constructor(
    readonly secretKey: string,
    readonly algorithm?: CryptoAlgorithm,
    readonly iv?: string,
  ) {}

  async decrypt(value: Buffer): Promise<Buffer> {
    const decryptor = this.createDecryptor();

    return Buffer.concat([decryptor.update(value), decryptor.final()]);
  }

  async encrypt(value: string | Buffer): Promise<Buffer> {
    const encryptor = this.createEncryptor();

    return Buffer.concat([encryptor.update(value), encryptor.final()]);
  }

  private createEncryptor(): crypto.CipherGCM {
    const algo = this.getAlgorithm();
    const key = this.getKeyHash();
    const iv = this.getIV();

    return crypto.createCipheriv(algo, key, iv);
  }

  private createDecryptor(): crypto.DecipherGCM {
    const algo = this.getAlgorithm();
    const key = this.getKeyHash();
    const iv = this.getIV();

    return crypto.createDecipheriv(algo, key, iv);
  }

  private getKeyHash(): Buffer {
    return crypto
      .createHash('sha256')
      .update(this.secretKey, 'utf-8')
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

  private getAlgorithm(): CryptoAlgorithm {
    return this.algorithm || CryptoAlgorithm.AES_256_GCM;
  }

  private getIV(): Buffer {
    const ivBuffer = this.iv ? Buffer.from(this.iv) : crypto.randomBytes(16);
    return ivBuffer.slice(0, 16);
  }
}
