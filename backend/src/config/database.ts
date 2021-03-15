import { ConnectionOptions } from 'typeorm';
import { User, Role, City, Person, Service } from '../models';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Role, User, Person, City, Service],
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true
};

export default config;