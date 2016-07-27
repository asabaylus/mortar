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

const MTPromoCard = ({image, series, hideSeries, title, hideTitle, dek, hideDek, byline, hideByline, brandingBadgeLabel, sponsorContent, sponsorContentLabel}) => {
  if (image){
    const position = image.position;
    const layoutCard = () => {
      switch(position){
        case 'above':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            {image ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} /> : null}
            <PromoText series={series} hideSeries={hideSeries} title={title} hideTitle={hideTitle} dek={dek} hideDek={hideDek} byline={byline} hideByline={hideByline}  />
          </div>;
          break;
        case 'left':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <div className="mt2_col-8 mt2_col-md-8 mt2_col-lg-8 mt2_col-sm-6 mt2_col-gut-sm">
              {image ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} /> : null}
            </div>
            <div className="mt2_col-4 mt2_col-md-4 mt2_col-lg-4 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoText series={series} hideSeries={hideSeries} title={title} hideTitle={hideTitle} dek={dek} hideDek={hideDek} byline={byline} hideByline={hideByline}  />
            </div>
          </div>;
          break;
        case 'below':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <PromoText series={series} hideSeries={hideSeries} title={title} hideTitle={hideTitle} dek={dek} hideDek={hideDek} byline={byline} hideByline={hideByline}  />
            {image ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} /> : null}
          </div>;
          break;
        case 'right':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <div className="mt2_col-4 mt2_col-md-4 mt2_col-lg-4 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoText series={series} hideSeries={hideSeries} title={title} hideTitle={hideTitle} dek={dek} hideDek={hideDek} byline={byline} hideByline={hideByline}  />
            </div>
            <div className="mt2_col-8 mt2_col-md-8 mt2_col-lg-8 mt2_col-sm-6 mt2_col-gut-sm">
              {image ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} /> : null}
            </div>
          </div>;
          break;
        default:
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <PromoText series={series} hideSeries={hideSeries} title={title} hideTitle={hideTitle} dek={dek} hideDek={hideDek} byline={byline} hideByline={hideByline} />
            {image ? <PromoImage image={image} brandingBadgeLabel={brandingBadgeLabel} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} /> : null}
          </div>;
          break;
      }
    };
    return(
      layoutCard()
    );
  }else{
    return(
      <div onClick={promoClicked.bind(this)} className="mt2_promocard-container">
        <PromoText series={series} hideSeries={hideSeries} title={title} hideTitle={hideTitle} dek={dek} hideDek={hideDek} byline={byline} hideByline={hideByline}  />
      </div>
    );
  }
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
