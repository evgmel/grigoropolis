import AppConfig from './interfaces/appConfig.interface';
import { AppEnv } from './enums/appConfig.enum';

export default (): AppConfig => ({
  NODE_ENV: (process.env.NODE_ENV || AppEnv.PRODUCTION) as AppEnv,
  PORT: parseInt(process.env.APP_PORT, 10),
  HASHMAN_SECRET_KEY: process.env.APP_HASHMAN_SECRET_KEY || '',
});
