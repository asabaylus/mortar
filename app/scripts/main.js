'use strict';

import 'babel-polyfill';

import {Pestle} from '@natgeo/mortar-pestle';

require('../modules/modals/scripts/ModalPestle.js');
require('../modules/video/scripts/VideoPestle.js');
require('../modules/photogallery/scripts/MTPhotoGalleryPestle.js');
require('../modules/sharing/scripts/MTSharingPestle.js');
require('../modules/slider/scripts/MTSliderPestle.js');
require('../modules/icon/scripts/IconPestle.js');
require('../modules/button/scripts/CTAButtonPestle.js');
require('../modules/promocard/scripts/MTPromoCardPestle.js');
require('../modules/promocard/configurator/MTPromoCardConfiguratorPestle.js');
require('../modules/podpromo/scripts/PodPromoPestle.js');
require('../modules/podpromo/configurator/MTPodPromoConfiguratorPestle.js');
require('../modules/tooltips/scripts/MTTooltipPestle.js');
require('../modules/videoplaylist/scripts/VideoPlaylistPestle.js');
require('../modules/videoplaylist/configurator/MTVideoPlaylistConfiguratorPestle.js');

// Content Packages
require('../contentPackages/contentpackage/scripts/ContentPackagePestle.js');
require('../contentPackages/contentpackage/configurator/ContentPackageConfiguratorPestle.js');
require('../contentPackages/heroWithTwoRails/heroWithTwoRailsPestle.js');
require('../contentPackages/heroWithTwoRails/configurator/heroWithTwoRailsConfiguratorPestle.js');

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
