'use strict';

import React, { PropTypes }  from 'react';

const PromoText = ({abstract, byline, kicker, title }) => {
  return(
    <div>
      {kicker ? null : <div className="mt2_color--neutral--l mt_subh2">{kicker}</div>}
      {title ? null : <div className="mt2_h4">{title}</div>}
      {abstract ? null : <div className="mt2_subh4">{abstract}</div>}
      {byline ? null : <div className="mt2_h5">{byline}</div>}
    </div>
  );
};

PromoText.PropTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  kicker: PropTypes.string,
  byline: PropTypes.string
}

export default PromoText;
