const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('render-stylus', () => {
    const stylusMock = {
        render: sinon.stub()
    };
    const renderStylus = proxyquire.noCallThru()('../render-stylus', {
        stylus: stylusMock
    });

    afterEach(() => stylusMock.render.reset());

    it('should call stylus.render and resolve with the returned value', async () => {
        stylusMock.render.callsArgWith(2, undefined, 'stylusResult');

        const result = await renderStylus('fileContent', { arg: 'value' });
        expect(result).to.equal('stylusResult');
        expect(stylusMock.render).to.have.been.calledWith('fileContent', { arg: 'value' });
    })

    it('should reject the promise if err is not undefined', () => {
        stylusMock.render.callsArgWith(2, 'stylusError');
        const promise = renderStylus('fileContent', 'filename', { arg: 'value' });
        expect(promise).to.be.rejectedWith('stylusError');
    });
})

