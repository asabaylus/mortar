import React, { Component, PropTypes }  from 'react';
import urlEncode from 'urlencode';

class MTEmailButton extends Component {
  render() {
    // this looks wacky, but the strings need to be URL encoded
    // while the API remains unencoded
    const emailFormat = 'mailto:?subject='
      + urlEncode(this.props.title)
      + '&body='
      + urlEncode('Check this out!'
        + ' \n \n '
        + this.props.title
        + ' — '
        + this.props.url
        + ' \n \n '
        + 'http://www.nationalgeographic.com'
      )
    ;

    return (
      <a href={emailFormat} className="mt3_sharing-btn">
        <svg className="mt3_icon mt3_color--black">
          <use xlinkHref="#email"></use>
        </svg>
      </a>
    )
  }
}

export default MTEmailButton
