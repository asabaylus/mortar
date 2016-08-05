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
      leadImage={this.options.image}
      text={this.options.text}
      modal={this.options.modal}
      target={this.options.target}
      title={this.options.title}
      hideTitle={this.options.hideTitle}
      dek={this.options.dek}
      hideDek={this.options.hideDek}
      series={this.options.series}
      hideSeries={this.options.hideSeries}
      byline={this.options.byline}
      hideByline={this.options.hideByline}
      brandingBadgeLabel={this.options.brandingBadgeLabel}
      sponsorContent={this.options.sponsorContent}
      sponsorContentLabel={this.options.sponsorContentLabel}
      video={this.options.video}
      onClick={this.onClick}
    />, this.el);
  }
}

Pestle.ModuleManager.register('PromoCard', PromoCard);

export default PromoCard;
