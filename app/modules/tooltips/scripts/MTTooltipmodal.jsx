'use strict';

import React, { Component, PropTypes } from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import classNames from 'classnames';
import {SimpleModal} from './modal.jsx';

class TooltipModal extends Component {
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
    this.setState({ active: false});
  }
  renderModal(){
    const tooltipContent = this.props.tooltipContent ? this.props.tooltipContent : '';

    return (
      <SimpleModal onClose={this.close}>
        <div className="mt2_tooltip-modal-content">{tooltipContent}</div>
        {this.props.children}
      </SimpleModal>
    )
  }
  render(){
    const buttonClasses = `
      mt2_tooltip-modal-btn
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

TooltipModal.propTypes = {
  tooltipContent: PropTypes.string
};

export default TooltipModal;
