/*
 *  ModuleManager class is on charge of keep the list
 *  of every module registered. It's also responsable
 *  for create new instances of the registered modules.
 */

'use strict';

import Module from './module';
import {guid} from '../util/guid';

const defaultModuleNameAttribute = 'data-pestle-module';
const defaultModuleParamsAttribute = 'data-pestle-options';

class ModuleManager {
  constructor() {
    this.modules = {
      registered: {},
      runningInstances: {}
    };
  }

  register(name, module) {
    if(!(module.prototype instanceof Module)) {
      throw new Error('[Module.register] module should inherit from Module')
    }

    if(this.isRegistered(name)) {
      throw new Error(`[Module.register] there's already a module called '${name}'`);
    }

    this.modules.registered[name] = {
      name,
      fn: module
    };
  }

  isRegistered(name) {
    return this.modules.registered.hasOwnProperty(name);
  }

  getAll() {
    return this.modules;
  }

  getAllModules() {
    return this.modules.registered;
  }

  getModule(name) {
    return this.modules.registered[name];
  }

  getAllInstances() {
    return this.modules.runningInstances;
  }

  getModulesCount() {
    return Object.keys(this.getAllModules()).length;
  }

  getInstancesCount() {
    return Object.keys(this.getAllInstances()).length;
  }

  getInstance(instanceId) {
    return this.modules.runningInstances[instanceId];
  }

  init(callback) {
    let self = this;
    let totalModules,
      runningInstances,
      countModules;

    // Find all elements defining a module
    const selector = `[${defaultModuleNameAttribute}]`;
    let modules = document.querySelectorAll(selector);

    // Initialize every module
    for(let i = 0, element; element = modules[i]; i++) {
      let moduleName = element.getAttribute(defaultModuleNameAttribute);
      let dataInstance = this.createInstance(moduleName, element);

      if(dataInstance) {
        // Add module's instance on the list
        this.modules.runningInstances[dataInstance.id] = dataInstance;
      }
    }

    runningInstances = this.getAllInstances();
    totalModules = this.getInstancesCount();
    countModules = 0;

    // Internal callback for each created instance
    function done(err) {
      let instanceData = this;
      let modulesWorking,
        modulesFailing;

      instanceData.error = err;
      if(!err) {
        instanceData.instance.isLoaded = true;
      }

      countModules++;
      if(countModules < totalModules) {
        return;
      }

      // Preparing for calling init() callback
      if(!callback) {
        return;
      }

      modulesWorking = [];
      modulesFailing = [];
      runningInstances = self.getAllInstances();

      // Separate instances ok from those failing
      Object.keys(runningInstances).forEach((instanceId) => {
        if(runningInstances[instanceId].error) {
          modulesFailing.push(runningInstances[instanceId]);
        } else {
          modulesWorking.push(runningInstances[instanceId]);
        }
      });

      // Nulling variables (node.js convention)
      if(modulesFailing.length === 0) {
        modulesFailing = null;
      }

      if(modulesWorking.length === 0) {
        modulesWorking = null;
      }

      // Calling callback of module manager
      callback(modulesFailing, modulesWorking);
    }

    // Call init() method of each instance
    Object.keys(runningInstances).forEach((instanceId) => {
      let instanceData = runningInstances[instanceId],
        init = instanceData.instance.init,
        instance = instanceData.instance;

      // If init() has params use async call
      if(init.length > 0) {
        init(done.bind(instanceData));
      } else { // else sync call
        try {
          init();
          done.call(instanceData);
        } catch(e) {
          done.call(instanceData, e);
        }
      }
    });
  }

  parseParams(options) {
    try {
      return options ? JSON.parse(options) : null;
    } catch(e) {
      throw e;
    }
  }

  createInstance(moduleName, el) {
    let optionsAttribute,
      options,
      instanceData,
      instance,
      id;
    let module = this.getModule(moduleName);

    if(!module) {
      // console.warn("Module:", moduleName, "no exists");
      return;
    }

    if(!el) {
      return;
    }

    id = guid();

    try {
      // Reading options
      optionsAttribute = el.getAttribute(defaultModuleParamsAttribute);
      options = this.parseParams(optionsAttribute);

      // Initialize the module
      instance = new module.fn(el, options);

      instanceData = {
        id,
        name: moduleName,
        error: null,
        instance
      };
    } catch(e) {
      instanceData = {
        id,
        name: moduleName,
        error: e,
        instance
      };
    }

    return instanceData;
  }

  destroyInstance(instanceId) {
    let runningInstances = this.modules.runningInstances;
    if(!runningInstances.hasOwnProperty(instanceId)) {
      return;
    }

    runningInstances[instanceId].instance.dispose();
    delete runningInstances[instanceId];
  }

  dispose() {
    let runningInstances = this.modules.runningInstances;
    Object.keys(runningInstances).forEach((instanceId) => {
      if(runningInstances[instanceId].instance) {
        runningInstances[instanceId].instance.dispose();
      }
    });
    this.modules = {
      registered: {},
      runningInstances: {}
    };
  }
}

export default ModuleManager
