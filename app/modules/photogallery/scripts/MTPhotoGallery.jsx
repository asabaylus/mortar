'use strict';

import React, { Component, PropTypes }  from 'react';
import Counter from './components/Counter.jsx';

class PhotoGallery extends Component {
  render() {
    return <Counter currentSlide="1" totalSlides="3" />
  }
}

PhotoGallery.defaultProps = {
  animations: true,
  infinite: true
}

PhotoGallery.propTypes = {
  aspectRatio: PropTypes.number,
  backgroundColor: PropTypes.string,
  description: PropTypes.string,
  heading: PropTypes.string,
  slides: PropTypes.array,
  infinite: PropTypes.bool,
  letterboxed: PropTypes.bool,
  showArrows: PropTypes.bool,
  showCounter: PropTypes.bool
}

export default PhotoGallery;
