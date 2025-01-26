import { getDatabaseConfig } from '../util/handleEnv';
import { runCommand, containerExists, containerIsRunning } from '../util/util';

function stopDatabaseContainer() {
  const { POSTGRES_CONTAINER_NAME } = getDatabaseConfig();

  console.log('🛑 Stopping Postgres container...');

  // Check if container exists
  if (!containerExists(POSTGRES_CONTAINER_NAME)) {
    console.log(`⚠️  Container "${POSTGRES_CONTAINER_NAME}" does not exist.`);
    return;
  }

  // Check if container is running
  if (!containerIsRunning(POSTGRES_CONTAINER_NAME)) {
    console.log(`ℹ️  Container "${POSTGRES_CONTAINER_NAME}" is not running.`);
    return;
  }

  // Stop container
  runCommand(`docker stop ${POSTGRES_CONTAINER_NAME}`);
  console.log('✅ Container stopped!');
}

stopDatabaseContainer();
