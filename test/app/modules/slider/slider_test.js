'use strict';

import Pestle from '../../../../app/scripts/pestle/main';
import Slider from '../../../../app/modules/slider/scripts/MTSliderPestle.js';
import SliderComponent from '../../../../app/modules/slider/scripts/MTSlider.jsx';

describe('Slider Component', () => {
  before(() => {
    const html = `<div
      data-pestle-module="Slider"
      data-pestle-options='{
        "transitionSpeed": 300,
        "transitionType": "slide",
        "initialSlide": 2
      }'></div>`

    insertFixture(html);
    Pestle.init();
  });

  after(() => {
    removeFixture();
  });

  it('should be a class', () => {
    expect(Slider).to.be.a('function');
  });

  it('should be registered as a Pestle component', () => {
    expect(Pestle.ModuleManager.getModule('Slider')).to.exist;
  });

  it('should mount', () => {
    expect(Pestle.ModuleManager.getInstancesByName('Slider')).to.have.length.of.at.least(1);
  });
});
