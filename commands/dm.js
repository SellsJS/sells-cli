import path from 'path';
import { fileURLToPath } from 'url';

import { createDM } from './dm/create.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (program) => {
  program
    .command('create:dm <name>')
    .description('Create a new DM')
    .action((name) => {
      const kebabName = `${name}-dm`;
      const basePath = path.join(process.cwd(), kebabName);

      createDM(name, kebabName, basePath);
    });

  program
    .command('dm:serve')
    .description('Serve the DM in a local environment')
    .action(() => {
      console.log('🚀 Serving DM...');
      // Hook to local server, dev tools, etc.
    });

  program
    .command('dm:lint')
    .description('Run linter on the DM')
    .action(() => {
      console.log('🔍 Linting DM...');
      // Link to ESLint/Prettier or similar
    });

  program
    .command('dm:test')
    .description('Run tests for the DM')
    .action(() => {
      console.log('🧪 Testing DM...');
      // Run your testing tool here
    });
};