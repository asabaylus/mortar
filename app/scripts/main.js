'use strict';

import 'babel-polyfill';

import {Pestle} from '@natgeo/mortar-pestle';

require('../modules/modals/scripts/ModalPestle.js');
require('../modules/photogallery/scripts/MTPhotoGalleryPestle.js');
require('../modules/sharing/scripts/MTSharingPestle.js');
require('../modules/slider/scripts/MTSliderPestle.js');
require('../modules/icon/scripts/IconPestle.js');
require('../modules/button/scripts/CTAButtonPestle.js');
require('../modules/promocard/scripts/MTPromoCardPestle.js');
require('../modules/tooltips/scripts/MTTooltipPestle.js');
require('../modules/tooltips/scripts/MTTooltipModalPestle.js');



Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
