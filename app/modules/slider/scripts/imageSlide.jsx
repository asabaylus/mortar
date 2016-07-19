'use strict';

import React, { Component, PropTypes } from 'react';
import Image from '@natgeo/modules-images';

class ImageSlide extends Component {
  render() {
    return (
      <Image
        aspectRatio={this.props.aspectRatio}
        frameAspectRatio={this.props.frameAspectRatio}
        lazyLoad={true}
        letterbox={this.props.letterbox}
        letterboxBackgroundColor={this.props.letterboxBackgroundColor}
        srcset={this.props.srcset}/>
    );
  }
}

ImageSlide.propTypes = {
  aspectRatio: PropTypes.string,
  frameAspectRatio: PropTypes.string,
  letterbox: PropTypes.bool,
  letterboxBackgroundColor: PropTypes.string,
  src: PropTypes.string
}

export default ImageSlide;
