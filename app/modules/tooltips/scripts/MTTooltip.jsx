'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import classNames from 'classnames';
import {SimpleModal} from './modal.jsx';


class Tooltip extends Component {
  static propTypes = {
    tooltipContent: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
    modal: PropTypes.bool
  };

  static defaultProps = {
    placement: 'top',
    modal: false
  };

  render(){
    if(this.props.modal){
      return <TooltipModal {...this.props} />
    }
    else {
      return <TooltipBubble {...this.props} />
    }
  }
}


class TooltipBubble extends Component{
  static propTypes = {
    tooltipContent: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom'])
  };

  static defaultProps = {
    placement: 'top'
  };

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
    if(this.props.placement === "left" && this.state.visible){
      let width =  window.getComputedStyle(this.refs.tooltipContainer).width;
      const arrowWidth = 15;
      width = -parseFloat(width) - arrowWidth;
      this.refs.tooltipContainer.style.left = `${width}px`;
    }
  }

  renderTooltip(){
    let tooltipPlacement = classNames({
      'mt2_tooltip--top': this.props.placement === 'top',
      'mt2_tooltip--bottom': this.props.placement === 'bottom',
      'mt2_tooltip--left': this.props.placement === 'left',
      'mt2_tooltip--right': this.props.placement === 'right'
    });

    return(
      <div ref="tooltipContainer" className={`mt2_tooltip mt2_subh4 mt2_bgcolor--neutral--xxl ${tooltipPlacement}`}>
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

class TooltipModal extends Component {
  static propTypes = {
    tooltipContent: PropTypes.string
  };

  constructor(props){
    super(props);
    this.state = {
      active: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  open(){
    this.setState({active: true});
  }
  close(){
    this.setState({active: false});
  }
  renderModal(){
    const tooltipContent = this.props.tooltipContent || '';

    return (
      <SimpleModal onClose={this.close}>
        <div className="mt2_tooltip-modalcontent">{tooltipContent}</div>
        {this.props.children}
      </SimpleModal>
    )
  }
  render(){
    const buttonClasses = `
      mt2_tooltip-modalbtn
      mt2_h5 mt2_color--neutral--xd
      mt2_bordercolor--neutral--xl
      mt2_bgcolor--neutral--xxxl`;

    return (
      <div>
        <button className={buttonClasses} onClick={this.open}>?</button>
        {this.state.active ? this.renderModal() : ''}
      </div>
    );
  }
}


export default Tooltip;
