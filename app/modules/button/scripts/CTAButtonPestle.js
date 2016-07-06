'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as CTAButtonComponent} from './CTAButton.jsx';

class CTAButton extends Module {

  // Event Callbacks
  click() {
    // your code here
  }

  focus() {
    // your code here
  }

  blur() {
    // your code here
  }

  init() {
    ReactDOM.render(<CTAButtonComponent
      authorMode={this.options.authorMode}
      icon={this.options.icon}
      label={this.options.label}
      link={this.options.link}
      inactive={this.options.inactive}
      inverse={this.options.inverse}
      onClick={this.click}
      onFocus={this.focus}
      onBlur={this.blur}
      style={this.options.style}
      type={this.options.type}
    />, this.el);
  }
}

Pestle.ModuleManager.register('CTAButton', CTAButton);

export default CTAButton;
