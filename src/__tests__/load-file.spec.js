const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('load-file', () => {
    const fsMock = {
        readFile: sinon.stub()
    };
    const loadFile = proxyquire.noCallThru()('../load-file', {
        fs: fsMock
    });

    afterEach(() => fsMock.readFile.reset());

    it('should load the file and resolve with its content', async () => {
        fsMock.readFile.callsArgWith(2, undefined, 'fileContent');
        const result = await loadFile('filePath');
        expect(result).to.equal('fileContent');
        expect(fsMock.readFile).to.have.been.calledWith('filePath', { encoding: 'utf-8' }, sinon.match.func);
    });

    it('should reject the promise if error is not undefined', () => {
        fsMock.readFile.callsArgWith(2, 'readFileError');
        const promise = loadFile('filePath');
        expect(promise).to.be.rejectedWith('readFileError');
    });

});

