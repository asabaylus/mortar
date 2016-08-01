'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import TooltipModalComponent from './MTTooltipmodal.jsx';

class TooltipModal extends Module {
  init() {
    ReactDOM.render(
      <TooltipModalComponent
        tooltipContent={this.options.tooltipContent}
        />, this.el);
  }
}

Pestle.ModuleManager.register('TooltipModal', TooltipModal);

export default TooltipModal;
