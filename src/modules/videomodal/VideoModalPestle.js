'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import VideoModal from './VideoModal';

class VideoModalPestle extends Module {

  init() {
    ReactDOM.render(<VideoModal id={this.options.id}
      dataModel={this.options.dataModel}
          />, this.el);
  }

}

Pestle.ModuleManager.register('VideoModal', VideoModalPestle);
export default VideoModalPestle;
