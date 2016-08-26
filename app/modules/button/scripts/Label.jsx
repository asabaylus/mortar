'use strict';

import React, { Component, PropTypes }  from 'react';
import classNames from 'classnames';
import Icon from '../../icon/scripts/Icon.jsx';

class Label extends Component {
  render() {
    const icon = this.props.icon;
    if (icon) {
      switch (icon.align) {
        case 'right':
          return <div className='mt3_iconandlabel--horizontal'>
            <span>{this.props.label}</span>
            <Icon name={icon.name} align='right' size={icon.size}
                  alt={ icon.alt }/>
          </div>;
        case 'top':
          return <div className='mt3_iconandlabel--vertical'>
            <Icon name={icon.name} align='top' size={icon.size}
                  alt={ icon.alt }/>
            <span>{this.props.label}</span>
          </div>;
        case 'bottom':
          return <div className='mt3_iconandlabel--vertical'>
            <span>{this.props.label}</span>
            <Icon name={icon.name} align='bottom' size={icon.size}
                  alt={ icon.alt }/>
          </div>;
        case 'left':
        default:
          return <div className='mt3_iconandlabel--horizontal'>
            <Icon name={icon.name} align='left' size={icon.size}
                  alt={ icon.alt }/>
            <span>{this.props.label}</span>
          </div>;
      }
    } else {
      return <div className='mt3_iconandlabel--horizontal'>
        <span>{this.props.label}</span>
      </div>
    }
  }
}
export default Label;
