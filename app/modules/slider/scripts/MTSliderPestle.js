'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle} from '@natgeo/mortar-pestle';
import Module from '@natgeo/mortar-pestle/module';
import SliderComponent from './MTSlider.jsx';

class Slider extends Module {
  init() {
    ReactDOM.render(<SliderComponent
      transitionSpeed={this.options.transitionSpeed}
      transitionType={this.options.transitionType}
      initialSlide={this.options.initialSlide}
      slides={this.options.slides}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Slider', Slider);

export default Slider;
