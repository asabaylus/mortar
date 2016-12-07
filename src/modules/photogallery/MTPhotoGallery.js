'use strict';

import React from 'react';

import Captions from './components/Captions';
import Counter from './components/Counter';
import Heading from './components/Heading';
import Slider from '../slider/MTSlider';


export default class PhotoGallery extends React.Component {
  render() {
    const {
      description,
      frameAspectRatio,
      infinite,
      letterbox,
      letterboxBackgroundColor,
      showArrows,
      showCounter,
      slides,
      title,
    } = this.props,
      noCounterClass = !showCounter ? 'mt3_photogallery-heading--spacer' : null;

    return (
      <div>
        <div className={`mt3_row ${noCounterClass}`}>
          <Heading title={title} description={description} />
        </div>

        <div className="mt3_row">
          {showCounter &&
            <Counter showCounter={showCounter} slides={slides} />}
        </div>

        <Slider
          frameAspectRatio={frameAspectRatio}
          infinite={infinite}
          lazyLoad={true}
          letterbox={letterbox}
          letterboxBackgroundColor={letterboxBackgroundColor}
          showArrows={showArrows}
          slides={slides}
        />

        <Captions slides={slides} />
      </div>
    );
  }
}

PhotoGallery.propTypes = {
  frameAspectRatio: React.PropTypes.string,
  letterboxBackgroundColor: React.PropTypes.string,
  description: React.PropTypes.string,
  infinite: React.PropTypes.bool,
  letterbox: React.PropTypes.bool,
  showArrows: React.PropTypes.bool,
  showCounter: React.PropTypes.bool,
  slides: React.PropTypes.arrayOf(React.PropTypes.shape({
    aspectRatio: React.PropTypes.string,
    assetSource: React.PropTypes.string,
    caption: React.PropTypes.string,
    credit: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    src: React.PropTypes.string,
    srcset: React.PropTypes.array
  })).isRequired,
  title: React.PropTypes.string
}

PhotoGallery.defaultProps = {
  showCounter: true
}
