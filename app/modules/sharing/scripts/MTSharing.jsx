'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';

function openShareWindow(url, strWindowName, windowWidth, windowHeight) {
  var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      windowLeft = (viewportWidth - windowWidth) / 2,
      windowTop = (viewportHeight - windowHeight) / 2;

  window.open(
    url,
    strWindowName,
    "status = 1, width = " + windowWidth
      + ", height = " + windowHeight
      + ", left = " + windowLeft
      + ", top = " + windowTop
      + ", resizable = 0"
    );
}

class MTTwitter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const title = this.props.title.replace(/[^a-zA-Z ]/g, "").split(' ').join('+');
    const url = "https://twitter.com/intent/tweet?url=" + this.props.url + "&text=" + title + "&via=NatGeo";
    openShareWindow(url, "Twitter", 550, 420);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="mt_btn">
        <svg className="mt_icon mt_color--social--twitter mt_socialsharing">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#social-twitter"></use>
        </svg>
      </button>
    )
  }
}

class MTFacebook extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const url = "https://www.facebook.com/share.php?u=" + this.props.url;
    openShareWindow(url, "Facebook", 575, 279);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="mt_btn">
        <svg className="mt_icon mt_color--social--facebook mt_socialsharing">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#social-facebook-f"></use>
        </svg>
      </button>
    )
  }
}

class MTSharing extends Component {
  render() {
    return (
      <div>
        <MTTwitter
          url={this.props.url}
          title={this.props.title}
        />
        <MTFacebook
          url={this.props.url}
        />
      </div>
    );
  }
}

MTSharing.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string
}

export default MTSharing
