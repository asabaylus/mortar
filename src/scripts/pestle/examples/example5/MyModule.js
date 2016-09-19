'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Module} from '@natgeo/pestle';

import Component from './Component.jsx';


export default class MyModule extends Module {
  init(done) {
    ReactDOM.render(<Component />, this.el);
  }
}
