'use strict';

import React from 'react';

const TextField = ({ label, onChange, value }) => (
  <div className="mt2_row-gut-1 mt2_subh4">
    <label>
      {label}
      <input className="mt2_input mt2_fullwidth mt2_subh4" type="text" onChange={onChange} value={value} />
    </label>
  </div>
);

export default TextField;
