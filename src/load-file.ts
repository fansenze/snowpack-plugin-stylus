import { readFile} from 'fs';

export async function loadFile(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    });
}
