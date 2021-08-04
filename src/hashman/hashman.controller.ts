import { Controller, Post, Inject, Body, UsePipes } from '@nestjs/common';
import { Encoder } from './interfaces/encoder.interface';
import {
  DECODER_INTERFACE,
  ENCODER_INTERFACE,
} from './interfaces/x-coder.interface';
import { Decoder } from './interfaces/decoder.interface';
import { DecodeDataDTO, EncodeDataDTO } from './hashman.dto';
import { SchemaValidationPipe } from '../pipes/validation/schema-validation-pipe.service';
import { decodeDataSchema, encodeDataSchema } from './encode-data.schema';

@Controller('hashman')
export class HashmanController {
  constructor(
    @Inject(ENCODER_INTERFACE)
    private readonly encoder: Encoder,
    @Inject(DECODER_INTERFACE)
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
