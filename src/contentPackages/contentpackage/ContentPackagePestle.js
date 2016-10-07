'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Pestle, Module } from '@natgeo/pestle';
import LeftAndRightContentPackageComponent from './ContentPackage.js';
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
      this.render(this.options.dataModel);
    }
  }

  onLoadData(response) {
    if (response.target.status >= 200 && response.target.status < 400) {
      const items = JSON.parse(response.target.responseText);
      this.render(items);
    } else {
      throw new Error(`Server response with ${response.target.status}`);
    }
  }

  render(model) {
    const packageContainer = this.el;
    const packageTarget = document.getElementById(`target_${packageContainer.id}`);

    const fiveUpIndex = _findIndex(model.components, ['type', 'mostRead']);
    const fourUpIndex = _findIndex(model.components, ['type', 'theLatest']);
    const fourUpContainer = document.getElementById(model.components[fourUpIndex].itemId);
    const fiveUpContainer = document.getElementById(model.components[fiveUpIndex].itemId);

    ReactDOM.render(
      <LeftAndRightContentPackageComponent
        theme={this.options.theme}
        initialWidth={packageContainer.getBoundingClientRect().width} fourUpModel={model.components[fourUpIndex]} fourUpWidth={fourUpContainer.getBoundingClientRect().width} fiveUpModel={model.components[fiveUpIndex]} fiveUpWidth={fiveUpContainer.getBoundingClientRect().width}
        parentEl={packageContainer}
        parallaxRails={this.options.parallaxRails}
      />, packageTarget);
  }
}

Pestle.ModuleManager.register('ContentPackage', ContentPackage);

export default ContentPackage;
