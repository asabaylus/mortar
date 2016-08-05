'use strict';

import React, { Component, PropTypes }  from 'react';

export const SimpleModal = (props) => {
  const modalClasses = `mt2_modal-container mt2_color--neutral--xxxl mt2_module-container--active`;

  return (
    <div className={modalClasses}>
      <button className="mt2_modal-button" onClick={props.onClose}>
        <span className="mt2_visuallyhidden">Close Modal</span>
        <svg className="mt2_icon--large">
          <use xlinkHref="#close"></use>
        </svg>
      </button>

      {props.children}
    </div>
  );
}
