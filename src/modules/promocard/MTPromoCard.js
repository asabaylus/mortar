'use strict';

import React, { PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
import Story from './components/types/Story';

const MTPromoCard = (props) => {
  return <Story {...props}/>;
};

MTPromoCard.PropTypes = {
  id: PropTypes.string,
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

export default MTPromoCard;
