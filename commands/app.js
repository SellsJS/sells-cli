export default function(program) {
  program
    .command('create:app')
    .description('Create a new app (routing, e2e, multi-language, etc)')
    .action(() => {
      console.log('Creando nueva app...');
    });

  program
    .command('app:serve')
    .description('Launch app locally')
    .action(() => {
      console.log('Sirviendo la app...');
    });

  program
    .command('app:test')
    .description('Run tests in the app')
    .action(() => {
      console.log('Testeando la app...');
    });

  program
    .command('app:lint')
    .description('Validate good practices in the app')
    .action(() => {
      console.log('Linteando la app...');
    });

  program
    .command('app:e2e')
    .description('Run E2E tests')
    .action(() => {
      console.log('Corriendo e2e...');
    });
};