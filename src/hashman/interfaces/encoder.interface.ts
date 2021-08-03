import { CoderOptions } from './coder-options.interface';

export interface Encoder {
  encode(data: string | number, opts?: CoderOptions): Promise<string>;
}
