import { render } from 'stylus';
import { StylusRenderOptions } from './plugin';

export function renderStylus(fileContent: string, options: StylusRenderOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        render(fileContent, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
