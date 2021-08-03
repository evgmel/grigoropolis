import * as Joi from 'joi';
import { AppEnv } from '../enums/appConfig.enum';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(AppEnv.PRODUCTION, AppEnv.DEVELOPMENT, AppEnv.TEST)
    .default(AppEnv.DEVELOPMENT),
  APP_PORT: Joi.number().default(3000),
  APP_HASHMAN_SECRET_KEY: Joi.string().default(''),
});
