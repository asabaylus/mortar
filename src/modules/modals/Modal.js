'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
import events from '../promocard/events';
import classNames from 'classnames';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      shouldRender: false,
      renderNGSModal: false
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  static defaultProps = {
    ...Component.defaultProps,
    onClose: function(){}
  };

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    //esc closes modal
    if (event.keyCode == 27) {
      this.props.onClose(event);
    }
  }

  componentWillReceiveProps(props){
    if(this.props.renderNGSModal != props.renderNGSModal) {
      this.shouldRender = props.renderNGSModal;
      this.setState({renderNGSModal: props.renderNGSModal});
    }
  }

  render(){
    const modalClasses = classNames({
      'mt3_modal-container': true,
      'mt3_color--white': true,
      'mt3_modal-container--active': this.state.renderNGSModal
    });

    //if the modal hasn't been called yet, it should not render
    if(!this.shouldRender) {
      return null;
    }

    return (
      <div className={modalClasses}>
        <button className="mt3_modal-button" onClick={this.props.onClose}>
          <span className="mt3_visuallyhidden">Close Modal</span>
          <svg className="mt3_icon--large">
            <use xlinkHref="#close"></use>
          </svg>
        </button>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
