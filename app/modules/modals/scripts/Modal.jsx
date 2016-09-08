'use strict';

import React, { Component, PropTypes }  from 'react';
import classNames from 'classnames';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    const targetIdNode = document.getElementById(this.props.targetId);
    const modalContent = targetIdNode.innerHTML;

    targetIdNode.parentNode.removeChild(targetIdNode);

    this.setState({
      modalContent: modalContent
    });
  }

  update(e) {
    this.setState({
      open: !this.state.open
    })
  }

  render(){
    const modalClasses = classNames({
      'mt3_modal-container': true,
      'mt3_color--white': true,
      'mt3_modal-container--active': this.state.open
    });

    return (
      <div>
        <button className="mt3_btn mt3_btn--secondary" onClick={this.update}>
          Launch Modal
        </button>

        <div className={modalClasses}>
          <button className="mt3_modal-button" onClick={this.update}>
            <span className="mt3_visuallyhidden">Close Modal</span>
            <svg className="mt3_icon--large">
              <use xlinkHref="#close"></use>
            </svg>
          </button>
          <div dangerouslySetInnerHTML={{__html: this.state.modalContent}} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  targetId: PropTypes.string
}

export default Modal
