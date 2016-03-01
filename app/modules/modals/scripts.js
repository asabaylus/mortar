const $ = require('jquery');

const modules = {
  init: function() {
    const _this = this;

    $('body').click(function(e){
      if (e.target.className === 'mt_JS_modal-open-button') {
        return _this.open(e.target.dataset.modalTarget)
      } else if (e.target.className === 'mt_JS_modal-close-button') {
        return _this.close(e.target.dataset.modalTarget)
      }
    });
  },
  close: function(id) {
    const targetModal = $('.mt_JS_modal-container[data-modal-id="' + id + '"]');
    const transitionDuration = parseFloat(targetModal.css('transition-duration')) * 1000;

    targetModal
    .removeClass('mt_module-container--active');

    // Wait until the transition is done to add the `visuallyhidden` class
    setTimeout(function(){
      targetModal.addClass('mt_visuallyhidden')
    }, transitionDuration);
  },
  open: function(id) {
    $('.mt_JS_modal-container[data-modal-id="' + id + '"]')
    .removeClass('mt_visuallyhidden')
    .addClass('mt_module-container--active');
  }
};

module.exports = modules.init();
