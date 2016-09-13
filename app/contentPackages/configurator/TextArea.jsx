import React from 'react';

const TextArea = ({ label, onChange, value }) => (
  <div className="mt3_row-gut-1 mt3_subh4">
    <label>
      {label}
      <textarea className="mt3_input mt3_textarea mt3_fullwidth mt3_subh4" onChange={onChange} defaultValue={value} />
    </label>
  </div>
);

export default TextArea;
