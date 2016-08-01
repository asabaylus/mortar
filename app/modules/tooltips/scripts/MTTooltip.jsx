'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import classNames from 'classnames';

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      sticky: false
    }

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseEnter(e) {
    if(this.state.sticky === false){
      this.setState({visible: true});
    }
  }

  onMouseLeave(e) {
    if(this.state.sticky === false){
      this.setState({visible: false});
    }
  }

  onClick(e) {
    if(this.state.sticky){
      this.setState({visible: false, sticky: false});
    } else {
      this.setState({visible: true, sticky: true});
    }
  }

  renderTooltip(){
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
      <div className={`mt2_tooltip mt2_subh4 mt2_bgcolor--neutral--xxl ${tooltipPlacement}`}>
        <p dangerouslySetInnerHTML={{__html: this.props.tooltipContent}} />
      </div>
    );
  }

  render() {
    return(
      <div className="mt2_tooltip-container"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {this.state.visible ? this.renderTooltip() : ''}
        <button onClick={this.onClick} className="mt2_h5 mt2_color--neutral--xd mt2_bordercolor--neutral--xl mt2_bgcolor--neutral--xxxl mt2_tooltip-btn">?</button>
      </div>
    );
  }
}

Tooltip.propTypes = {
  tooltipContent: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom'])
}

export default Tooltip;
