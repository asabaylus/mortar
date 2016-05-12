'use strict';

import Pestle from '../../../../app/scripts/pestle/main'

describe('Pestle', () => {
  it('should be a class', () => {
    expect(Pestle).to.be.a('function');
  });

  describe('Pestle instance', () => {
    var pestle;

    before(() => {
      pestle = new Pestle();
    });

    describe('structure', () => {
      it('should have init method', () => {
        expect(pestle.init).to.be.a('function');
      });

      it('should have Module property', () => {
        expect(pestle.Module).to.be.a('function');
      });
    });
  });
});
