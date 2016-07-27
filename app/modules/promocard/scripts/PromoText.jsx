'use strict';

import React, { PropTypes }  from 'react';

const PromoText = ({series, title, dek, byline}) => {
  return(
    <div>
      {series}
      {title}
      {dek}
      {byline}
    </div>
  );
};

PromoText.PropTypes = {
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  dek: PropTypes.string,
  hideDek: PropTypes.bool,
  series: PropTypes.string,
  hideSeries: PropTypes.bool,
  byline: PropTypes.string,
  hideByline: PropTypes.bool
}

export default PromoText;
