import type { SnowpackBuildMap, SnowpackBuiltFile, SnowpackConfig, SnowpackPlugin } from 'snowpack';
import * as stylus from 'stylus';

const pkg = require('../package.json');
import { loadFile } from './load-file';
import { renderStylus } from './render-stylus';

export type StylusRenderOptions = Parameters<typeof stylus>[1];

export default function plugin(snowpackConfig: SnowpackConfig, options: StylusRenderOptions): SnowpackPlugin {
  return {
    name: pkg.name,
    resolve: {
      input: ['.styl'],
      output: ['.css'],
    },
    async load({ filePath }): Promise<SnowpackBuildMap> {
      const fileContent = await loadFile(filePath);
      const result = await renderStylus(fileContent, { ...options, filename: filePath });
      const builtFile: SnowpackBuiltFile = {
        code: result,
        map: undefined
      };
      return {
        '.css': builtFile,
      };
    },
  };
}
