import { Inject, Injectable } from '@nestjs/common';
import { Cryptographer, XCoderOptions } from './interfaces';
import { CRYPTOGRAPHER } from '../constants';

@Injectable()
export class HashmanService {
  constructor(
    @Inject(CRYPTOGRAPHER)
    private readonly cryptographer: Cryptographer,
  ) {}

  async decode(data: string, opts?: XCoderOptions): Promise<string> {
    return data;
  }

  async encode(data: string | number, opts?: XCoderOptions): Promise<string> {
    return data.toString();
  }
}
