'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';

const Article = (props) => {
  if (props.leadMedia){
    return(
      <div className="mt3_row mt3_col-12">
        <PromoImage type={props.type} config={props.config} leadMedia={props.leadMedia[0]} brandingBadgeLabel={props.brandingBadgeLabel} />
        <PromoText {...props} />
      </div>
    );
  }else{
    return(
      <div className="mt3_row">
        <PromoText {...props} />
      </div>
    );
  }
};

Article.PropTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array
  })),
  text: PropTypes.object,
  brandingBadgeLabel: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func
};

export default Article;
