'use strict';

import 'babel-polyfill';

import {Pestle} from '@natgeo/pestle';
import ParallaxSceneManager from '../util/parallax/parallaxSceneManager';

window.jQuery = window.$ = require('jquery');
const MTJQUERY = jQuery;
const MTJQ = jQuery.noConflict();

(function ($, jQuery, Pestle) {

  require('../modules/broadsheet/MTBroadsheetPestle');
  require('../modules/modals/ModalPestle');
  require('../modules/video/VideoPestle');
  require('../modules/photogallery/MTPhotoGalleryPestle');
  require('../modules/sharing/MTSharingPestle');
  require('../modules/slider/MTSliderPestle');
  require('../modules/icon/IconPestle');
  require('../modules/button/CTAButtonPestle');
  require('../modules/promocard/MTPromoCardPestle');
  require('../modules/promocard/configurator/MTPromoCardConfiguratorPestle');
  require('../modules/podpromo/PodPromoPestle');
  require('../modules/podpromo/configurator/MTPodPromoConfiguratorPestle');
  require('../modules/tooltips/MTTooltipPestle');
  require('../modules/videoplaylist/VideoPlaylistPestle');
  require('../modules/videoplaylist/configurator/MTVideoPlaylistConfiguratorPestle');
  require('../modules/showcard/showCardPestle');
  require('../modules/videomodal/VideoModalPestle');


// Content Packages
  require('../contentPackages/contentpackage/ContentPackagePestle');
  require('../contentPackages/contentpackage/configurator/ContentPackageConfiguratorPestle');
  require('../contentPackages/heroWithTwoRails/heroWithTwoRailsPestle');
  require('../contentPackages/heroWithTwoRails/configurator/heroWithTwoRailsConfiguratorPestle');


})(MTJQUERY, MTJQ, Pestle);

let parallaxSceneManager =  new ParallaxSceneManager;
parallaxSceneManager.init();

Pestle.init();

// Exposing Pestle
window.Pestle = Pestle;
