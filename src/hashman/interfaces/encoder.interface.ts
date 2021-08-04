import { XCoderOptions } from './x-coder.interface';

export interface Encoder {
  encode(data: string | number, opts?: XCoderOptions): Promise<string>;
}
