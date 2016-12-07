'use strict';

import React from 'react';
import {Pestle} from '@natgeo/pestle';

import events from '../../slider/events';


export default class Captions extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0
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
    const slide = this.props.slides[this.state.currentSlide],
      hasTitleHtml = slide.title || slide.caption,
      hasCreditHtml = slide.credit || slide.assetSource;

    return (
      <figcaption>
        {hasTitleHtml &&
          <p className="mt3_color--gray80 mt3_row-gut-half">
            <span className="mt3_h5">{slide.title}</span>
            <span className="mt3_subh4">{slide.caption}</span>
          </p>}

        {hasCreditHtml &&
          <span className="mt3_subh3 mt3_color--gray40">
            Photograph by {slide.credit}<br />
            Source: {slide.assetSource}
          </span>}
      </figcaption>
    );
  }
}

Captions.propTypes = {
  slides: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      aspectRatio: React.PropTypes.string,
      assetSource: React.PropTypes.string,
      caption: React.PropTypes.string,
      credit: React.PropTypes.string,
      title: React.PropTypes.string,
      type: React.PropTypes.string.isRequired,
      src: React.PropTypes.string,
      srcSet: React.PropTypes.array
    })
  ).isRequired
}
