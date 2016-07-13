import React, { Component, PropTypes }  from 'react';
import urlEncode from 'urlencode';

class MTEmailButton extends Component {
  render() {
    // this looks wacky, but the strings need to be URL encoded
    // while the API remains unencoded
    const emailFormat = 'mailto:?subject='
      + urlEncode(this.props.title)
      + '&body='
      + urlEncode('<p>'
        + this.props.title
        + '<br /><a href="'
        + this.props.url
        + '">'
        + this.props.url
        + '</a></p><p><a href="http://www.nationalgeographic.com">http://www.nationalgeographic.com</a></p>'
      )
    ;

    return (
      <a href={emailFormat} className="mt2_sharing-btn">
        <svg className="mt2_icon--large mt2_color--neutral--xxd">
          <use xlinkHref="#email"></use>
        </svg>
      </a>
    )
  }
}

export default MTEmailButton
