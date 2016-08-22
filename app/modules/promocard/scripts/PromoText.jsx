'use strict';

import React, { PropTypes }  from 'react';

const PromoText = ({series, hideSeries, title, hideTitle, dek, hideDek, byline, hideByline}) => {
  return(
    <div>
      {hideSeries ? null : <div className="mt3_color--neutral--l mt_subh2">{series}</div>}
      {hideTitle ? null : <div className="mt3_h4">{title}</div>}
      {hideDek ? null : <div className="mt3_subh4">{dek}</div>}
      {hideByline ? null : <div className="mt3_h5">{byline}</div>}
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
