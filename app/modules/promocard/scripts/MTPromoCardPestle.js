'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as MTPromoCardComponent} from './MTPromoCard.jsx';

class PromoCard extends Module {

  // Event Callbacks
  onClick() {
    // your code here
  }

  init() {
    ReactDOM.render(<MTPromoCardComponent
      id={this.options.id}
      type={this.options.type}
      config={this.options.config}
      link={this.options.link}
      leadMedia={this.options.leadMedia}
      text={this.options.text}
      cta={this.options.cta}
      brandingBadgeLabel={this.options.brandingBadgeLabel}
      sponsorContentLabel={this.options.sponsorContentLabel}
      modal={this.options.modal}
      onClick={this.onClick}
    />, this.el);
  }
}

Pestle.ModuleManager.register('PromoCard', PromoCard);

export default PromoCard;
