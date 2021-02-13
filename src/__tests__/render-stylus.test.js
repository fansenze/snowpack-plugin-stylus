const stylus = require('stylus');
const renderStylus = require('../render-stylus');

jest.mock('stylus');

test('should call stylus.render and resolve with the returned value', () => {
    const promise = renderStylus('fileContent', { arg: 'value' });
    stylus.render.mock.calls[0][2](undefined, 'stylusResult');
    return promise.then(result => {
        expect(stylus.render).toBeCalledWith('fileContent', { arg: 'value' }, expect.any(Function));
        expect(result).toBe('stylusResult');
    });
});

test('should reject the promise if error is not undefined', (done) => {
    const promise = renderStylus('fileContent');
    stylus.render.mock.calls[0][2]('stylusError');
    return promise
        .then(() => done('should have thrown an error'))
        .catch((err) => {
            expect(err).toBe('stylusError');
            done();
        });
});
