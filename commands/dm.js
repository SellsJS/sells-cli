export default function(program) {
  program
    .command('create:dm')
    .description('Create a new DM')
    .action(() => {
      console.log('🛠️  Creating new DM...');
      // You could scaffold a DM module here
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