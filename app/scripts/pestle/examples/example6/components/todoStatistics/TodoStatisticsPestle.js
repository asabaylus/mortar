'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import { Provider } from 'react-redux';
import StatisticsDisplay from './containers/StatisticsDisplay';


export default class TodoStatistics extends Module {
  init() {
    ReactDOM.render(
      <Provider store={Pestle.store}>
        <StatisticsDisplay />
      </Provider>, this.el);
    console.log('TodoStatistics initialized.');
  }
}
