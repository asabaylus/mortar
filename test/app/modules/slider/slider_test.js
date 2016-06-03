'use strict';

import Pestle from '../../../../app/scripts/pestle/main';
import Slider from '../../../../app/modules/slider/scripts/MTSliderPestle.js';
import SliderComponent from '../../../../app/modules/slider/scripts/MTSlider.jsx';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Slider', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div
        data-pestle-module="Slider"
        data-pestle-options='{
          "transitionSpeed": 300,
          "transitionType": "fade",
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

  describe('React Component', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<SliderComponent />);
    });

    it('should have default prop transitionSpeed', () => {
      expect(wrapper.prop('transitionSpeed')).to.exist;
    });

    it('should have default prop transitionType', () => {
      expect(wrapper.prop('transitionType')).to.exist;
    });

    it('should have default prop initialSlide', () => {
      expect(wrapper.prop('initialSlide')).to.exist;
    });
  });
});
