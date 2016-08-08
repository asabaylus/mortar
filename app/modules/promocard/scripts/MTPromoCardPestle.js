'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as PromoCardComponent} from './MTPromoCard.jsx';

class PromoCard extends Module {

  // Event Callbacks
  onClick() {
    // your code here
  }

  init() {
    ReactDOM.render(<PromoCardComponent
      leadMedia={this.options.leadMedia}
      text={this.options.text}
      type={this.options.type}
      link={this.options.link}
      modal={this.options.modal}
      target={this.options.target}
      brandingBadgeLabel={this.options.brandingBadgeLabel}
      sponsorContent={this.options.sponsorContent}
      sponsorContentLabel={this.options.sponsorContentLabel}
      onClick={this.onClick}
    />, this.el);
  }
}

Pestle.ModuleManager.register('PromoCard', PromoCard);

export default PromoCard;
