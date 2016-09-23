'use strict';

import React, { Component } from 'react';

import FourUpComponent from './components/FourUp.js';
import FiveUpComponent from './components/FiveUp.js';
import PortalWrapper from '../../util/PortalWrapper';

class LeftAndRightContentPackage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const portalContent = [
      <PortalWrapper targetDiv={document.getElementById(this.props.fourUpModel.itemId)} key={"fourUpWrapper"}>
        <FourUpComponent
          theme={this.props.theme}
          initialWidth={this.props.fourUpWidth}
          model={this.props.fourUpModel}
        />
      </PortalWrapper>,
      <PortalWrapper targetDiv={document.getElementById(this.props.fiveUpModel.itemId)} key={"fiveUpWrapper"}>
        <FiveUpComponent
          theme={this.props.theme}
          initialWidth={this.props.fiveUpWidth}
          model={this.props.fiveUpModel}
        />
      </PortalWrapper>
    ];

    return (
      <div className="mt3_left-and-right-package__app">
        {portalContent}
      </div>
    )
  }
}

export default LeftAndRightContentPackage;
