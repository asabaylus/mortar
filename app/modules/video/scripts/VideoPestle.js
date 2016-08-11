'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as VideoComponent} from './video.jsx';

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
