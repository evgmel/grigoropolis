import * as Joi from 'joi';

export const encodeDataSchema = Joi.object({
  dataToEncode: Joi.string().required(),
  password: Joi.string().optional(),
  validUntilTs: Joi.number().optional(),
});

export const decodeDataSchema = Joi.object({
  dataToDecode: Joi.string().required().min(10),
  password: Joi.string().optional(),
});
