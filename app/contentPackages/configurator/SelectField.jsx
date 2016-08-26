'use strict';

import React from 'react';

const SelectField = ({ label, onChange, children, value }) => (
  <div className="mt3_row-gut-1 mt3_subh4">
    <label>
      {label}
      <div className="mt3_select-wrapper mt3_fullwidth">
          <select className="mt3_select-input mt3_color--neutral--l mt3_subh4" onChange={onChange} value={value}>
            {children}
          </select>
      </div>
    </label>
  </div>
);

export default SelectField;
