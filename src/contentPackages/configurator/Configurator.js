'use strict';

import React, {Component, PropTypes} from 'react';
import CodeSnippet from './CodeSnippet';

const Configurator = ({component, children}) => {
  // Show component name in code snippet
  let displayName = component.type ? component.type.name : "";

  return (
    <div>
      <fieldset className="mt3_bordercolor--gray40 mt3_row-gut-1 configurator__configuration">
        <h5 className="mt3_h5">Configuration</h5>
        {children}
      </fieldset>
      <fieldset className="mt3_bordercolor--gray40 mt3_row-gut-1 configurator__result">
        <h5 className="mt3_h5">Result</h5>
        {component}
      </fieldset>
      <div className="configurator__properties">
        <h5 className="mt3_h5">Properties</h5>
        <CodeSnippet code={component.props} componentName={displayName} />
      </div>
    </div>
  )
};

export default Configurator;
