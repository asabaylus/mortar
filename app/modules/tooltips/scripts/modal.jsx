'use strict';

import React, { Component, PropTypes }  from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';

export class SimpleModal extends Component {
  render(){
    const modalClasses = `mt2_modal-container mt2_color--neutral--xxxl mt2_module-container--active`;

    return (
      <div className={modalClasses}>
        <button className="mt2_modal-button" onClick={this.props.onClose}>
          <span className="mt2_visuallyhidden">Close Modal</span>
          <svg className="mt2_icon--large">
            <use xlinkHref="#close"></use>
          </svg>
        </button>

        {this.props.children}
      </div>
    );
  }
}
