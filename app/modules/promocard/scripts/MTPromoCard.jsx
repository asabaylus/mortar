'use strict';

import React, { PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import events from './events';

const promoData = {
  // props to pass with the event
};

const promoClicked = () => {
  Pestle.PubSub.publish(events.promoClicked, promoData);
};

const MTPromoCard = () => {
  return(
    <div className="mt2_promo-card-container">
      <div onClick={promoClicked}>
        <h1>I Render Well</h1>
      </div>
    </div>
  );
};

MTPromoCard.PropTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string
  }),
  text: PropTypes.shape({
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string
  }),
  modal: PropTypes.bool,
  target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    internal: PropTypes.bool
  }),
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  dek: PropTypes.string,
  hideDek: PropTypes.bool,
  series: PropTypes.string,
  hideSeries: PropTypes.bool,
  byline: PropTypes.string,
  hideByline: PropTypes.bool,
  brandingBadgeLabel: PropTypes.string,
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
  video: PropTypes.bool,
  onClick: PropTypes.func
};

export default MTPromoCard;
