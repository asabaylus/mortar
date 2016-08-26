import React, { PropTypes } from 'react';

const Kicker = (props) => {
  const {
    trackingCodes,
    target: linkTarget,
    url,
    label,
  } = props;

  let attrs;

  if (url) {
    attrs = {
      href: url + trackingCodes,
      target: linkTarget,
      title: label,
    };
  }

  return (
    url ? <div className='mt3_podpromo-kicker mt3_podpromo-elevate'><a {...attrs}>{label}</a></div> : <div className="mt3_podpromo-kicker">{label}</div>
    );
};

Kicker.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  trackingCodes: PropTypes.string,
  target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
};

Kicker.defaultProps = {
  label: '',
  url: '',
  target: '_self',
  trackingCodes: '',
};

export default Kicker;
