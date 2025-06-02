#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name("sells")
  .description("CLI to manage applications, components, sections and DMs")
  .version("1.0.0");

// Load dynamic modules
const app = await import(pathToFileURL(join(__dirname, "../commands/app.js")));
const section = await import(
  pathToFileURL(join(__dirname, "../commands/section.js"))
);
const component = await import(
  pathToFileURL(join(__dirname, "../commands/component.js"))
);
const dm = await import(pathToFileURL(join(__dirname, "../commands/dm.js")));

app.default(program);
section.default(program);
component.default(program);
dm.default(program);

// Show custom help manually
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
console.log(chalk.green(`
       ,--.
 ,--/ /
|__/ /  💵  ${chalk.bold('S E L L $')}  💵  - v0.0.1
    /   ,--.   ${chalk.cyan('A CLI framework for modular architecture')}
   /   /  /    ${chalk.gray('Rapidly scaffold apps, UI components and modules')}
   '--'  /     ${chalk.gray('apps, components, sections and DMs')}
         '--'
`));

  console.log(`
${chalk.bold("Available Commands:")}

${chalk.green("create:app")}         Create a new app
${chalk.green("create:catalog")}     Create a new component catalog
${chalk.green("create:component")}   Create a new component
${chalk.green("create:dm")}          Create a new DM
${chalk.green("create:section")}     Create a new section

${chalk.yellow("app:serve")}         Serve app
${chalk.yellow("catalog:serve")}     Serve component catalog
${chalk.yellow("component:serve")}   Serve component
${chalk.yellow("dm:serve")}          Serve DM
${chalk.yellow("section:serve")}     Serve section

${chalk.magenta("app:test")}         Test app
${chalk.magenta("catalog:test")}     Test component catalog
${chalk.magenta("component:test")}   Test component
${chalk.magenta("dm:test")}          Test DM
${chalk.magenta("section:test")}     Test section

${chalk.dim("Type")} ${chalk.cyan("sells <command>")} ${chalk.dim(
    "to get started."
  )}
  `);
  process.exit(0);
}

// Handle unknown commands
program.on("command:*", ([cmd]) => {
  console.error(chalk.red(`\n❌ Unknown command: ${cmd}`));
  console.log(
    `\nUse ${chalk.cyan(
      "sells --help"
    )} to see the list of available commands.\n`
  );
  process.exit(1);
});

// Parse known commands
program.parse(process.argv);
