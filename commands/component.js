export default function(program) {
  program
    .command('create:component')
    .description('Create a new component')
    .action(() => {
      console.log('🛠️  Creating new component...');
      // You can add scaffolding logic here (e.g., copying templates)
    });

  program
    .command('component:serve')
    .description('Serve the component in a local environment')
    .action(() => {
      console.log('🚀 Serving component...');
      // Launch your dev server here (e.g., Vite, Storybook)
    });

  program
    .command('component:lint')
    .description('Run linter on the component')
    .action(() => {
      console.log('🔍 Linting component...');
      // Hook into ESLint or Prettier here
    });

  program
    .command('component:test')
    .description('Run tests for the component')
    .action(() => {
      console.log('🧪 Testing component...');
      // Execute Jest, Vitest, etc.
    });
};