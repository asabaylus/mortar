/*
 *  The Module class provides the basic functionality for
 *  pestle modules. It is the base for extending any new
 *  pestle module.
 */
'use strict';

class Module {
  constructor(el, options) {
    this.isLoaded = false;
    this.el = el;
    this.options = options;
  }

  set isLoaded(value) {
    this.loaded = value;
  }

  get isLoaded() {
    return this.loaded || false;
  }

  init() {
    const msg = '[Module/' + this.constructor.name + ']:'
            + 'Doesn\'t have an init method defined';
    throw new Error(msg);
  }

  dispose() {
    this.el = null;
    this.options = null;
  }
}

export default Module
