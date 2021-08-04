class BaseXCoderDTO {
  password?: string;
}

export class EncodeDataDTO extends BaseXCoderDTO {
  dataToEncode: string;
  validUntilTs?: number;
}

export class DecodeDataDTO extends BaseXCoderDTO {
  dataToDecode: string;
}
