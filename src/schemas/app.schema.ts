import * as Joi from 'joi';

export const userNameSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .default('Guest')
  .label('User Name');
