'use strict';

import React, { Component, PropTypes } from 'react';
import PortalComponentMixin from './PortalComponentMixin.jsx';

/* This component serves to wrap content using the Portal mixin. Note - because Mixins are not
 * supported in es6 "class" syntax, this component uses the "createClass" function
 */

var PortalWrapper = React.createClass({
    mixins: [
        PortalComponentMixin
    ],

    renderLayer() {
        return (
          <div className="portal-wrapper mt3_row">
            {this.props.children}
          </div>
        );
    }
});

export default PortalWrapper;
