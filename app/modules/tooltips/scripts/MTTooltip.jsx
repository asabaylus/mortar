'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import classNames from 'classnames';

class Tooltip extends Component {
  render() {
    const tooltipClasses = classNames({
      'mt2_tooltip': true,
      'mt2_subh4': true,
      'mt2_bgcolor--neutral--xxl': true
    });

    const tooltipBtnClasses = classNames({
      'mt2_h5': true,
      'mt2_color--neutral--xd': true,
      'mt2_bordercolor--neutral--xl': true,
      'mt2_bgcolor--neutral--xxxl': true,
      'mt2_tooltip-btn': true
    });

    let tooltipPlacement = classNames({
      'mt2_tooltip--top': this.props.top || this.props.placement === 'top',
      'mt2_tooltip--bottom': this.props.bottom || this.props.placement === 'bottom',
      'mt2_tooltip--left': this.props.left || this.props.placement === 'left',
      'mt2_tooltip--right': this.props.right || this.props.placement === 'right'
    });

    if(tooltipPlacement === ''){
      tooltipPlacement = 'mt2_tooltip--top';
    }

    return(
      <div className="mt2_tooltip-container">
        <div className={`${tooltipClasses} ${tooltipPlacement}`}>
          <p dangerouslySetInnerHTML={{__html: this.props.tooltipContent}} />
        </div>
        <button className={tooltipBtnClasses}>?</button>
      </div>
    );
  }
}

Tooltip.propTypes = {
  tooltipContent: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  top: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
  bottom: PropTypes.bool
}

export default Tooltip;
