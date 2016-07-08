'use strict';

import Pestle from '@natgeo/mortar-pestle';
import Slider from '../../../../app/modules/slider/scripts/MTSliderPestle.js';
import SliderComponent from '../../../../app/modules/slider/scripts/MTSlider.jsx';
import SliderEvents from '../../../../app/modules/slider/scripts/events';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Slider', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `
        <div data-pestle-module='Slider'>
          <script type="text/json" data-pestle-options>
            {
              "animations": false
            }
          </script>
        </div>`

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
      const slides = [
        {type: 'image', src: 'http://www.fillmurray.com/g/600/400'},
        {type: 'image', src: 'http://www.placecage.com/600/400'}
      ];

      wrapper = mount(<SliderComponent slides={slides} animations={false} />);
    });

    it('should have default prop infinite', () => {
      expect(wrapper.prop('infinite')).to.exist;
    });

    it('should call publish when slide change', (done) => {
      let count = 0;

      Pestle.PubSub.subscribe(SliderEvents.slideChange, (topic, data) => {
        expect(data).to.be.an('object');

        count++;
        if(count === 2) {
          done();
        }
      });

      wrapper.find('button.mt_slider-button--next').simulate('click');
      wrapper.find('button.mt_slider-button--prev').simulate('click');
    });

    it('should return current slide index when publish a slide change', (done) => {
      Pestle.PubSub.subscribe(SliderEvents.slideChange, (topic, data) => {
        expect(data).to.include.keys('currentSlideIndex');
        expect(data.currentSlideIndex).to.equal(1);
        done();
      });

      wrapper.find('button.mt_slider-button--next').simulate('click');
    });
  });
});
