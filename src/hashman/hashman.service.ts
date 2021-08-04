import { Inject, Injectable } from '@nestjs/common';
import { Encoder } from './interfaces/encoder.interface';
import { Decoder } from './interfaces/decoder.interface';
import { XCoderOptions } from './interfaces/x-coder.interface';
import { HASHMAN_SECRET_KEY } from '../constants';

@Injectable()
export class HashmanService implements Encoder, Decoder {
  constructor(
    @Inject(HASHMAN_SECRET_KEY)
    private readonly secretKey: string,
  ) {}

  async decode(data: string, opts?: XCoderOptions): Promise<string> {
    return data;
  }

  async encode(data: string | number, opts?: XCoderOptions): Promise<string> {
    return data.toString();
  }
}
