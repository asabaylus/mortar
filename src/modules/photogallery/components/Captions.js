'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
import events from '../../slider/events';

let i = 0;

class Captions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide : 0
    };
  }

  componentDidMount() {
    Pestle.PubSub.subscribe(events.slideChange, this.updateCaption.bind(this));
  }

  componentWillUnmount() {
    Pestle.PubSub.unsubscribe(events.slideChange);
  }

  updateCaption(msg, data) {
    this.setState({
      currentSlide: data.currentSlideIndex
    });
  }

  render() {
    const slide = this.props.slides[this.state.currentSlide];
    let captions = [];

    if (slide.title || slide.caption) {
      captions.push(
        <p key={i++} className="mt3_color--gray80 mt3_row-gut-half">
          <span className="mt3_h5">{slide.title}</span>
          <span className="mt3_subh4">{slide.caption}</span>
        </p>
      );
    }

    if (slide.credit || slide.assetSource) {
      captions.push(
        <span key={i++} className="mt3_subh3 mt3_color--gray40">
          Photograph by {slide.credit}<br />
          Source: {slide.assetSource}
        </span>
      );
    }

    return (
      <figcaption>
        {captions}
      </figcaption>
    );
  }
}

Captions.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    aspectRatio: PropTypes.string,
    assetSource: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    src: PropTypes.string,
    srcSet: PropTypes.array
  })).isRequired
}

export default Captions;
