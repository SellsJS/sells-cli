import chalk from "chalk";
import path from 'path';
import fs from "fs";

export const createDM = (name, kebabName, basePath) => {
  if (fs.existsSync(basePath)) {
    console.log(chalk.red(`❌ Directory ${kebabName} already exists.`));
    process.exit(1);
  }

  fs.mkdirSync(path.join(basePath, "src"), { recursive: true });
  fs.mkdirSync(path.join(basePath, "tests"), { recursive: true });

  fs.writeFileSync(
    path.join(basePath, "src", `${name}.dm.ts`),
    `import { DMCore, document } from '@sells/dm-core';
import { httpClient } from '@sells/http';

export class ${capitalize(name)}DM extends DMCore {
  @document({method: 'GET', path: '/example', description: '',})
  async getAll() {
    return httpClient.get('API_EXAMPLE', '/example');
  }
}
`
  );

  fs.writeFileSync(
    path.join(basePath, "src", "index.ts"),
    `export * from './${name}.dm';`
  );

  fs.writeFileSync(
    path.join(basePath, "tests", `${name}.dm.test.ts`),
    `import { ${capitalize(name)}DM } from '../src/${name}.dm';
import { httpClient } from '@sells/http';

jest.mock('@sells/http', () => ({
  httpClient: {
    get: jest.fn()
  }
}));

describe('${capitalize(name)}DM', () => {
  const dm = new ${capitalize(name)}DM();

  it('should call httpClient.get with correct arguments and return data', async () => {
    const mockResponse = { data: 'mocked result' };
    (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const res = await dm.getAll();

    expect(httpClient.get).toHaveBeenCalledWith('API_EXAMPLE', '/example');
    expect(res).toBe(mockResponse);
  });
});
`
  );

  fs.writeFileSync(
    path.join(basePath, "tsconfig.json"),
    `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "declaration": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
`
  );

  fs.writeFileSync(
    path.join(basePath, "package.json"),
    JSON.stringify(
      {
        name: `${name}-dm`,
        version: "0.1.0",
        main: "dist/index.js",
        types: "dist/index.d.ts",
        scripts: {
          build: "tsup src/index.ts --dts",
          test: "jest",
          prepare: "npm run build",
        },
        dependencies: {
          "@sells/http": "^0.1.0",
          "axios": "^1.9.0",
          "tsup": "^8.5.0"
        },
        devDependencies: {
          tsup: "^8.0.0",
          typescript: "^5.0.0",
          jest: "^29.0.0",
          "@types/jest": "^29.0.0",
          "ts-jest": "^29.0.0",
        },
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(basePath, "README.md"),
    `# ${capitalize(name)}DM

Data Manager for ${name}, powered by @sells/http.
`
  );

  console.log(
    chalk.green(`✅ Data Manager "${kebabName}" created successfully!`)
  );
};

function capitalize(str) {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}