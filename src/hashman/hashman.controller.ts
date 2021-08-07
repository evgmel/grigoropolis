import { Controller, Post, Inject, Body, UsePipes } from '@nestjs/common';
import { Encoder } from './interfaces';
import { Decoder } from './interfaces';
import { DecodeDataDTO, EncodeDataDTO } from './hashman.dto';
import { SchemaValidationPipe } from '../pipes/validation/schema-validation-pipe.service';
import { decodeDataSchema, encodeDataSchema } from './encode-data.schema';
import { DECODER, ENCODER } from '../constants';

@Controller('hashman')
export class HashmanController {
  constructor(
    @Inject(ENCODER)
    private readonly encoder: Encoder,
    @Inject(DECODER)
    private readonly decoder: Decoder,
  ) {}

  @Post()
  @UsePipes(new SchemaValidationPipe(encodeDataSchema))
  async encodeData(@Body() encodeDataDto: EncodeDataDTO): Promise<string> {
    return this.encoder.encode(encodeDataDto.dataToEncode);
  }

  @Post()
  @UsePipes(new SchemaValidationPipe(decodeDataSchema))
  async decodeData(@Body() decodeDataDto: DecodeDataDTO): Promise<string> {
    return this.decoder.decode(decodeDataDto.dataToDecode, {
      dataPassword: decodeDataDto.password,
    });
  }
}
