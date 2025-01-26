import { execSync } from 'child_process';

/**
 * Executes a command synchronously, returning stdout as a string.
 */
export function runCommand(command: string): string {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (error) {
    console.error('❌ Error running command:', command);
    throw error;
  }
}

/**
 * Checks if a container with the given name exists
 */
export function containerExists(containerName: string): boolean {
  const command = `docker ps -a --filter "name=${containerName}" --format "{{.Names}}"`;
  const result = runCommand(command);
  return result === containerName;
}

/**
 * Checks if a container is running
 */
export function containerIsRunning(containerName: string): boolean {
  const command = `docker ps --filter "name=${containerName}" --format "{{.Names}}"`;
  const result = runCommand(command);
  return result === containerName;
}
