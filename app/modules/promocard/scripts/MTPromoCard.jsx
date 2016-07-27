'use strict';

import React, { PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import events from './events';
import PromoImage from './PromoImage.jsx';
import PromoText from './PromoText.jsx';

const promoData = {
  // props to pass with the event
};

const promoClicked = () => {
  Pestle.PubSub.publish(events.promoClicked, promoData);
};

const MTPromoCard = ({image, series, title, dek, byline, brandingBadgeLabel, sponsorContentLabel}) => {
  const position = image.position;
  const layoutCard = () => {
    switch(position){
      case 'above':
      case 'left':
        return <div onClick={promoClicked.bind(this)} className="mt2_promocard-container">
          {{image} ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContentLabel={sponsorContentLabel} /> : null}
          <PromoText series={series} title={title} dek={dek} byline={byline} />
        </div>;
        break;
      case 'below':
      case 'right':
        return <div onClick={promoClicked.bind(this)} className="mt2_promocard-container">
          <PromoText series={series} title={title} dek={dek} byline={byline} />
          {{image} ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContentLabel={sponsorContentLabel} /> : null}
        </div>;
        break;
      default:
        return <div onClick={promoClicked.bind(this)} className="mt2_promocard-container">
          <PromoText series={series} title={title} dek={dek} byline={byline} />
          {{image} ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContentLabel={sponsorContentLabel} /> : null}
        </div>;
        break;
    }
  };
  return(
    layoutCard()
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
