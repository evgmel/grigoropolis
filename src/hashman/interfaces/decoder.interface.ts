import { CoderOptions } from './coder-options.interface';

export interface Decoder {
  decode(data: string, opts?: CoderOptions): Promise<string>;
}
