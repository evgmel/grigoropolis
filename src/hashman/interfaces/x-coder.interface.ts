import { CryptoAlgorithm } from '../constants';

export interface XCoderOptions {
  dataPassword?: string;
  validUntilTimestamp?: number;
}

export interface EncryptionResult {
  value: Buffer;
  authTag: Buffer;
  iv: Buffer;
  algorithm: CryptoAlgorithm;
}

export interface CipherOptions {
  algorithm?: CryptoAlgorithm;
  iv?: string | Buffer;
  secretKey?: string | Buffer;
}

export interface EncryptOptions extends CipherOptions {
  value: string | Buffer;
}

export interface DecryptOptions extends CipherOptions {
  value: string | Buffer;
  authTag: string | Buffer;
}

export interface Cryptographer {
  encrypt(options: EncryptOptions): Promise<EncryptionResult>;
  decrypt(options: DecryptOptions): Promise<Buffer>;
}
