import { AppEnv } from '../enums/appConfig.enum';

export default interface AppConfig {
  NODE_ENV: AppEnv;
  PORT: number;
}
