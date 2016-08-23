'use strict';

import React, { PropTypes }  from 'react';

const PromoText = (props) => {

  const generateHref = (url, trackingCodes) => {
    let href = url;

    if(trackingCodes && typeof trackingCodes === Array.isArray) {
      let terms = "";
      const termsArr = props.text.kicker.trackingCodes;
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
    className: "mt3_color--neutral--l mt3_subh2 mt3_promocard-kicker",
    href: (props.text.kicker && props.text.kicker) ? generateHref(props.text.kicker.url, props.text.kicker.trackingCodes) : null,
    target: props.text.kicker ? props.text.kicker.target : null
  };

  return(
    <div>
      <div className="mt3_row">
        {props.text.kicker && !props.config.sponsored ? <div><a {...attrs}>{props.text.kicker.label}</a></div> : props.config.sponsored ? <div><a {...attrs}>{props.text.sponsorContentLabel}</a></div> : null}
        {(props.type === 'video' && props.text.duration) ? <div className="mt3_color--neutral--l mt3_subh2 mt3_card-subhead--right">{props.text.duration}</div> : null}
      </div>
      {props.text.title ? <div className="mt3_color--neutral--xxd mt3_h4">{props.text.title}</div> : null}
      {props.text.dek ? <div className="mt3_color--neutral--xxd mt3_subh4">{props.text.dek}</div> : null}
      {props.text.byline ? <div className="mt3_color--neutral--xxd mt3_h5">{props.text.byline}</div> : null}
    </div>
  );
};

PromoText.PropTypes = {
  config: PropTypes.object,
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
    sponsorContentLabel: PropTypes.string
  }),
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoText;
