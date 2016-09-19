'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import HeroWithTwoRailsComponent from './heroWithTwoRails';

class HeroWithTwoRails extends Module {
  init() {
    //if there's an endpoint....
    if (this.options.endpoint) {
      // if there's an endpoint in the Pestle module, fetch that and use the response as our model
      const rqs = new XMLHttpRequest();
      rqs.open('GET', this.options.endpoint);
      rqs.onload = this.onLoadPromo.bind(this);
      rqs.onerror = () => { throw new Error('Error on request (Check json URL)'); };
      rqs.send();
    } else {
      // there wasn't an end point specified, so use data specified in markup
      this.render(this.options);
    }
  }

  onLoadPromo(response) {
    if (response.target.status >= 200 && response.target.status < 400) {
      const items = JSON.parse(response.target.responseText);
      this.render(items);
    } else {
      throw new Error(`Server response with ${response.target.status}`);
    }
  }

  render(options) {
    /* this component cannot render its UI entirely into the Pestle div itself, as it also
     * needs to contain markup required by some authoring systems (AEM, for example). As a
     * result, a reference to the parent element is needed, in order to locate sibling elements
     * with which to target elements.
     */
    let parentEl = this.el.parentNode;

    if(parentEl) {
      ReactDOM.render(
        <HeroWithTwoRailsComponent {...options} parentEl={parentEl}/>
        , this.el);
    }
  }
}

Pestle.ModuleManager.register('HeroWithTwoRails', HeroWithTwoRails);

export default HeroWithTwoRails;
