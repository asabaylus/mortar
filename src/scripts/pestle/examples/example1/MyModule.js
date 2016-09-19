'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Module} from '@natgeo/pestle';

import Component from './Component.jsx';


export default class MyModule extends Module {
  init() {
    ReactDOM.render(<Component />, this.el);
    console.log('Module1 initialized.');
  }
}
