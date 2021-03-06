'use strict';

import Module from '../../../../../src/scripts/pestle/src/module'

describe('Module', () => {
  describe('instance', () => {
    var Module1, Module2;

    before(() => {
      Module1 = class extends Module {}

      Module2 = class extends Module {
        init() {}
      }
    });

    it('should have an isLoaded property equals to false', () => {
      var module1 = new Module1();
      expect(module1.isLoaded).to.be.false;
    });

    it('should throw an error if init method is not defined', () => {
      var module1 = new Module1();
      expect(() => module1.init()).to.throw(Error);
    });

    it('should not throw an error if init method is defined', () => {
      var module2 = new Module2();
      expect(() => module2.init()).to.not.throw(Error);
    });

    it('should have el property', () => {
      var id = '0b0e729c-a478-c979-4aa9-7383b2f9531b';
      var module = new Module2(id, document.body);
      expect(module.el).to.equal(document.body);
    });

    it('should have options property', () => {
      var id = '0b0e729c-a478-c979-4aa9-7383b2f9531b';
      var module = new Module2(id, document.body, { prop: 'value' });
      expect(module.options).to.deep.equal({ prop: 'value' });
    });

    it('should clean el and options properties when dispose', () => {
      var id = '0b0e729c-a478-c979-4aa9-7383b2f9531b';
      var module = new Module2(id, document.body, { prop: 'value' });
      module.dispose();
      expect(module.el).to.be.null;
      expect(module.options).to.be.null;
    });
  });
});
