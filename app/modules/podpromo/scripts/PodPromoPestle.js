'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import { Pestle, Module } from '@natgeo/mortar-pestle';
import { default as PodPromoComponent } from './PodPromo.jsx';

class PodPromo extends Module {
  init() {
    if (this.options.endpoint) {
      // if there's an endpoint in the Pestle module, fetch that and use the response as our model
      const rqs = new XMLHttpRequest();
      rqs.open('GET', this.options.endpoint);
      rqs.onload = this.onLoadPromo.bind(this);
      rqs.onerror = () => { throw new Error('Error on request (Check json URL)'); };
      rqs.send();
    } else if (this.options.dataModel) {
      // there wasn't an end point specified, so use data specified in markup
      this.renderPromo(this.options.dataModel);
    }
  }

  onLoadPromo(response) {
    if (response.target.status >= 200 && response.target.status < 400) {
      const items = JSON.parse(response.target.responseText);
      this.renderPromo(items);
    } else {
      throw new Error(`Server response with ${response.target.status}`);
    }
  }

  renderPromo(model) {
    ReactDOM.render(<PodPromoComponent model={model} />, this.el);
  }
}

Pestle.ModuleManager.register('PodPromo', PodPromo);

export default PodPromo;
