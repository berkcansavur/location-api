import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSource : DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.model.{js,ts}'],
  migrations: [__dirname +'/../**/*.migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  synchronize: false,
};
export default new DataSource(dataSource);