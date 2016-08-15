'use strict';

import React from 'react';

const SectionTitle = ({ text, children }) => (
  <div className="mt2_row-gut-1">
    <h5 className="mt2_h5"><u>{text}</u></h5>
    {children}
  </div>
);

export default SectionTitle;
