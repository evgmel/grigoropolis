import { AppEnv } from '../enums/appConfig.enum';
import { APP_ENV, APP_PORT, HASHMAN_SECRET_KEY } from '../../constants';

export default interface AppConfig {
  [APP_ENV]: AppEnv;
  [APP_PORT]: number;
  [HASHMAN_SECRET_KEY]: string;
}
