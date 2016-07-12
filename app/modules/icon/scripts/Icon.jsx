'use strict';

import React, { Component, PropTypes }  from 'react';

class Icon extends Component {

  render(){
    let iconClasses = "mt2_icon ";
    if(this.props.size){
      iconClasses += "mt2_icon--large ";
    }
    if(this.props.align){
      iconClasses += "mt2_icon--" + this.props.align;
    }
    if(this.props.color){
      iconClasses += " mt2_color--" + this.props.color;
    }

    /***
     * removing namespace attribute as it is passed to the DOM node through setAttributeNS method by default:
     * https://github.com/facebook/react/blob/master/src/renderers/dom/shared/SVGDOMPropertyConfig.js
     * https://github.com/facebook/react/issues/2250
     *
     * additionally, choosing to use conventional title tag rather than xlinkTitle attribute based on:
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:title
     ***/

    return <svg className={iconClasses} >
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
