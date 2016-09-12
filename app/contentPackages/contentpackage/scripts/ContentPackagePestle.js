'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Pestle, Module } from '@natgeo/mortar-pestle';
import FourUpComponent from './components/FourUp.jsx';
import _findIndex from 'lodash/findIndex';

class ContentPackage extends Module {
  init() {
    if (this.options.endpoint) {
      // if there's an endpoint in the Pestle module, fetch that and use the response as our model
      const rqs = new XMLHttpRequest();
      rqs.open('GET', this.options.endpoint);
      rqs.onload = this.onLoadData.bind(this);
      rqs.onerror = () => { throw new Error('Error on request (Check json URL)'); };
      rqs.send();
    } else if (this.options.dataModel) {
      // there wasn't an end point specified, so use data specified in markup
      this.renderRails(this.options.dataModel);
    }
  }

  onLoadData(response) {
    if (response.target.status >= 200 && response.target.status < 400) {
      const items = JSON.parse(response.target.responseText);
      this.renderRails(items);
    } else {
      throw new Error(`Server response with ${response.target.status}`);
    }
  }

  renderRails(model) {
    const fourUpIndex = _findIndex(model.components, ['type', 'theLatest']);
    const fourUpContainer = document.getElementById(model.components[fourUpIndex].id);
    if(fourUpIndex && fourUpContainer) {
      ReactDOM.render(<FourUpComponent theme={this.options.theme} initialWidth={fourUpContainer.getBoundingClientRect().width} model={model.components[fourUpIndex]} />, fourUpContainer);
    }
  }
}

Pestle.ModuleManager.register('ContentPackage', ContentPackage);

export default ContentPackage;
