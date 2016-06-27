/*
 * The pestle class is the core class. It serves to expose all of
 * the registered modules, extensions, an utitilities as well as
 * initializing all instances of modules on the page.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModuleManager = exports.Module = exports.Pestle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _moduleManager = require('./moduleManager');

var _moduleManager2 = _interopRequireDefault(_moduleManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pestle = function () {
  function Pestle() {
    _classCallCheck(this, Pestle);

    this.PubSub = _pubsubJs2.default;
    this.ModuleManager = new _moduleManager2.default();
  }

  _createClass(Pestle, [{
    key: 'init',
    value: function init(done) {
      this.ModuleManager.init(done);
    }
  }]);

  return Pestle;
}();

var instance = new Pestle();

exports.default = instance;
exports.Pestle = instance;
exports.Module = _module2.default;
exports.ModuleManager = _moduleManager2.default;