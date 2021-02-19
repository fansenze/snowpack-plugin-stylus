import { getDependencies } from '../src/get-dependencies';
import { readFileSync } from 'fs';
import path from "path";

describe('test src/get-dependencies.ts', () => {
  it('uses stylus.deps() to get the imports of a file', () => {
    const filePath = path.join(__dirname, './fixtures/b.styl');
    const content = readFileSync(filePath, 'utf-8');
    const dependencies = getDependencies({
      content,
      filePath,
      options: {}
    });

    expect(dependencies).toStrictEqual([
      path.join(__dirname, './fixtures/a.styl')
    ]);
  });
});
