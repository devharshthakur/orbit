export interface DatabaseConfig {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: string;
  POSTGRES_CONTAINER_NAME: string;
  POSTGRES_IMAGE: string;
  POSTGRES_VOLUME_PATH: string; 
}
