'use strict';

import React, { Component, PropTypes } from 'react';

class ImageSlide extends Component {
  render() {
    return (<img src={this.props.src} />);
  }
}

ImageSlide.propTypes = {
  src: PropTypes.string
}

export default ImageSlide;
