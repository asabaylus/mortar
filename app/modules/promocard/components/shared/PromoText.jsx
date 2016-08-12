'use strict';

import React, { PropTypes }  from 'react';

const PromoText = ({dek, byline, kicker, title }) => {
  return(
    <div>
      {kicker ? <div className="mt2_color--neutral--l mt_subh2">{kicker}</div> : null}
      {title ? <div className="mt2_color--neutral--xxd mt2_h4">{title}</div> : null}
      {dek ? <div className="mt2_color--neutral--xxd mt2_subh4">{dek}</div> : null}
      {byline ? <div className="mt2_color--neutral--xxd mt2_h5">{byline}</div> : null}
    </div>
  );
};

PromoText.PropTypes = {
  title: PropTypes.string,
  dek: PropTypes.string,
  kicker: PropTypes.string,
  byline: PropTypes.string
};

export default PromoText;