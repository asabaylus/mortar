'use strict';

import React, { PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import events from './events';
import Article from './../components/types/Article.jsx';

const MTPromoCard = (props) => {

  const promoData = {
    // data to pass with the event
  };

  const promoClicked = () => {
    console.log("---------- Promo Clicked ---------");
    props.onClick();
    Pestle.PubSub.publish(events.promoClicked, promoData);
  };

  // this will need to be refactored based on the AEM-authoring experience to just concat input values
  const generateHref = (url, trackingCodes) => {
    let href = url;

    if(trackingCodes) {
      let terms = "";
      const termsArr = props.link.trackingCodes;
      const concatTerms = (element, index, array) => {
        const lastEl = index < array.length - 1;
        terms += lastEl ? element + "+" : element;
      };
      termsArr.forEach(concatTerms);
      href = href + "?" + terms;
    }

    return href;
  };

  let attrs = {
    className: "mt2_promocard-container",
    onClick: promoClicked,
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
  id: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array
  }),
  text: PropTypes.shape({
    title: PropTypes.string,
    dek: PropTypes.string,
    kicker: PropTypes.string,
    byline: PropTypes.string,
    duration: PropTypes.string,
    publishDate: PropTypes.string
  }),
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string,
  sponsorContentLabel: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func
};

export default MTPromoCard;
