'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import {default as MTPhotoGalleryComponent} from './MTPhotoGallery.jsx';

class PhotoGallery extends Module {

  init() {
    ReactDOM.render(<MTPhotoGalleryComponent
      frameAspectRatio={this.options.frameAspectRatio}
      letterboxBackgroundColor={this.options.letterboxBackgroundColor}
      description={this.options.description}
      infinite={this.options.infinite}
      letterbox={this.options.letterbox}
      showArrows={this.options.showArrows}
      showCounter={this.options.showCounter}
      slides={this.options.slides}
      title={this.options.title}
    />, this.el);
  }
}

Pestle.ModuleManager.register('PhotoGallery', PhotoGallery);

export default PhotoGallery;
