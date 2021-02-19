import stylus from 'stylus';
import { Options } from './interface';

export function getDependencies({
  content,
  filePath,
  options,
}: {
  content: string;
  filePath: string;
  options: Options;
}): string[] {
  const style = stylus(content, { filename: filePath, ...options });
  return style.deps(filePath);
}
