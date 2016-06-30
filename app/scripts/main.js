'use strict';

import 'babel-polyfill';

import {Pestle} from '@natgeo/mortar-pestle';

require('../modules/modals/scripts.js');
require('../modules/sharing/scripts/MTSharingPestle.js');
require('../modules/slider/scripts/MTSliderPestle.js');

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
