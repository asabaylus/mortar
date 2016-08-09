'use strict';

import React, { PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import events from './events';
import Article from './../components/types/Article.jsx';

const MTPromoCard = (props) => {

  const promoData = {
    // props to pass with the event
  };

  const promoClicked = () => {
    Pestle.PubSub.publish(events.promoClicked, promoData);
  };

  const generateHref = (url, trackingCodes) => {
    let href = url;

    if(trackingCodes) {
      let terms = "";
      const termsArr = props.link.trackingCodes.utmTerm;
      const concatTerms = (element, index, array) => {
        const lastEl = index < array.length - 1;
        terms += lastEl ? element + "+" : element;
      };
      termsArr.forEach(concatTerms);
      href = href
        + "?"
        + "utm_source=" + trackingCodes.utmSource
        + "&utm_medium=" + trackingCodes.utmMedium
        + "&utm_term=" + terms
        + "&utm_content=" + trackingCodes.utmContent
        + "&utm_campaign=" + trackingCodes.utmCampaign;
    }

    return href;
  };

  let attrs = {
    className: "mt2_promocard-container",
    onClick: promoClicked(),
    href: generateHref(props.link.url, props.link.trackingCodes),
    target: props.link.target
  };

  switch(props.type){
    case 'article':
      return <a {...attrs}>
        <Article {...props} />
      </a>;
      break;
    // additional cases for the remaining types may be included when they are created
    default:
      return <a {...attrs}>
        <Article {...props} />
      </a>;
      break;
  }
};

MTPromoCard.PropTypes = {
  frameAspectRatio: PropTypes.number,
  id: PropTypes.string,
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    internal: PropTypes.bool,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.object,
    srcset: PropTypes.array
  }),
  link: PropTypes.shape({
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.shape({
      utmSource: PropTypes.string,
      utmMedium: PropTypes.string,
      utmTerm: PropTypes.array, // can be multiple keywords
      utmContent: PropTypes.string,
      utmCampaign: PropTypes.string
    }),
    url: PropTypes.string.isRequired
  }),
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  text: PropTypes.shape({
    abstract: PropTypes.string,
    byline: PropTypes.string,
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string,
    kicker: PropTypes.string,
    title: PropTypes.string
  }),
  modal: PropTypes.bool,
  brandingBadgeLabel: PropTypes.string,
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
  onClick: PropTypes.func
};

export default MTPromoCard;
