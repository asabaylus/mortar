'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import IconComponent from './Icon';

class Icon extends Module {
  init() {
    ReactDOM.render(<IconComponent
      name={this.options.name}
      align={this.options.alignment}
      size={this.options.size}
      color={this.options.color}
      alt={this.options.alt}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Icon', Icon);

export default Icon;
