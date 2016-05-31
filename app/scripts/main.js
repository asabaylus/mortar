'use strict';

import {Pestle} from './pestle/main.js';

require('../modules/modals/scripts.js');
require('../modules/slider/scripts/MTSliderPestle.js');

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
