import { AppEnv } from '../enums/appConfig.enum';
import { HASHMAN_SECRET_KEY } from '../../hashman/interfaces/x-coder.interface';

export default interface AppConfig {
  NODE_ENV: AppEnv;
  PORT: number;
  [HASHMAN_SECRET_KEY]: string;
}
