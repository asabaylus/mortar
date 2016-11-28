'use strict';

import React, { Component, PropTypes }  from 'react';
import Heading from './components/Heading';
import Counter from './components/Counter';
import Slider from '../slider/MTSlider';
import Captions from './components/Captions';


class PhotoGallery extends Component {
  render() {
    let noCounter;

    if (!this.props.showCounter) {
      noCounter = ' mt3_photogallery-heading--spacer';
    }

    return (
      <div>
        <div className={'mt3_row' + noCounter}>
          <Heading title={this.props.title} description={this.props.description} />
        </div>

        <div className="mt3_row">
          {this.props.showCounter ? <Counter showCounter={this.props.showCounter} slides={this.props.slides} /> : null}
        </div>

        <Slider
          frameAspectRatio={this.props.frameAspectRatio}
          infinite={this.props.infinite}
          lazyLoad={true}
          letterbox={this.props.letterbox}
          letterboxBackgroundColor={this.props.letterboxBackgroundColor}
          showArrows={this.props.showArrows}
          slides={this.props.slides}
        />

        <Captions slides={this.props.slides} />
      </div>
    );
  }
}

PhotoGallery.defaultProps = {
  showCounter: true
}

PhotoGallery.propTypes = {
  frameAspectRatio: PropTypes.string,
  letterboxBackgroundColor: PropTypes.string,
  description: PropTypes.string,
  infinite: PropTypes.bool,
  letterbox: PropTypes.bool,
  showArrows: PropTypes.bool,
  showCounter: PropTypes.bool,
  slides: PropTypes.arrayOf(PropTypes.shape({
    aspectRatio: PropTypes.string,
    assetSource: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    src: PropTypes.string,
    srcset: PropTypes.array
  })).isRequired,
  title: PropTypes.string
}

export default PhotoGallery;
