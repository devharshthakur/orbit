import { getDatabaseConfig } from '../util/handleEnv';
import { runCommand, containerExists, containerIsRunning } from '../util/util';

function startDatabaseContainer() {
  const { POSTGRES_CONTAINER_NAME } = getDatabaseConfig();

  console.log('🚀 Starting Postgres container...');

  // Check if container exists
  if (!containerExists(POSTGRES_CONTAINER_NAME)) {
    console.log(`⚠️  Container "${POSTGRES_CONTAINER_NAME}" does not exist. Please create it first.`);
    return;
  }

  // Check if container is already running
  if (containerIsRunning(POSTGRES_CONTAINER_NAME)) {
    console.log(`ℹ️  Container "${POSTGRES_CONTAINER_NAME}" is already running.`);
    return;
  }

  // Start container
  runCommand(`docker start ${POSTGRES_CONTAINER_NAME}`);
  console.log('✅ Container started!');
}

startDatabaseContainer();
