'use strict';

import React from 'react';

const TextField = ({ label, onChange, value }) => (
  <div className="mt3_row-gut-1 mt3_subh4">
    <label>
      {label}
      <input className="mt3_input mt3_fullwidth mt3_subh4" type="text" onChange={onChange} value={value} />
    </label>
  </div>
);

export default TextField;
