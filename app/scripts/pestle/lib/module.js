'use strict';

class Module {
  constructor() {
    this.isLoaded = false;
  }

  init() {
    const msg = '[Module/' + this.constructor.name + ']:'
            + 'Doesn\'t have an init method defined';
    throw new Error(msg);
  }

  static add(name, module) {
    if(!(module instanceof Module)) {
      throw new Error('[Module.add] module should be an instance of Module')
    }

    if(this.list[name]) {
      throw new Error("[Module.add] there's already a module called '${name}'");
    }

    this.list[name] = module;
  }

  static getAll() {
    return this.list;
  }
}

Module.list = {};

export default Module
