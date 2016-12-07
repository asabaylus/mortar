'use strict';

import React from 'react';
import cx from 'classnames';

import EQ from '../../../util/EQ.js';
import FiveUpCard from './FiveUpCard.js';


export default class FiveUpComponent extends React.Component {

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
        stories: componentStories,
        showKickers,
        showNumbers
      },
    } = this.props;

    // classnames below are rather arbitrary. Should find out if there's a standard across components and be consistent
    const fiveUpSizes = {
      '440': 'mt3_fiveup--tablet',
      '740': 'mt3_fiveup--desktop'
    };

    const containerClassName = cx(
      'mt3_fiveup',
      {
        'mt3_fiveup--no-kicker': showKickers === false,
        'mt3_fiveup--no-numbers': showNumbers === false
      }
    );

    const storyCards = componentStories.map((card, index) => {
      // Don't worry about adding to the array if it won't be shown
      if (index >= this.maxCards) {
        return;
      }

      const showImage = (index === 0);
      const containerRowClassName = cx(
        'mt3_row mt3_fiveup-row',
        {
          'mt3_fiveup-row--top': index === 0
        }
      );

      return (
        <div
          key={`fiveUp-promo-row-container-${index}`}
          className={containerRowClassName}>

          <FiveUpCard
            cardNum={index}
            key={`fiveUp-promo-${index}`}
            theme={'dark'}
            showImage={showImage}
            showKicker={showKickers}
            {...card} />
        </div>
      )
    });

    return (
      <EQ elementRef="fiveup" sizeClasses={fiveUpSizes} >
        <div ref={(ref) => { this.fiveUpContainer = ref}} className={containerClassName}>
          <div
            className="mt3_left-and-right-package-header"
            dangerouslySetInnerHTML={{__html: componentHead}} />
          {storyCards}
        </div>
      </EQ>
    );
  }
}

FiveUpComponent.propTypes = {
  theme: React.PropTypes.string,
  model: React.PropTypes.shape({
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    heading: React.PropTypes.string,
    showKickers: React.PropTypes.bool,
    showNumbers: React.PropTypes.bool,
    stories: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        type: React.PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
        config: React.PropTypes.object,
        link: React.PropTypes.shape({
          url: React.PropTypes.string.isRequired,
          target: React.PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
          trackingCodes: React.PropTypes.string
        }),
        leadMedia: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            url: React.PropTypes.string,
            aspectRatio: React.PropTypes.number,
            altText: React.PropTypes.string,
            srcset: React.PropTypes.array,
            imageUrl: React.PropTypes.string
          }),
        ),
        cta: React.PropTypes.shape({
          url: React.PropTypes.string,
          title: React.PropTypes.string,
          target: React.PropTypes.string,
          seoTitle: React.PropTypes.string
        })
      })
    )
  })
};
