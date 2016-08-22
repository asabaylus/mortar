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
    const href = generateHref(props.link.url, props.link.trackingCodes);
    window.open(href, props.link.target);
    props.onClick();
    Pestle.PubSub.publish(events.promoClicked, promoData);
  };

  // this will need to be refactored based on the AEM-authoring experience to just concat input values
  const generateHref = (url, trackingCodes) => {
    let href = url;

    if(trackingCodes && typeof trackingCodes === 'object') {
      let terms = "";
      const termsArr = props.link.trackingCodes;
      const concatTerms = (element, index, array) => {
        const lastEl = index < array.length - 1;
        terms += lastEl ? element + "+" : element;
      };
      termsArr.forEach(concatTerms);
      href = href + "?" + terms;

      return href;
    }else{
      return url + trackingCodes;
    }
  };

  let attrs = {
    className: "mt2_promocard-container",
    onClick: promoClicked
  };

<<<<<<< HEAD
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
=======
  switch(props.type){
    case 'article':
      return <div {...attrs}>
        <Article {...props} />
      </div>;
      break;
    // additional cases for the remaining types may be included when they are created
    default:
      return <div {...attrs}>
        <Article {...props} />
      </div>;
      break;
>>>>>>> c2681745945028e6f1e63d3ed763cd5fcf418a57
  }
};

MTPromoCard.PropTypes = {
  id: PropTypes.string,
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
    srcset: PropTypes.array
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
