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
          return <div onClick={promoClicked.bind(this)} className="mt3_row mt3_col-12 mt3_promocard-container">
            {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
            <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
          </div>;
          break;
        case 'left':
          return <div onClick={promoClicked.bind(this)} className="mt3_row mt3_col-12 mt3_promocard-container">
            <div className="mt3_col-8 mt3_col-md-8 mt3_col-lg-8 mt3_col-sm-6 mt3_col-gut-sm">
              {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
            </div>
            <div className="mt3_col-4 mt3_col-md-4 mt3_col-lg-4 mt3_col-sm-6 mt3_col-gut-sm">
              <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title}  />
            </div>
          </div>;
          break;
        case 'below':
          return <div onClick={promoClicked.bind(this)} className="mt3_row mt3_col-12 mt3_promocard-container">
            <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
            {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
          </div>;
          break;
        case 'right':
          return <div onClick={promoClicked.bind(this)} className="mt3_row mt3_col-12 mt3_promocard-container">
            <div className="mt3_col-4 mt3_col-md-4 mt3_col-lg-4 mt3_col-sm-6 mt3_col-gut-sm">
              <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
            </div>
            <div className="mt3_col-8 mt3_col-md-8 mt3_col-lg-8 mt3_col-sm-6 mt3_col-gut-sm">
              {image ? <PromoImage brandingBadgeLabel={brandingBadgeLabel} image={image} sponsorContent={sponsorContent} sponsorContentLabel={sponsorContentLabel} video={video} /> : null}
            </div>
          </div>;
          break;
        default:
          return <div onClick={promoClicked.bind(this)} className="mt3_row mt3_col-12 mt3_promocard-container">
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
      <div onClick={promoClicked.bind(this)} className="mt3_row mt3_promocard-container">
        <PromoText byline={byline} dek={dek} hideByline={hideByline} hideDek={hideDek} hideSeries={hideSeries} hideTitle={hideTitle} series={series} title={title} />
      </div>
    );
  }
};

MTPromoCard.PropTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.object
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
