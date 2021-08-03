import { Inject, Injectable } from '@nestjs/common';
import { Encoder } from './interfaces/encoder.interface';
import { Decoder } from './interfaces/decoder.interface';
import { CoderOptions } from './interfaces/coder-options.interface';

@Injectable()
export class HashmanService implements Encoder, Decoder {
  constructor(
    @Inject('HASHMAN_SECRET_KEY') private readonly hashmanSecretKey: string,
  ) {}

  async decode(data: string, opts?: CoderOptions): Promise<string> {
    return data;
  }

  async encode(data: string | number, opts?: CoderOptions): Promise<string> {
    return data.toString();
  }
}
