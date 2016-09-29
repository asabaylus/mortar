'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import MTShowCardComponent from './ShowCard';

class ShowCard extends Module {

  // Event Callbacks
  onClick() {
    // your code here
  }

  init() {
    ReactDOM.render(<MTShowCardComponent
      itemId={this.options.itemId}
      type={this.options.type}
      config={this.options.config}
      link={this.options.link}
      leadMedia={this.options.leadMedia}
      text={this.options.text}
    />, this.el);
  }
}

Pestle.ModuleManager.register('ShowCard', ShowCard);

export default ShowCard;
