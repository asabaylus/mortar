'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import { Pestle, Module } from '@natgeo/pestle';

import MTPromoCard from './MTPromoCard';


export default class PromoCard extends Module {
  onClick() {
    // your code here
  }

  init() {
    const {
      brandingBadgeLabel,
      config,
      cta,
      itemId,
      leadMedia,
      link,
      modal,
      text,
      theme,
      type,
    } = this.options;

    ReactDOM.render(
      <MTPromoCard
        itemId={itemId}
        theme={theme}
        type={type}
        config={config}
        link={link}
        leadMedia={leadMedia}
        text={text}
        cta={cta}
        brandingBadgeLabel={brandingBadgeLabel}
        modal={modal}
        onClick={this.onClick}
      />,
      this.el);
  }
}

Pestle.ModuleManager.register('PromoCard', PromoCard);
