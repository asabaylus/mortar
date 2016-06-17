/*
 * The pestle class is the core class. It serves to expose all of
 * the registered modules, extensions, an utitilities as well as
 * initializing all instances of modules on the page.
 */

'use strict';

import PubSub from 'pubsub-js';

import Module from './lib/module';
import ModuleManager from './lib/moduleManager';

class Pestle {
  constructor() {
    this.PubSub = PubSub;
    this.ModuleManager = new ModuleManager();
  }

  init(done) {
    this.ModuleManager.init(done);
  }
}

const instance = new Pestle();

export default instance
export {instance as Pestle, Module, ModuleManager}
