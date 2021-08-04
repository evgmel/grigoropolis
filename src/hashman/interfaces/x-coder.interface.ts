export interface XCoderOptions {
  dataPassword?: string;
  validUntilTimestamp?: number;
}

export enum CryptoAlgorithm {
  AES_128_GCM = 'aes-128-gcm',
  AES_192_GCM = 'aes-192-gcm',
  AES_256_GCM = 'aes-256-gcm',
}

export interface Cryptographer {
  encrypt(value: string): Promise<Buffer>;
  decrypt(value: string): Promise<Buffer>;
}
