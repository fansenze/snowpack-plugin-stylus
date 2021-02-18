import * as fs from 'fs';
import { SnowpackPluginFactory } from 'snowpack';
import { Options } from './interface';
import { render } from './render';
import { getDependencies } from './get-dependencies';

const pkg = require('../package.json');

const plugin: SnowpackPluginFactory<Options> = (snowpackConfig, options = {}) => {
  const importedByMap = new Map<string, string[]>();

  function addDependencies(filePath: string, dependencies: string[]) {
    dependencies.forEach((file) => {
      const currentImports = importedByMap.get(filePath) || [];
      importedByMap.set(file, currentImports.concat(filePath));
    });
  }

  return {
    name: pkg.name,
    resolve: {
      input: ['.styl'],
      output: ['.css'],
    },
    onChange({ filePath }) {
      const filesToMark = importedByMap.get(filePath) || [];
      filesToMark.forEach((file) => this.markChanged && this.markChanged(file));
    },
    async load({ filePath }) {
      try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        const dependencies = getDependencies({ content, filePath, options });
        addDependencies(filePath, dependencies);
        const result = await render(content, {
          ...options,
          filename: filePath,
        });
        return {
          '.css': {
            code: result,
          },
        };
      } catch (err) {
        console.error(err);
      }
    },
  };
};

export = plugin;
