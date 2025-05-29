export default function(program) {
  program
    .command('create:section')
    .description('Create a new section')
    .action(() => {
      console.log('🛠️  Creating new section...');
      // Add logic to scaffold or initialize a section
    });

  program
    .command('section:serve')
    .description('Serve the section in a local environment')
    .action(() => {
      console.log('🚀 Serving section...');
      // Launch a preview or development server for the section
    });

  program
    .command('section:lint')
    .description('Run linter on the section')
    .action(() => {
      console.log('🔍 Linting section...');
      // Run ESLint, Prettier, or other linters
    });

  program
    .command('section:test')
    .description('Run tests for the section')
    .action(() => {
      console.log('🧪 Testing section...');
      // Run unit tests for the section
    });
};