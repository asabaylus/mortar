'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle} from '@natgeo/mortar-pestle';
import Module from '@natgeo/mortar-pestle/module';
import PhotoGalleryComponent from './MTPhotoGallery.jsx';

class PhotoGallery extends Module {
  init() {
    ReactDOM.render(<PhotoGalleryComponent
    />, this.el);
  }
}

Pestle.ModuleManager.register('PhotoGallery', PhotoGallery);

export default PhotoGallery;
