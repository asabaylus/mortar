'use strict';

import React from 'react';

const SelectField = ({ label, onChange, children, value }) => (
  <div className="mt2_row-gut-1 mt2_subh4">
    <label>
      {label}
      <div className="mt2_select-wrapper mt2_fullwidth">
          <select className="mt2_select-input mt2_color--neutral--l mt2_subh4" onChange={onChange} value={value}>
            {children}
          </select>
      </div>
    </label>
  </div>
);

export default SelectField;
