import { XCoderOptions } from './x-coder.interface';

export interface Decoder {
  decode(data: string, opts?: XCoderOptions): Promise<string>;
}
