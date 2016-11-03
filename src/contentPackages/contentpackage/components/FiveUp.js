'use strict';

import React, { Component, PropTypes } from 'react';
import EQ from '../../../util/EQ.js';
import FiveUpCard from './FiveUpCard.js';

class FiveUpComponent extends Component {

  constructor(props) {
    super(props);
    this.parentClassName = 'mt3_fiveup';
    this.storyCards = [];
    this.maxCards = 5;
    this.state = {
      contentWidth: props.initialWidth
    };
  }

  render() {
    const {
      theme: componentTheme,
      model: {
        heading: componentHead,
        stories: componentStories
      },
    } = this.props;

    // classnames below are rather arbitrary. Should find out if there's a standard across components and be consistent
    const fiveUpSizes = {
      '440': 'mt3_fiveup--tablet',
      '740': 'mt3_fiveup--desktop'
    };

    const storyCards = componentStories.map((card, index) => {
      // Don't worry about adding to the array if it won't be shown
      if (index >= this.maxCards) {
        return;
      }

      const showImage = (index === 0) ? true : false;
      const containerRowClassName = (index === 0) ? 'mt3_row mt3_fiveup-row mt3_fiveup-row--top' : 'mt3_row mt3_fiveup-row';

      return (
        <div key={`fiveUp-promo-row-container-${index}`} className={containerRowClassName}>
          <FiveUpCard cardNum={index} key={`fiveUp-promo-${index}`} {...card} theme={'dark'} showImage={showImage} />
        </div>
      )
    });

    return (
      <EQ elementRef="fiveup" sizeClasses={fiveUpSizes} >
        <div ref="fiveUpContainer" className="mt3_fiveup">
          <div className="mt3_left-and-right-package-header" dangerouslySetInnerHTML={{__html: componentHead}}/>
          {storyCards}
        </div>
      </EQ>
    );
  }
}

FiveUpComponent.PropTypes = {
  theme: PropTypes.string,
  model: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    heading: PropTypes.string,
    stories: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
        config: PropTypes.object,
        link: PropTypes.shape({
          url: PropTypes.string.isRequired,
          target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
          trackingCodes: PropTypes.array || PropTypes.string
        }),
        leadMedia: PropTypes.shape({
          url: PropTypes.string,
          aspectRatio: PropTypes.number,
          altText: PropTypes.string,
          srcset: PropTypes.array,
          imageUrl: PropTypes.string
        }),
        cta: PropTypes.shape({
          url: PropTypes.string,
          title: PropTypes.string,
          target: PropTypes.string,
          seoTitle: PropTypes.string
        })
      })
    )
  })
};

export default FiveUpComponent;
