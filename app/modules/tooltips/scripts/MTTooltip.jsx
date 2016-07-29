'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import classNames from 'classnames';

class Tooltip extends Component {
  render() {
    let tooltipPlacement = classNames({
      'mt2_tooltip--top': this.props.placement === 'top',
      'mt2_tooltip--bottom': this.props.placement === 'bottom',
      'mt2_tooltip--left': this.props.placement === 'left',
      'mt2_tooltip--right': this.props.placement === 'right'
    });

    if(tooltipPlacement === ''){
      tooltipPlacement = 'mt2_tooltip--top';
    }

    return(
      <div className="mt2_tooltip-container">
        <div className={`${"mt2_tooltip mt2_subh4 mt2_bgcolor--neutral--xxl"} ${tooltipPlacement}`}>
          <p dangerouslySetInnerHTML={{__html: this.props.tooltipContent}} />
        </div>
        <button className="mt2_h5 mt2_color--neutral--xd mt2_bordercolor--neutral--xl mt2_bgcolor--neutral--xxxl mt2_tooltip-btn">?</button>
      </div>
    );
  }
}

Tooltip.propTypes = {
  tooltipContent: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom'])
}

export default Tooltip;
