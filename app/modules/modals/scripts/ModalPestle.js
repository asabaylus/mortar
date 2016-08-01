'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as ModalComponent} from './Modal.jsx';

class Modal extends Module {
  init() {
    ReactDOM.render(<ModalComponent
      targetId={this.options.targetId}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Modal', Modal);

export default Modal;
