'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';

/*
 *  This mixin allows a React component to be targeted to any div with an ID provided
 *  as a "targetDivId" prop, a query provided as a "targetElementQuery" prop. This
 *  essentially means  Components can be rendered anywhere in the DOM, allowing child
 *  Components to be in different divs than parents, for example.
 */

var PortalComponentMixin = {
	componentWillUnmount: function() {
		this._unrenderLayer();
		if(!this.props.portal) document.body.removeChild(this._target);
	},
	componentDidUpdate: function() {
		this._renderLayer();
	},
	componentDidMount: function() {
		if(this.props.targetDiv) {
			this._target = this.props.targetDiv;
		} else if(this.props.targetDivId) {
			this._target = document.getElementById(this.props.targetDivId);
		} else if (this.props.targetElementQuery) {
			this._target = document.querySelector(this.props.targetElementQuery);
		} else {
			this._target = document.createElement('div');
			document.body.appendChild(this._target);
		}
		this._renderLayer();
	},
	_renderLayer: function() {
		ReactDOM.render(this.renderLayer(), this._target);

	},
	_unrenderLayer: function() {
		React.unmountComponentAtNode(this._target);
	},
	render: function() {
		if (!this.props.targetDivId && !this.props.targetDiv && !this.props.targetElementQuery) {
			return this.renderLayer();
		} else {
			return <span className="portalComponentFailure"/>;
		}
	}
};

module.exports = PortalComponentMixin;
