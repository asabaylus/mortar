'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import VideoComponent from './video';

class Video extends Module {
  init() {
    ReactDOM.render(<VideoComponent
      className={this.options.className}
      lazyLoad={this.options.lazyLoad}
      model={this.options.model}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Video', Video);

export default Video;
