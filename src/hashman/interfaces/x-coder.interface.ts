export const HASHMAN_SECRET_KEY = 'HASHMAN_SECRET_KEY';
export const ENCODER_INTERFACE = 'ENCODER_INTERFACE';
export const DECODER_INTERFACE = 'DECODER_INTERFACE';

export interface XCoderOptions {
  dataPassword?: string;
  validUntilTimestamp?: number;
}
