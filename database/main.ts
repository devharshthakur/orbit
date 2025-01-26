import inquirer from 'inquirer';
import { join } from 'path';
import { runCommand } from './util/util';

async function mainMenu() {
  console.log('\n🎛️  Postgres Docker Menu');

  // Present the user with a single list prompt (arrow keys + Enter to choose).
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices: [
        { name: 'Create Database Container', value: 'create' },
        { name: 'Start Database Container', value: 'start' },
        { name: 'Stop Database Container', value: 'stop' },
        { name: 'Generate Connection String', value: 'connection' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);

  switch (option) {
    case 'create':
      runScript('create-db.ts');
      break;
    case 'start':
      runScript('start-db.ts');
      break;
    case 'stop':
      runScript('stop-db.ts');
      break;
    case 'connection':
      runScript('generate-connection.ts');
      break;
    case 'exit':
      console.log('👋 Exiting without any action...');
      process.exit(0);
    default:
      console.log('⚠️ Invalid option. Exiting...');
  }

  // After running the selected script, exit automatically.
  process.exit(0);
}

/**
 * Runs a specified script with ts-node, using the existing runCommand utility.
 */
function runScript(scriptName: string) {
  try {
    const scriptPath = join(__dirname, 'scripts', scriptName);
    runCommand(`ts-node ${scriptPath}`);
  } catch (error) {
    console.error('❌ Error executing script:', error);
  }
}

mainMenu();
