const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('plugin', () => {
    const mocks = {
        loadFile: sinon.stub(),
        renderStylus: sinon.stub()
    };

    const plugin = proxyquire.noCallThru()('../../plugin', {
        './src/load-file': mocks.loadFile,
        './src/render-stylus': mocks.renderStylus
    });

    afterEach(() => {
        mocks.loadFile.reset();
        mocks.renderStylus.reset();
    });

    it('should return the plugin metadata', () => {
        const pluginData = plugin();
        expect(pluginData.name).to.equal('snowpack-plugin-stylus');
        expect(pluginData.resolve).to.deep.equal({
            input: ['.styl'],
            output: ['.css']
        });
    });

    it('should load a given file, compile it and return the result', async () => {
        mocks.loadFile.resolves('fileContent');
        mocks.renderStylus.resolves('stylusResult');
        const pluginData = plugin({}, { parameter: 'value' });
        expect(pluginData.load).to.not.be.undefined;
        const result = await pluginData.load({ filePath: 'filePath' });
        expect(result).to.deep.equal({
            '.css': 'stylusResult'
        });
        expect(mocks.loadFile).to.have.been.calledWith('filePath');
        expect(mocks.renderStylus).to.have.been.calledWith('fileContent', { parameter: 'value', filename: 'filePath'});
    });

});
