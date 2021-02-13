const fs = require('fs');
const loadFile = require('../load-file');

jest.mock('fs');

test('should load the file and resolve with its content', () => {
    const promise = loadFile('filePath');
    fs.readFile.mock.calls[0][2](undefined, 'fileContent');
    return promise.then(result => {
        expect(fs.readFile).toBeCalledWith('filePath', { encoding: 'utf-8' }, expect.any(Function));
        expect(result).toBe('fileContent');
    });
})

test('should reject the promise if error is not undefined', (done) => {
    const promise = loadFile('filePath');
    fs.readFile.mock.calls[0][2]('readFileError');
    return promise
        .then(() => done('should have thrown an error'))
        .catch((err) => {
            expect(err).toBe('readFileError');
            done();
        });
});
