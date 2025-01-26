import { getDatabaseConfig } from '../util/handleEnv';
import { writeFileSync } from 'fs';
import { join } from 'path';

function generateConnectionString() {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
  } = getDatabaseConfig();

  console.log('📝 Generating connection string...');

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

generateConnectionString(); 