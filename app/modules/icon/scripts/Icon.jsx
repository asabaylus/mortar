'use strict';

import React, { Component, PropTypes }  from 'react';

class Icon extends Component {

  render(){
    let sizeClass = "mt_icon ";
    this.props.size ? sizeClass += "mt_icon--large" : null;

    /***
     * removing namespace attribute as it is passed to the DOM node through setAttributeNS method by default:
     * https://github.com/facebook/react/blob/master/src/renderers/dom/shared/SVGDOMPropertyConfig.js
     * https://github.com/facebook/react/issues/2250
     *
     * additionally, choosing to use conventional title tag rather than xlinkTitle attribute based on:
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:title
     ***/

    return <svg className={sizeClass + " mt_color--" + this.props.color} >
      <title>{this.props.alt}</title>
      <use xlinkHref={this.props.name}></use>
    </svg>
  }

}

Icon.propTypes = {
  name: PropTypes.string,
  align: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  alt: PropTypes.string
}

export default Icon
