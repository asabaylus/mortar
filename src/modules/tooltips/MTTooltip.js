'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
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

  componentDidUpdate(){
    if(this.props.placement === 'left' && this.state.visible){
      let width =  window.getComputedStyle(this.refs.tooltipContainer).width;
      const arrowWidth = 15;
      width = -parseFloat(width) - arrowWidth;
      this.refs.tooltipContainer.style.left = `${width}px`;
    }
  }

  renderTooltip(){
    let tooltipPlacement = classNames({
      'mt3_tooltip--top': this.props.placement === 'top',
      'mt3_tooltip--bottom': this.props.placement === 'bottom',
      'mt3_tooltip--left': this.props.placement === 'left',
      'mt3_tooltip--right': this.props.placement === 'right'
    });

    if(tooltipPlacement === ''){
      tooltipPlacement = 'mt3_tooltip--top';
    }

    return(
      <div ref="tooltipContainer" className={`mt3_tooltip mt3_subh4 mt3_bgcolor--gray5 ${tooltipPlacement}`}>
        <p dangerouslySetInnerHTML={{__html: this.props.tooltipContent}} />
      </div>
    );
  }

  render() {
    return(
      <div className="mt3_tooltip-container"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {this.state.visible ? this.renderTooltip() : ''}
        <button onClick={this.onClick} className="mt3_h5 mt3_color--gray80 mt3_bordercolor--gray10 mt3_bgcolor--white mt3_tooltip-btn">?</button>
      </div>
    );
  }
}

Tooltip.propTypes = {
  tooltipContent: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom'])
}

export default Tooltip;
