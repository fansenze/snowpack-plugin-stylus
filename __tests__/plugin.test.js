const plugin = require('../plugin');

jest.mock('../src/load-file');
jest.mock('../src/render-stylus');

const loadFile = require('../src/load-file');
const renderStylus = require('../src/render-stylus');

test('should return the plugin metadata', () => {
    const pluginData = plugin();
    expect(pluginData.name).toBe('snowpack-plugin-stylus');
    expect(pluginData.resolve).toStrictEqual({
        input: ['.styl'],
        output: ['.css']
    });
});

test('should load a given file, compile it and return the result', async () => {
    loadFile.mockImplementation(() => Promise.resolve('fileContent'));
    renderStylus.mockImplementation(() => Promise.resolve('stylusResult'));

    const pluginData = plugin({}, { parameter: 'value' });
    expect(pluginData.load).not.toBe(undefined);

    const result = await pluginData.load({ filePath: 'filePath' });
    expect(result).toStrictEqual({
        '.css': 'stylusResult'
    });
    expect(loadFile).toBeCalledWith('filePath')
    expect(renderStylus).toBeCalledWith('fileContent', { parameter: 'value', filename: 'filePath'});
});
