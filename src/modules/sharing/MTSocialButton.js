'use strict';

import React, { Component, PropTypes }  from 'react';
import urlEncode from 'urlencode';

class MTSocialButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  centerPopup(clientW = 0, clientH = 0, popupW = 300, popupH = 500) {
    return {
      'top': (clientW - popupW) / 2,
      'left': (clientH - popupH) / 2
    }
  }

  openShareWindow(site, url, title) {
    const encodedUrl = urlEncode(url);
    const siteAttr = {
      facebook: {
        h: 279,
        url: 'http://www.facebook.com/share.php?u=' + encodedUrl,
        w: 575,
        windowTitle: 'Facebook'
      },
      'google-plus': {
        h: 647,
        url: 'https://plus.google.com/share?url=' + encodedUrl,
        w: 500,
        windowTitle: 'Google Plus'
      },
      linkedin: {
        h: 425,
        url: 'https://www.linkedin.com/shareArticle?mini=true&url=nationalgeographic.com' + encodedUrl,
        w: 450,
        windowTitle: 'LinkedIn'
      },
      pinterest: {
        h: 575,
        url: 'http://pinterest.com/pin/create/button/?' + encodedUrl,
        w: 750,
        windowTitle: 'Pinterest'
      },
      twitter: {
        h: 420,
        url: 'https://twitter.com/intent/tweet?url='
              + encodedUrl
              + '&text='
              + urlEncode(title)
              + '&via=NatGeo',
        w: 550,
        windowTitle: 'Twitter'
      }
    }

    const popup = this.centerPopup(
      window.innerWidth,
      window.innerHeight,
      siteAttr[site].w,
      siteAttr[site].h
    )

    return window.open(
      siteAttr[site].url,
      siteAttr[site].windowTitle,
      'status = 1, width = ' + siteAttr[site].w
        + ', height = ' + siteAttr[site].h
        + ', left = ' + popup.left
        + ', top = ' + popup.top
        + ', resizable = 0'
      );
  }

  handleClick() {
    this.openShareWindow(this.props.site, this.props.url, this.props.title);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="mt3_sharing-btn">
        <svg className={'mt3_icon mt3_color--social--' + this.props.site}>
          <use xlinkHref={'#social-' + this.props.site}></use>
        </svg>
      </button>
    )
  }
}

export default MTSocialButton
