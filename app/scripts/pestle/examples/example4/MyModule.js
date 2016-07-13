'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Module} from '@natgeo/mortar-pestle';

import Component from './Component.jsx';


export default class MyModule extends Module {
  init(done) {
    const {prop1} = this.options;

    setTimeout(() => {
      ReactDOM.render(<Component prop={prop1} />, this.el);
      console.log('Module4 initialized.');

      done();
    }, 1000);
  }
}
