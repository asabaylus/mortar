'use strict';

import React, { Component, PropTypes }  from 'react';
import Heading from './components/Heading.jsx';
import Counter from './components/Counter.jsx';
import Slider from '../../slider/scripts/MTSlider.jsx';
import Captions from './components/Captions.jsx';

class PhotoGallery extends Component {
  render() {
    return(
      <div>
        <Heading title={this.props.title} description={this.props.description} />
        <Counter showCounter={this.props.showCounter} />
        <Slider aspectRatio={this.props.aspectRatio}
                backgroundColor={this.props.backgroundColor}
                infinite={this.props.infinite}
                letterboxed={this.props.letterboxed}
                showArrows={this.props.showArrows}
                slides={this.props.slides}
        />
        <Captions />
      </div>
    );
  }
}

PhotoGallery.defaultProps = {
  showCounter: true
}

PhotoGallery.propTypes = {
  aspectRatio: PropTypes.string,
  backgroundColor: PropTypes.string,
  description: PropTypes.string,
  infinite: PropTypes.bool,
  letterboxed: PropTypes.bool,
  showArrows: PropTypes.bool,
  showCounter: PropTypes.bool,
  slides: PropTypes.array,
  title: PropTypes.string
}

export default PhotoGallery;
