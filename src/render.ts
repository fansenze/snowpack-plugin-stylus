import stylus from 'stylus';
import { Options } from './interface';

export async function render(content: string, options: Options) {
  return new Promise<string | never>((resolve, reject) => {
    stylus.render(content, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
