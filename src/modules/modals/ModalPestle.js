'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import ModalComponent from './Modal';

class Modal extends Module {
  init() {
    ReactDOM.render(<ModalComponent
      targetId={this.options.targetId}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Modal', Modal);

export default Modal;
