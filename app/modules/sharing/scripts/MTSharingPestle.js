'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle} from '@natgeo/mortar-pestle';
import Module from '@natgeo/mortar-pestle/module';
import SharingComponent from './MTSharing.jsx';

class Sharing extends Module {
  init() {
    ReactDOM.render(<SharingComponent
      display={this.options && this.options.display ? this.options.display : 'horizontal'}
      title={this.options && this.options.title ? this.options.title : document.title}
      url={this.options && this.options.url ? this.options.url : document.location.href}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Sharing', Sharing);

export default Sharing
