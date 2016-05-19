/*
 *  The Module class provides the basic functionality for
 *  pestle modules. It is the base for extending any new
 *  pestle module.
 */
'use strict';

class Module {
  // called upon initialization of an instance
  constructor(el, options) {
    this.isLoaded = false;
    this.el = el;
    this.options = options;
  }

  // set loaded value to true on load. this way a developer can check to see
  // whether each instance of a module is loaded
  set isLoaded(value) {
    this.loaded = value;
  }

  // check to see whether a specific instance of a module is loaded, if the
  // value does not exist, returns false
  get isLoaded() {
    return this.loaded || false;
  }

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
  init() {
    const msg = '[Module/' + this.constructor.name + ']:'
            + 'Doesn\'t have an init method defined';
    throw new Error(msg);
  }

  // remove the instance of a module as well as the memory it was using
  dispose() {
    this.el = null;
    this.options = null;
  }
}

export default Module
