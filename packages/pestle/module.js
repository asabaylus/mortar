/*
 *  The Module class provides the basic functionality for
 *  pestle modules. It is the base for extending any new
 *  pestle module.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function () {
  // called upon initialization of an instance

  function Module(id, el, options) {
    _classCallCheck(this, Module);

    this.init = this.init.bind(this);
    this.dispose = this.dispose.bind(this);

    this.id = id;
    this.isLoaded = false;
    this.el = el;
    this.options = options;
  }

  // set loaded value to true on load. this way a developer can check to see
  // whether each instance of a module is loaded


  _createClass(Module, [{
    key: 'init',


    // this method is called when pestle.init() is fired and in turn it will
    // initialize every instance referenced. Accepts `done` as a parameter.
    // Use `done();` when you need async behavior.
    //
    // init(done) {
    //   fetch('http://url.com', function(param){
    //     doSomething(param);
    //     done();
    //   })
    // }
    value: function init() {
      var msg = '[Module/' + this.constructor.name + ']:' + 'Doesn\'t have an init method defined';
      throw new Error(msg);
    }

    // remove the instance of a module as well as the memory it was using

  }, {
    key: 'dispose',
    value: function dispose() {
      this.el = null;
      this.options = null;
    }
  }, {
    key: 'isLoaded',
    set: function set(value) {
      this.loaded = value;
    }

    // check to see whether a specific instance of a module is loaded, if the
    // value does not exist, returns false
    ,
    get: function get() {
      return this.loaded || false;
    }
  }]);

  return Module;
}();

exports.default = Module;