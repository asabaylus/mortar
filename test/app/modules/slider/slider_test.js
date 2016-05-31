'use strict';

import Pestle from '../../../../app/scripts/pestle/main';
import Slider from '../../../../app/modules/slider/scripts/MTSliderPestle.js';

describe('Slider Component', () => {
  it('should be a class', () => {
    expect(Slider).to.be.a('function');
  });

  it('should be registered as a Pestle component', () => {
    expect(Pestle.ModuleManager.getModule('Slider')).to.exist;
  });

  it.skip('should mount', () => { // skip until we create fixtures
    expect(Pestle.ModuleManager.getInstancesByName('Slider')).to.be.at.least(1);
  });
});
