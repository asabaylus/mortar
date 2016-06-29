'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '../../../scripts/pestle/main.js';
import {default as CTAButtonComponent} from './CTAButton.jsx';

class CTAButton extends Module {
  init() {
    ReactDOM.render(<CTAButtonComponent
      authorMode={this.options.authorMode}
      icon={this.options.icon}
      label={this.options.label}
      link={this.options.link}
      inactive={this.options.inactive}
      inverse={this.options.inverse}
      onClick={this.options.onClick}
      onFocus={this.options.onFocus}
      onBlur={this.options.onBlur}
      style={this.options.style}
      type={this.options.type}
    />, this.el);
  }
}

Pestle.ModuleManager.register('CTAButton', CTAButton);

export default CTAButton;
