import { SnowpackConfig, PluginLoadOptions } from 'snowpack';
import * as path from 'path';
import * as fs from 'fs';
import main from '../src';
import { Options } from '../src/interface';

describe('test src/index.ts', () => {
  const snowpackConfig = {} as SnowpackConfig;
  const options: Options = {};

  it('plugin config', () => {
    const plugin = main(snowpackConfig, options);

    expect(plugin.name).toEqual('snowpack-plugin-stylus');
    expect(plugin.resolve).toEqual({
      input: ['.styl'],
      output: ['.css'],
    });
    expect(typeof plugin.load === 'function').toBeTruthy();
  });

  it('plugin.load()', async () => {
    const filepath = path.join(__dirname, './fixtures/a.styl');
    const plugin = main(snowpackConfig, options);
    const loadOptions: PluginLoadOptions = {
      filePath: filepath,
      fileExt: path.extname(filepath),
      isDev: false,
      isHmrEnabled: false,
      isSSR: false,
    };
    const css = fs.readFileSync(filepath, 'utf-8') + '\n';
    const loadResult = await plugin.load?.(loadOptions);

    expect(loadResult).toStrictEqual({
      '.css': {
        code: css,
      },
    });
  });

  it('plugin.load(): file not exists', async () => {
    const spyConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

    const filepath = path.join(__dirname, './fixtures/c.styl');
    const plugin = main(snowpackConfig, options);
    const loadOptions: PluginLoadOptions = {
      filePath: filepath,
      fileExt: path.extname(filepath),
      isDev: false,
      isHmrEnabled: false,
      isSSR: false,
    };

    expect(spyConsole).not.toBeCalled();

    const loadResult = await plugin.load?.(loadOptions);

    expect(loadResult).toStrictEqual(undefined);
    expect(spyConsole).toBeCalledTimes(1);

    spyConsole.mockReset();
  });

  it('calls markChanged for importers of file when onChange is called',async () => {
    const filePathA = path.join(__dirname, './fixtures/a.styl');
    const filePathB = path.join(__dirname, './fixtures/b.styl');

    const plugin = main(snowpackConfig, options);
    const spyMarkChanged = jest.fn();
    plugin.markChanged = spyMarkChanged;

    const loadFile = async (filePath: string) => {
      const loadOptions: PluginLoadOptions = {
        filePath,
        fileExt: path.extname(filePath),
        isDev: false,
        isHmrEnabled: false,
        isSSR: false,
      };
      return plugin.load?.(loadOptions);
    };

    await loadFile(filePathA);
    await loadFile(filePathB);

    plugin.onChange?.({ filePath: filePathA })

    expect(spyMarkChanged).toBeCalledTimes(1);
    expect(spyMarkChanged).toBeCalledWith(filePathB);
  });
});
