'use strict';

import React from 'react';

const CheckboxField = ({ label, onChange, value }) => (
  <div className="mt3_row-gut-1 mt3_subh4">
    <label>
      <input type="checkbox" className="mt3_checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  </div>
);

export default CheckboxField;
