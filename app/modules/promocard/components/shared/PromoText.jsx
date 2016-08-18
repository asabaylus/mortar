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
    className: "mt2_color--neutral--l mt_subh2 mt2_promocard-kicker",
    href: generateHref(props.text.kicker.url, props.text.kicker.trackingCodes),
    target: props.text.kicker.target
  };

  return(
    <div>
      {props.text.kicker ? <div><a {...attrs}>{props.text.kicker.label}</a></div> : null}
      {(props.type && props.type === 'video') ? <div className="mt2_color--neutral--l mt_subh2">{props.text.duration}</div> : null}
      {props.text.title ? <div className="mt2_color--neutral--xxd mt2_h4">{props.text.title}</div> : null}
      {props.text.dek ? <div className="mt2_color--neutral--xxd mt2_subh4">{props.text.dek}</div> : null}
      {props.text.byline ? <div className="mt2_color--neutral--xxd mt2_h5">{props.text.byline}</div> : null}
    </div>
  );
};

PromoText.PropTypes = {
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
    publishDate: PropTypes.string
  }),
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoText;
