'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as TooltipComponent} from './MTTooltip.jsx';

class Tooltip extends Module {
  init() {
    ReactDOM.render(
      <TooltipComponent
      placement={this.options.placement}
      tooltipContent={this.options.tooltipContent}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Tooltip', Tooltip);

export default Tooltip;
