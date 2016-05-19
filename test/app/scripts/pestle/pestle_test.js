'use strict';

import Pestle from '../../../../app/scripts/pestle/main'

describe('Pestle', () => {
  it('should be a class', () => {
    expect(Pestle).to.be.a('function');
  });

  describe('instance', () => {
    var pestle;

    before(() => {
      pestle = new Pestle();
    });

    describe('structure', () => {
      it('should have init method', () => {
        expect(pestle.init).to.be.a('function');
      });

      it('should have ModuleManager property', () => {
        expect(pestle.ModuleManager).to.be.a('object');
      });
    });

    describe('init()', () => {
      it('calls modules initialization', () => {
        var pestle = new Pestle();
        var init = sinon.spy();
        pestle.ModuleManager.init = init;
        pestle.init();
        expect(init.called).to.be.true;
      });
    });
  });
});
