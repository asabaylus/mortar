'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';

const Article = (props) => {
  if (props.leadMedia){
    const position = props.leadMedia.position;
    const layoutCard = () => {
      switch(position){
        case 'above':
          return <div className="mt2_row mt2_col-12">
            <PromoImage {...props} />
            <PromoText {...props.text} />
          </div>;
          break;
        case 'left':
          return <div className="mt2_row mt2_col-12">
            <div className="mt2_col-8 mt2_col-md-8 mt2_col-lg-8 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoImage {...props} />
            </div>
            <div className="mt2_col-4 mt2_col-md-4 mt2_col-lg-4 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoText {...props.text} />
            </div>
          </div>;
          break;
        case 'below':
          return <div className="mt2_row mt2_col-12">
            <PromoText {...props.text} />
            <PromoImage {...props} />
          </div>;
          break;
        case 'right':
          return <div className="mt2_row mt2_col-12">
            <div className="mt2_col-4 mt2_col-md-4 mt2_col-lg-4 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoText {...props.text} />
            </div>
            <div className="mt2_col-8 mt2_col-md-8 mt2_col-lg-8 mt2_col-sm-6 mt2_col-gut-sm">
              <PromoImage {...props} />
            </div>
          </div>;
          break;
        default:
          return <div className="mt2_row mt2_col-12">
            <PromoText {...props.text} />
            <PromoImage {...props} />
          </div>;
          break;
      }
    };
    return(
      layoutCard()
    );
  }else{
    return(
      <div className="mt2_row">
        <PromoText {...props.text} />
      </div>
    );
  }
};

Article.PropTypes = {
  frameAspectRatio: PropTypes.number,
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
  text: PropTypes.shape({
    abstract: PropTypes.string,
    byline: PropTypes.string,
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string,
    kicker: PropTypes.string,
    title: PropTypes.string
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
  modal: PropTypes.bool,
  brandingBadgeLabel: PropTypes.string,
  sponsorContentLabel: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default Article;
