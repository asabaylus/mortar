'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';

const Article = (props) => {
  if (props.leadMedia){
    return(
      <div className="mt2_row mt2_col-12">
        <PromoImage type={props.type} config={props.config} leadMedia={props.leadMedia[0]} brandingBadgeLabel={props.brandingBadgeLabel} />
        <PromoText {...props} />
      </div>
    );
  }else{
    return(
      <div className="mt2_row">
        <PromoText {...props} />
      </div>
    );
  }
};

Article.PropTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array
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
    kicker: PropTypes.string,
    byline: PropTypes.string,
    duration: PropTypes.string,
    publishDate: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string,
  sponsorContentLabel: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func
};

export default Article;
