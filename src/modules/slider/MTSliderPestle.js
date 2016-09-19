'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Pestle, Module } from '@natgeo/pestle';
import SliderComponent from './MTSlider';

class Slider extends Module {
  init() {
    ReactDOM.render(<SliderComponent
      infinite={this.options.infinite}
      slides={this.options.slides}
      animations={this.options.animations}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Slider', Slider);

export default Slider;
