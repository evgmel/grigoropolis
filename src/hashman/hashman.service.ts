import { Inject, Injectable } from '@nestjs/common';
import { Encoder } from './interfaces/encoder.interface';
import { Decoder } from './interfaces/decoder.interface';
import {
  HASHMAN_SECRET_KEY,
  XCoderOptions,
} from './interfaces/x-coder.interface';

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