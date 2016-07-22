'use strict';

import React from 'react';
import * as ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import {default as PromoCardComponent} from './MTPromoCard.jsx';

class PromoCard extends Module {

  init() {
    ReactDOM.render(<PromoCardComponent
      // props
    />, this.el);
  }
}

Pestle.ModuleManager.register('PromoCard', PromoCard);

export default PromoCard;
