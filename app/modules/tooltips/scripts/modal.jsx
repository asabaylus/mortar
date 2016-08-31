'use strict';
import React from 'react';

export const SimpleModal = (props) => (
  <div className='mt2_modal-container mt2_color--neutral--xxxl mt2_modal-container--active'>
    <button className='mt2_modal-button' onClick={props.onClose}>
      <span className='mt2_visuallyhidden'>Close Modal</span>
      <svg className='mt2_icon--large'>
        <use xlinkHref='#close'></use>
      </svg>
    </button>

    {props.children}
  </div>
);

SimpleModal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
}

export default SimpleModal;
