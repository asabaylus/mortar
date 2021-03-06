'use strict';

import React, { PropTypes }  from 'react';

import { Pestle } from '@natgeo/pestle';

import ShowCard from '../showcard/showCard';
import Story from './components/types/Story';


export default class MTPromoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props;
    return type === 'show' ? <ShowCard {...this.props}/> : <Story {...this.props}/>;
  }
};

MTPromoCard.PropTypes = {
  itemId: PropTypes.string,
  itemPos: PropTypes.string,
  additionalClasses: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array,
    guid: PropTypes.guid,
    videoUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    renditionUrl: PropTypes.string
  })),
  text: PropTypes.shape({
    title: PropTypes.string,
    dek: PropTypes.string,
    kicker: PropTypes.shape({
      label: PropTypes.string,
      style: PropTypes.string,
      url: PropTypes.string,
      target: PropTypes.string,
      seoTitle: PropTypes.string,
      trackingCodes: PropTypes.array || PropTypes.string
    }),
    photoCount: PropTypes.number,
    byline: PropTypes.string,
    duration: PropTypes.string,
    publishDate: PropTypes.string,
    sponsorContentLabel: PropTypes.string,
  }),
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func
};
