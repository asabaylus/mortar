'use strict';

const $ = require('jquery');

const modules = {
  init: function() {
    this.open();
    this.close();
  },
  close: function() {
    $('.mt2_JS_modal-close-button').click(function(){
      const targetModal = $('.mt2_JS_modal-container[data-modal-id="' +
        $(this).data('modalTarget')
        + '"]');
      const transitionDuration = parseFloat(targetModal.css('transition-duration')) * 1000;

      targetModal.removeClass('mt2_module-container--active')

      setTimeout(function(){
        targetModal.addClass('mt2_visuallyhidden')
      }, transitionDuration);
    })
  },
  open: function() {
    $('.mt2_JS_modal-open-button').click(function(){
      $('.mt2_JS_modal-container[data-modal-id="' +
        $(this).data('modalTarget')
        + '"]')
      .removeClass('mt2_visuallyhidden')
      .addClass('mt2_module-container--active');
    })
  }
};

module.exports = modules.init();
