'use strict';

import {Pestle} from './pestle/main.js';

require('../modules/modals/scripts.js');
require('../modules/photogallery/scripts/MTPhotoGalleryPestle.js');

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
