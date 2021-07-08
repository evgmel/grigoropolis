export interface AppConfig {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
}

export default (): AppConfig => ({
  PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  DB_HOST: process.env.APP_DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.APP_DB_PORT, 10) || 27017,
});
