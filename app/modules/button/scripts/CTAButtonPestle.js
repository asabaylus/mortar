'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '../../../scripts/pestle/main.js';
import {default as CTAButtonComponent} from './CTAButton.jsx';

class CTAButton extends Module {
  init() {
    ReactDOM.render(<CTAButtonComponent

    />, this.el);
  }
}

Pestle.ModuleManager.register('CTAButton', CTAButton);

export default CTAButton;
