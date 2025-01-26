import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DatabaseConfig } from '../types/db-config';

// Load environment variables from the .env file inside the database folder
dotenvConfig({ path: join(__dirname, '..', '.env') });

export function getDatabaseConfig(): DatabaseConfig {
  return {
    POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
    POSTGRES_DB: process.env.POSTGRES_DB || 'postgres',
    POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
    POSTGRES_CONTAINER_NAME: process.env.POSTGRES_CONTAINER_NAME || 'postgres_container',
    POSTGRES_IMAGE: process.env.POSTGRES_IMAGE || 'postgres:latest',
    POSTGRES_VOLUME_PATH: process.env.POSTGRES_VOLUME_PATH || '/Volumes/T9/docker/volumes'
  };
}
