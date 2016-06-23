'use strict';

import 'babel-polyfill';

import {Pestle} from './pestle/main.js';

require('../modules/modals/scripts.js');
require('../modules/slider/scripts/MTSliderPestle.js');
require('../modules/slider/scripts/Icon.js');

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
