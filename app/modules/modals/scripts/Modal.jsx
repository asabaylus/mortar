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
      'mt2_modal-container': true,
      'mt2_color--neutral--xxxl': true,
      'mt2_modal-container--active': this.state.open
    });

    return (
      <div>
        <button className="mt2_btn mt2_btn--secondary" onClick={this.update}>
          Launch Modal
        </button>

        <div className={modalClasses}>
          <button className="mt2_modal-button" onClick={this.update}>
            <span className="mt2_visuallyhidden">Close Modal</span>
            <svg className="mt2_icon--large">
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
