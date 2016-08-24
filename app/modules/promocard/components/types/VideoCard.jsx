'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText  from '../shared/PromoText.jsx';

const VideoCard = (props) => {
  return(
    <div className="mt3_row mt3_col-12 mt3_promocard-container">
      <PromoImage type={props.type} config={props.config} leadMedia={props.leadMedia[0]} brandingBadgeLabel={props.brandingBadgeLabel} />
      <PromoText {...props} />
    </div>
  );
};

VideoCard.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    guid: PropTypes.guid,
    videoUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    renditionUrl: PropTypes.string
  })),
  text: PropTypes.shape({
    title: PropTypes.string,
    dek: PropTypes.string,
    duration: PropTypes.string
  }),
  onClick: PropTypes.func
};

export default VideoCard;
