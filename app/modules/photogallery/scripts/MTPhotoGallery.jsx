'use strict';

import React, { Component, PropTypes }  from 'react';
import Heading from './components/Heading.jsx';
import Counter from './components/Counter.jsx';
import Slider from '../../slider/scripts/MTSlider.jsx';
import Captions from './components/Captions.jsx';
import ElementQuery from 'react-element-query'

class PhotoGallery extends Component {
  render() {
    return(
      <div>
        <div className="mt2_row">
          <Heading title={this.props.title} description={this.props.description} />
        </div>
        <div className="mt2_row">
          {this.props.showCounter ? <Counter showCounter={this.props.showCounter} slides={this.props.slides} /> : null}
        </div>
        <Slider frameAspectRatio={this.props.frameAspectRatio}
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
    srcSet: PropTypes.array
  })),
  title: PropTypes.string
}

export default PhotoGallery;
