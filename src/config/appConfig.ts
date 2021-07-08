import AppConfig from './interfaces/appConfig.interface';
import { AppEnv } from './enums/appConfig.enum';

export default (): AppConfig => ({
  NODE_ENV: process.env.NODE_ENV as AppEnv,
  PORT: parseInt(process.env.APP_PORT, 10),
});
