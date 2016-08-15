'use strict';

import React, { PropTypes }  from 'react';

const PromoText = (props) => {
  return(
    <div>
      {props.text.kicker ? <div className="mt2_color--neutral--l mt_subh2">{props.text.kicker}</div> : null}
      {(props.type && props.type === 'video') ? <div className="mt2_color--neutral--l mt_subh2">{props.text.duration}</div> : null}
      {props.text.title ? <div className="mt2_color--neutral--xxd mt2_h4">{props.text.title}</div> : null}
      {props.text.dek ? <div className="mt2_color--neutral--xxd mt2_subh4">{props.text.dek}</div> : null}
      {props.text.byline ? <div className="mt2_color--neutral--xxd mt2_h5">{props.text.byline}</div> : null}
    </div>
  );
};

PromoText.PropTypes = {
  title: PropTypes.string,
  dek: PropTypes.string,
  duration: PropTypes.string,
  kicker: PropTypes.string,
  byline: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoText;
