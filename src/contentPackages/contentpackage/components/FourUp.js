'use strict';

import React, { Component, PropTypes } from 'react';
import ElementQuery from 'react-element-query';
import { default as MTPromoCard } from '../../../modules/promocard/MTPromoCard';
import _debounce from 'lodash/debounce';

class FourUpComponent extends Component {

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
      // cards 3 and 4 are rendered differently, and need a different aspect ratio based on the parent container width
      case 2:
      case 3:
        if(this.state.contentWidth < 440) {
          currentCard.config.cardAspectRatio = '1:1';
        } else {
          currentCard.config.cardAspectRatio = '16:9';
        }
        if(currentCard.text.dek) {
          currentCard.text.dek = null;
        }
      break;
      // Second card set to 16:9
      case 1:
        currentCard.config.cardAspectRatio = '16:9';
      break;
      // First card set to 3:2
      case 0:
        currentCard.config.cardAspectRatio = '3:2';
      break;
    }

    this.storyCards.push(<MTPromoCard key={index} {...currentCard} theme={'dark'} parentWidth={parentWidth}/>);
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
    const elementQueries = [
      {
        name: 'mt3_fourup--tablet',
        width: 440
      },
      {
        name: 'mt3_fourup--desktop',
        width: 740
      },
    ];

    // configure cards that will be rendered below
    componentStories.forEach(this.pushCard.bind(this));

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
    const tabDeskBottomRow = (
      <div className="mt3_row mt3_fourup-row">
        <div className="mt3_col-6 mt3_fourup-col--extrasmall">
          {this.storyCards[2]}
        </div>
        <div className="mt3_col-6 mt3_fourup-col--extrasmall">
          {this.storyCards[3]}
        </div>
      </div>);

    const bottomRow = (this.state.contentWidth < 440) ? mobileBottomRows : tabDeskBottomRow;

    return (
      <ElementQuery sizes={elementQueries}>
        <div ref="fourUpContainer" className="mt3_fourup">
          <div className="mt3_left-and-right-package-header" dangerouslySetInnerHTML={{__html: componentHead}}/>
          <div className="mt3_row mt3_fourup-row mt3_fourup-row--top">
            {this.storyCards[0]}
          </div>
          <div className="mt3_row mt3_fourup-row">
            {this.storyCards[1]}
          </div>
          { bottomRow }
        </div>
      </ElementQuery>
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

export default FourUpComponent;
