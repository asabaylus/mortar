'use strict';

import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';

/*
 This attempts to simplify and relieve the ElementQuery dependency, as-well-as offering performance improvements
 */

let cssClass;

class EQ extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contentWidth: null
    };
    this.getElementWidth = this.getElementWidth.bind(this);
  }

  componentDidMount() {
    this.getElementWidth();
    this.resizeHandler = _debounce(this.getElementWidth, !this.props.resizeDbTime ? 250 : this.props.resizeDbTime);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getElementWidth() {
    this.setState({
      contentWidth: this.refs.elementContainer.getBoundingClientRect().width
    });
  }

  render() {
    const { sizeClasses } = this.props;

    for( let prop in sizeClasses){
      if(sizeClasses.hasOwnProperty(prop) && prop < this.state.contentWidth){
        cssClass = sizeClasses[prop];
      }
    }

    return (
      <div ref="elementContainer" className={cssClass}>
        {this.props.children}
      </div>
    );

  }

}

EQ.PropTypes = {
  resizeDbTime : PropTypes.number,
  sizeClasses : PropTypes.object,
  initialWidth : PropTypes.number
};

export default EQ;
