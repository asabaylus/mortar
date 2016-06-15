'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '../../../scripts/pestle/main.js';
import SliderComponent from './MTSlider.jsx';

class Slider extends Module {
  init() {
    ReactDOM.render(<SliderComponent
      transitionSpeed={this.options.transitionSpeed}
      transitionType={this.options.transitionType}
      initialSlide={this.options.initialSlide}>
      {this.options.slides.map(function(item, i) {
        return <div key={i}><img src={item} /></div>;
      })}
    </SliderComponent>, this.el);
    console.log('Slider initialized.');
  }
}

Pestle.ModuleManager.register('Slider', Slider);

export default Slider;
