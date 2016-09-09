'use strict';

import React from 'react';

const Configurator = ({component, children}) => (
  <div>
    <fieldset className="mt3_bordercolor--gray40 mt3_row-gut-1">
      <h5 className="mt3_h5">Configuration</h5>
      {children}
    </fieldset>
    <fieldset className="mt3_bordercolor--gray40 mt3_row-gut-1">
      <h5 className="mt3_h5">Result</h5>
      {component}
    </fieldset>
    <fieldset className="mt3_bordercolor--gray40">
      <h5 className="mt3_h5">Properties</h5>
      <div className="codesnippet-wrapper">
        <pre className="codesnippet">
          <code className="language-markup">{JSON.stringify(component.props, null, 2)}</code>
        </pre>
      </div>
    </fieldset>
  </div>
);

export default Configurator;
