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

  async decrypt(value: string): Promise<Buffer> {
    return Buffer.from(value);
  }

  async encrypt(value: string): Promise<Buffer> {
    const algo = this.getAlgorithm();
    const key = this.getKeyHash();
    const iv = this.getIV();

    const cipher = crypto.createCipheriv(algo, key, iv);

    const firstPart = cipher.update(value, 'utf-8', 'base64');
    const finalPart = cipher.final('base64');
    return Buffer.from(`${firstPart}${finalPart}`);
  }

  private getKeyHash(): string {
    return crypto
      .createHash('sha256')
      .update(this.secretKey, 'utf-8')
      .digest('base64')
      .substr(0, 24);
  }

  private getAlgorithm(): CryptoAlgorithm {
    return this.algorithm || CryptoAlgorithm.AES_256_GCM;
  }

  private getIV(): string {
    const ivBuffer = this.iv ? Buffer.from(this.iv) : crypto.randomBytes(16);
    return ivBuffer.toString('hex').slice(0, 16);
  }
}
