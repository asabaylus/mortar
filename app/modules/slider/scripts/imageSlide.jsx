'use strict';

import React, { Component, PropTypes } from 'react';
import Image from '@natgeo/modules-images';

class ImageSlide extends Component {
  render() {
    return (
      <Image
        srcset={this.props.srcset}
        aspectRatio={3/7}
        letterbox={true}
        letterboxBackgroundColor={"green"}
        frameAspectRatio={9/16}/>
    );
  }
}

ImageSlide.propTypes = {
  src: PropTypes.string
}

export default ImageSlide;
