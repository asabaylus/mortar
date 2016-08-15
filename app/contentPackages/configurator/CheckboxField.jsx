'use strict';

import React from 'react';

const CheckboxField = ({ label, onChange, value }) => (
  <div className="mt2_row-gut-1 mt2_subh4">
    <label>
      <input type="checkbox" className="mt2_checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  </div>
);

export default CheckboxField;
