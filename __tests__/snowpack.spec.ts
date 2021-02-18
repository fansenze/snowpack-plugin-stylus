import { createConfiguration, build, logger } from 'snowpack';
import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';

const root = path.join(__dirname, '..');
const project = path.join(__dirname, 'fixtures/project');
const inputStyleFile = path.join(project, 'src/a.styl');
const pluginMain = path.join(root, 'dist/index.js');

const config = createConfiguration({
  root: project,
  plugins: [pluginMain],
  mount: {
    src: '/src',
  },
});

logger.level = 'silent';

if (!fs.existsSync(pluginMain)) {
  cp.spawnSync('npm', ['run', 'build'], {
    cwd: root,
  });
}

describe('test by snowpack', () => {
  it('load()', async () => {
    const { result, shutdown } = await build({ config, lockfile: undefined });
    const { contents } = Object.values(result).find((e) => e.source === inputStyleFile);
    const css = fs.readFileSync(inputStyleFile, 'utf-8').trim();
    expect((contents as string).trim()).toEqual(css);
    await shutdown();
  });
});
