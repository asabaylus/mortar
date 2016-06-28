'use strict';

import 'babel-polyfill';

import {Pestle} from './pestle/main.js';

require('../modules/modals/scripts.js');
require('../modules/slider/scripts/MTSliderPestle.js');
require('../modules/icon/scripts/IconPestle.js');
require('../modules/button/scripts/CTAButtonPestle.js');

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
