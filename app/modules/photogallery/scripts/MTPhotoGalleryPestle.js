'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '../../../scripts/pestle/main.js';
import MTPhotoGallery from './MTPhotoGallery.jsx';

class PhotoGallery extends Module {
  init() {
    ReactDOM.render(<MTPhotoGallery slides={this.options.slides} />, this.el);
    console.log('PhotoGallery initialized.');
  }
}

Pestle.ModuleManager.register('PhotoGallery', PhotoGallery);

export default PhotoGallery;
