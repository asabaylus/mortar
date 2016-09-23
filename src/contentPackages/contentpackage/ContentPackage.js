'use strict';

import React, { Component } from 'react';
import ElementQuery from 'react-element-query';

import FourUpComponent from './components/FourUp.js';
import FiveUpComponent from './components/FiveUp.js';

class LeftAndRightContentPackage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    // classnames below are rather arbitrary. Should find out if there's a standard across components and be consistent
    const elementQueries = [
      {
        name: 'mt3_left-and-right-package--tablet',
        width: 768
      },
      {
        name: 'mt3_left-and-right-package--desktop',
        width: 1024
      },
      {
        name: 'mt3_left-and-right-package--largedesktop',
        width: 1280
      },
    ];

    return (
      <ElementQuery sizes={elementQueries}>
        <div className="mt3_row mt3_left-and-right-package">
          <div className="mt3_left-and-right-package__app">
            <div className="left-rail mt3_col-12 mt3_col-md-5">
              <div id="lr_mostRead" className="promo-card">
                { this.props.fiveUpModel ?
                  <FiveUpComponent
                    theme={this.props.theme}
                    initialWidth={this.props.fiveUpWidth}
                    model={this.props.fiveUpModel}
                  />
                : null }
              </div>
            </div>
            <div className="right-rail mt3_col-12 mt3_col-md-7">
              <div id="rr_theLatest" className="show-card">
                { this.props.fourUpModel ?
                  <FourUpComponent
                    theme={this.props.theme}
                    initialWidth={this.props.fourUpWidth}
                    model={this.props.fourUpModel}
                  />
                : null }
              </div>
            </div>
          </div>
        </div>
      </ElementQuery>
    )
  }
}


export default LeftAndRightContentPackage;
