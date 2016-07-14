'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as MTPhotoGalleryComponent} from './MTPhotoGallery.jsx';

class PhotoGallery extends Module {

  init() {
    ReactDOM.render(<MTPhotoGalleryComponent
      aspectRatio={this.options.aspectRatio}
      backgroundColor={this.options.backgroundColor}
      description={this.options.description}
      infinite={this.options.infinite}
      letterboxed={this.options.letterboxed}
      showArrows={this.options.showArrows}
      showCounter={this.options.showCounter}
      slides={this.options.slides}
      title={this.options.title}
    />, this.el);
  }
}

Pestle.ModuleManager.register('PhotoGallery', PhotoGallery);

export default PhotoGallery;
