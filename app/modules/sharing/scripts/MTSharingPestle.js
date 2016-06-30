'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle} from '@natgeo/mortar-pestle';
import Module from '@natgeo/mortar-pestle/module';
import SharingComponent from './MTSharing.jsx';

class Sharing extends Module {
  init() {
    ReactDOM.render(<SharingComponent
      docURL={document.location.href}
      docTitle={document.title}      
    />, this.el);
  }
}

Pestle.ModuleManager.register('Sharing', Sharing);

export default Sharing
