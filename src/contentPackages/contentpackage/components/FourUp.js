'use strict';

import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';

import EQ from '../../../util/EQ.js';
import MTPromoCard from '../../../modules/promocard/MTPromoCard';


export default class FourUpComponent extends Component {

  constructor(props) {
    super(props);
    this.parentClassName = 'mt3_fourup';
    this.storyCards = [];
    this.maxCards = 4;
    this.state = {
      contentWidth: props.initialWidth
    };
  }

  componentDidMount() {
    this.resizeHandler = _debounce(this.getComponentWidth.bind(this), 250);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillMount() {
    const {
      model: {
        stories: componentStories
      }
    } = this.props;

    // configure cards that will be rendered below
    componentStories.forEach(this.pushCard.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getComponentWidth() {
    this.setState({
      contentWidth: this.refs.fourUpContainer.getBoundingClientRect().width
    });
  }

  pushCard(card, index) {
    // Don't worry about adding to the array if it won't be shown
    if (index >= this.maxCards) {
      return;
    }

    let currentCard = card;
    const parentWidth = this.props.initialWidth;

    // We want to force the aspect ratio of the first two cards in the stack based on business rules. Here we look at the zero based index and make that decision
    switch(index) {
      // First card set to 3:2
      case 0:
        currentCard.config.cardAspectRatio = '3:2';
        break;
      // Second card set to 16:9
      case 1:
        currentCard.config.cardAspectRatio = '16:9';
        break;
      // cards 3 and 4 are rendered differently, and need a different aspect ratio based on the parent container width
      // set type to 'article' if type is not 'article' or 'video' to account for gallery cards not rendering correctly in the 3rd and 4th slots
      case 2:
      case 3:
        if (currentCard.type !== 'video'){
          currentCard.type = 'article';
        }
        if(this.state.contentWidth < 440) {
          currentCard.config.cardAspectRatio = '1:1';
        } else {
          currentCard.config.cardAspectRatio = '16:9';
        }
        if(currentCard.text.dek) {
          currentCard.text.dek = null;
        }
        break;
      default:
        console.log(`sorry, no case specified for value: ${index}.`)
    }

    this.storyCards.push(<MTPromoCard key={index} {...currentCard} theme={'dark'} parentWidth={parentWidth}/>);

  }

  render() {
    const {
      theme: componentTheme,
      model: {
        heading: componentHead
      },
    } = this.props;

    // classnames below are rather arbitrary. Should find out if there's a standard across components and be consistent
    const fourUpSizes = {
      '440': 'mt3_fourup--tablet',
      '740': 'mt3_fourup--desktop'
    };

    // Only create as many rows as there are number of cards - min. 1
    const firstRow = (
      <div className="mt3_row mt3_fourup-row mt3_fourup-row--top">
        {this.storyCards[0]}
      </div>
    );

    const secondRow = this.storyCards[1] ? (
      <div className="mt3_row mt3_fourup-row">
        {this.storyCards[1]}
      </div>
    ) : null;

    // This sets the markup for the last two components when the parent component's width is less than 440
    const mobileBottomRows = [
      <div key={"mobile-row-2"} className="mt3_row mt3_fourup-row mt3_fourup-row--extrasmall">
        {this.storyCards[2]}
      </div>,
      <div key={"mobile-row-3"} className="mt3_row mt3_fourup-row mt3_fourup-row--extrasmall">
        {this.storyCards[3]}
      </div>
    ];

    // This sets the markup for the last two components when the parent component's width is >= 440
    // Only create this row if cards are present to account for bottom alignment with left rail
    const tabDeskBottomRow = this.storyCards[2] ? (
      <div className="mt3_row mt3_fourup-row">
        <div className="mt3_col-6 mt3_fourup-col--extrasmall">
          {this.storyCards[2]}
        </div>
        <div className="mt3_col-6 mt3_fourup-col--extrasmall">
          {this.storyCards[3]}
        </div>
      </div>) : null;

    const bottomRow = (this.state.contentWidth < 440) ? mobileBottomRows : tabDeskBottomRow;

    return (
      <EQ elementRef="fourup" sizeClasses={fourUpSizes}>
        <div ref="fourUpContainer" className="mt3_fourup">
          <div className="mt3_left-and-right-package-header" dangerouslySetInnerHTML={{__html: componentHead}}/>
            { firstRow }
            { secondRow }
            { bottomRow }
        </div>
      </EQ>
    );
  }
}

FourUpComponent.PropTypes = {
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
