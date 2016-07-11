'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import urlEncode from 'urlencode';
import MTSocialButton from './MTSocialButton.jsx'

class MTSharing extends Component {
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

    const socialButtons = this.props.buttons.map(option => {
      if(option !== 'email') {
        return (
          <MTSocialButton
            key={option}
            url={this.props.url}
            title={this.props.title}
            site={option}
          />
        )
      }

      return (
        <a key={option} href={emailFormat} className="mt2_sharing-btn">
          <svg className="mt2_icon mt2_color--neutral--xxd">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#email"></use>
          </svg>
        </a>
      )
    })

    return (
      <div className="mt2_sharing-container">
        {socialButtons}
      </div>
    );
  }
}

const buttonDefaults = [
  'facebook',
  'twitter',
  'google-plus',
  'linkedin',
  'pinterest',
  'email'
]

MTSharing.defaultProps = {
  buttons: buttonDefaults
}

MTSharing.propTypes = {
  url: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(React.PropTypes.string),
  title: PropTypes.string.isRequired
}

export default MTSharing
