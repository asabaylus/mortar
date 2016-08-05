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

const MTPromoCard = ({brandingBadgeLabel, byline, dek, hideByline, hideDek, hideSeries, hideTitle, image, series, sponsorContent, sponsorContentLabel, title, video}) => {
  if (image){
    const position = image.position;
    const layoutCard = () => {
      switch(position){
        case 'above':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
            <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
          </div>;
          break;
        case 'left':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <div className="mt2_col-8 mt2_col-md-8 mt2_col-lg-8 mt2_col-sm-6 mt2_col-gut-sm">
              {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
            </div>
            <div className="mt2_col-4 mt2_col-md-4 mt2_col-lg-4 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title}  />
            </div>
          </div>;
          break;
        case 'below':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
            {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
          </div>;
          break;
        case 'right':
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <div className="mt2_col-4 mt2_col-md-4 mt2_col-lg-4 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
            </div>
            <div className="mt2_col-8 mt2_col-md-8 mt2_col-lg-8 mt2_col-sm-6 mt2_col-gut-sm">
              {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
            </div>
          </div>;
          break;
        default:
          return <div onClick={promoClicked.bind(this)} className="mt2_row mt2_col-12 mt2_promocard-container">
            <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
            {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
          </div>;
          break;
      }
    };
    return(
      layoutCard()
    );
  }else{
    return(
      <div onClick={promoClicked.bind(this)} className="mt2_row mt2_promocard-container">
        <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
      </div>
    );
  }
};

MTPromoCard.PropTypes = {
  frameAspectRatio: PropTypes.number,
  leadImage: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    internal: PropTypes.bool
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.object,
    srcset: Proptypes.array
  }),
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  text: PropTypes.shape({
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string,
    title: PropTypes.string,
    hideTitle: PropTypes.bool,
    dek: PropTypes.string,
    hideDek: PropTypes.bool,
    series: PropTypes.string,
    hideSeries: PropTypes.bool,
    byline: PropTypes.string,
    hideByline: PropTypes.bool,
  }),
  link: PropTypes.shape({
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    title: PropTypes.string,
    trackingCodes: PropTypes.shape({
      utmSource: PropTypes.string,
      utmMedium: PropTypes.string,
      utmTerm: PropTypes.array, // can be multiple keywords
      utmContent: PropTypes.string,
      utmCampaign: PropTypes.string
    }),
    url: PropTypes.string.isRequired
  }),
  modal: PropTypes.bool,
  brandingBadgeLabel: PropTypes.string,
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
  video: PropTypes.bool,
  onClick: PropTypes.func
};

export default MTPromoCard;
