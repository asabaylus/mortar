'use strict';

import Module from './lib/module';
import ModuleManager from './lib/moduleManager';

class Pestle {
  constructor() {
    this.ModuleManager = new ModuleManager();
  }

  init() {
    this.ModuleManager.init();
  }
}

export default Pestle
export {Pestle, Module, ModuleManager}
