'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import urlEncode from 'urlencode';

class MTSocialButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  openShareWindow(site, url, title) {
    const encodedUrl = urlEncode(url);
    const siteAttr = {
      facebook: {
        h: 279,
        url: "http://www.facebook.com/share.php?u=" + encodedUrl,
        w: 575,
        windowTitle: 'Facebook'
      },
      'google-plus': {
        h: 647,
        url: "https://plus.google.com/share?url=" + encodedUrl,
        w: 500,
        windowTitle: 'Google Plus'
      },
      linkedin: {
        h: 425,
        url: "https://www.linkedin.com/shareArticle?mini=true&url=nationalgeographic.com" + encodedUrl,
        w: 450,
        windowTitle: 'LinkedIn'
      },
      pinterest: {
        h: 575,
        url: "http://pinterest.com/pin/create/button/?" + encodedUrl,
        w: 750,
        windowTitle: 'Pinterest'
      },
      twitter: {
        h: 420,
        url: "https://twitter.com/intent/tweet?url="
              + encodedUrl
              + "&text="
              + urlEncode(title)
              + "&via=NatGeo",
        w: 550,
        windowTitle: 'Twitter'
      }
    }
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const windowLeft = (viewportWidth - siteAttr[site].w) / 2;
    const windowTop = (viewportHeight - siteAttr[site].h) / 2;

    window.open(
      siteAttr[site].url,
      siteAttr[site].windowTitle,
      "status = 1, width = " + siteAttr[site].w
        + ", height = " + siteAttr[site].h
        + ", left = " + windowLeft
        + ", top = " + windowTop
        + ", resizable = 0"
      );
  }

  handleClick() {
    this.openShareWindow(this.props.site, this.props.url, this.props.title);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="mt2_sharing-btn">
        <svg className={"mt2_icon mt2_color--social--" + this.props.site}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={"#social-" + this.props.site}></use>
        </svg>
      </button>
    )
  }
}

class MTSharing extends Component {
  render() {
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

    let socialButtons = this.props.sharingOptions.map(option => {
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

const sharingOptions = [
  'facebook',
  'twitter',
  'google-plus',
  'linkedin',
  'pinterest',
  'email'
]

MTSharing.defaultProps = {
  sharingOptions: sharingOptions
}

MTSharing.propTypes = {
  url: PropTypes.string.isRequired,
  sharingOptions: PropTypes.arrayOf(React.PropTypes.string),
  title: PropTypes.string.isRequired
}

export default MTSharing
