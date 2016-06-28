'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '../../../scripts/pestle/main.js';
import SliderComponent from './MTSlider.jsx';

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
