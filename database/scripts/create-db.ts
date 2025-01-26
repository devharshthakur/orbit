import { getDatabaseConfig } from '../util/handleEnv';
import { runCommand, containerExists, containerIsRunning } from '../util/util';
import { writeFileSync } from 'fs';
import { join } from 'path';

function createDatabaseContainer() {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_CONTAINER_NAME,
    POSTGRES_IMAGE,
    POSTGRES_VOLUME_PATH
  } = getDatabaseConfig();

  console.log('🛠️  Creating Postgres container...');

  // Check if container already exists
  if (containerExists(POSTGRES_CONTAINER_NAME)) {
    console.log(`⚠️  Container "${POSTGRES_CONTAINER_NAME}" already exists.`);
    // If it exists but is not running, you can start it or just skip
    if (!containerIsRunning(POSTGRES_CONTAINER_NAME)) {
      console.log('ℹ️  You can start it using the "start-db" script.');
    }
    return;
  }

  // Construct Docker run command with volume attachment
  const command = `
    docker run -d \
    --name ${POSTGRES_CONTAINER_NAME} \
    -p ${POSTGRES_PORT}:5432 \
    -e POSTGRES_USER=${POSTGRES_USER} \
    -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
    -e POSTGRES_DB=${POSTGRES_DB} \
    -v ${POSTGRES_VOLUME_PATH}:/var/lib/postgresql/data \
    ${POSTGRES_IMAGE}
  `.trim();

  runCommand(command);
  console.log('✅ Postgres container created and volume attached!');

  // Generate connection string
  const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}`;
  
  // Save connection string to a file
  const filePath = join(__dirname, '..', 'connection.txt');
  try {
    writeFileSync(filePath, connectionString);
    console.log('✅ Connection string saved to database/connection.txt');
  } catch (error) {
    console.error('❌ Error saving connection string:', error);
  }
}

createDatabaseContainer();
