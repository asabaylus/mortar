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
      heading={this.options.heading}
      image={this.options.image}
      infinite={this.options.infinite}
      letterboxed={this.options.letterboxed}
      showArrows={this.options.showArrows}
      showCounter={this.options.showCounter}
    />, this.el);
  }
}

Pestle.ModuleManager.register('PhotoGallery', PhotoGallery);

export default PhotoGallery;
