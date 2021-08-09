import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Schema } from 'joi';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: any) {
    const { error, value: validatedValue } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return validatedValue;
  }
}
