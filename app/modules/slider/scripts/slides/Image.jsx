'use strict';

import React, { Component, PropTypes }  from 'react';
import Slick from 'react-slick';

class SlideImage extends Component {
  render() {
    const {src, alt} = this.props;
    return (<img src={src} alt={alt} />);
  }
}

SlideImage.defaultProps = {
  alt: ""
}

SlideImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default SlideImage
