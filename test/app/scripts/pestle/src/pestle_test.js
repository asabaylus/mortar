'use strict';

import Pestle from '../../../../../app/scripts/pestle/src/main'

describe('Pestle', () => {
  it('should be a object', () => {
    expect(Pestle).to.be.a('object');
  });

  describe('instance', () => {

    describe('structure', () => {
      it('should have init method', () => {
        expect(Pestle.init).to.be.a('function');
      });

      it('should have ModuleManager property', () => {
        expect(Pestle.ModuleManager).to.be.a('object');
      });
    });

    describe('init()', () => {
      var init, initReference;
      before(() => {
        initReference = Pestle.ModuleManager.init;

        init = sinon.spy();
        Pestle.ModuleManager.init = init;
      });

      it('calls modules initialization', () => {
        Pestle.init();
        expect(init.called).to.be.true;
      });

      after(() => {
        Pestle.ModuleManager.init = initReference;
      });
    });
  });
});
