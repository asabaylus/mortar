'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import MTSocialButton from './MTSocialButton.jsx'
import MTEmailButton from './MTEmailButton.jsx'
import classNames from 'classnames';

class MTSharing extends Component {
  render() {
    const containerClasses = classNames({
      'mt3_sharing-container': true,
      'mt3_bordercolor--gray10': true,
      'mt3_sharing-container--vertical': this.props.display === 'vertical'
    });
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
        <MTEmailButton
          key={option}
          url={this.props.url}
          title={this.props.title}
        />
      )
    })

    return (
      <div className={containerClasses}>
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
  buttons: buttonDefaults,
  display: 'horizontal'
}

MTSharing.propTypes = {
  buttons: PropTypes.arrayOf(React.PropTypes.string),
  display: PropTypes.oneOf(['horizontal', 'vertical']),
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default MTSharing
