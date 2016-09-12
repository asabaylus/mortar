'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText  from '../shared/PromoText.jsx';
import Article  from './Article.jsx';

const VideoCard = (props) => {
  return(
    <Article {...props} />
  );
};

VideoCard.PropTypes = {
  theme: PropTypes.string,
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
