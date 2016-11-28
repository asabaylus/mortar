/*
 *  The ModuleManager registers each initialized instance of
 *  of a module, keeping a master list. It is also responsible
 *  for creating and destroying instances of the registered modules.
 */

'use strict';

import Module from './module';
import {guid} from './util/guid';


const defaultModuleNameAttribute = 'data-pestle-module';
const defaultModuleParamsAttribute = 'data-pestle-options';


class ModuleManager {

  // called when a new Pestle instance of a module
  // var pestle = new Pestle();
  constructor() {
    this.modules = {
      registered: {},
      runningInstances: {}
    };
  }

  // registers a new module making sure that a new registered module inherits
  // from the module class and that it does not already exist. if it satisfies
  // those conditions it is registered
  register(name, module) {
    if (!(module.prototype instanceof Module)) {
      throw new Error('[Module.register] module should inherit from Module')
    }

    if (this.isRegistered(name)) {
      throw new Error(`[Module.register] there's already a module called '${name}'`);
    }

    this.modules.registered[name] = {
      name,
      fn: module
    };
  }

  // checks whether a module is registered
  isRegistered(name) {
    return this.modules.registered.hasOwnProperty(name);
  }

  // returns the module objects that are registered and running
  getAll() {
    return this.modules;
  }

  // returns only registered modules
  getAllModules() {
    return this.modules.registered;
  }

  // get a specific module by name
  getModule(name) {
    return this.modules.registered[name];
  }

  // returns only running modules
  getAllInstances() {
    return this.modules.runningInstances;
  }

  getInstancesByName(name) {
    const instanceArray = this.getAllInstances();
    return Object
            .keys(instanceArray)
            .map((instanceId) => {
              return instanceArray[instanceId];
            })
            .filter((instance) => {
              return instance.name === name;
            })
  }

  // returns number of registered modules
  getModulesCount() {
    return Object.keys(this.getAllModules()).length;
  }

  // returns number of running instances of all modules
  getInstancesCount() {
    return Object.keys(this.getAllInstances()).length;
  }

  // returns a single instance of a module by ID
  getInstance(instanceId) {
    return this.modules.runningInstances[instanceId];
  }

  // 1. Reads the entire DOM
  // 2. finds instances of references to modules
  // 3. creates an instance of each module in the order it is found
  // 4. marks instances as 'running' after they have initialized
  init(callback) {
    let self = this;
    let totalModules,
      runningInstances,
      countModules;

    const selector = `[${defaultModuleNameAttribute}]`;
    let modules = document.querySelectorAll(selector);

    // Initialize every module
    for (let i = 0, element; element = modules[i]; i++) {
      let moduleName = element.getAttribute(defaultModuleNameAttribute);
      let dataInstance = this.createInstance(moduleName, element);

      if (dataInstance) {
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

      if (err) {
        instanceData.error = err;
        console.error(
          'Error on Module: ' + instanceData.name,
          '\n Instance Id:' + instanceData.id,
          '\n Message: ' + err.message,
          (err.fileName) ? '\n File:' + err.fileName + ' (' + err.lineNumber + ',' + err.columnNumber + ')' : '',
          '\n Stack:', (err.stack) ? err.stack : err
        );
      }
      else {
        instanceData.instance.isLoaded = true;
      }

      countModules++;
      if (countModules < totalModules) {
        return;
      }

      // Preparing for calling init() callback
      if (!callback) {
        return;
      }

      modulesWorking = [];
      modulesFailing = [];
      runningInstances = self.getAllInstances();

      // Separate instances ok from those failing
      Object.keys(runningInstances).forEach((instanceId) => {
        if (runningInstances[instanceId].error) {
          modulesFailing.push(runningInstances[instanceId]);
        } else {
          modulesWorking.push(runningInstances[instanceId]);
        }
      });

      // Nulling variables (node.js convention)
      if (modulesFailing.length === 0) {
        modulesFailing = null;
      }

      if (modulesWorking.length === 0) {
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
      if (init.length > 0) {
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

  // parses options passed as a paramater and returns JSON
  parseParams(options) {
    try {
      return options ? JSON.parse(options) : null;
    } catch(e) {
      throw e;
    }
  }

  // for each reference found in the DOM this attempts to find an accompanying
  // registered module, if one is found it uses that module to initialize.
  // this also passes the data options to the module after parsing them.
  createInstance(moduleName, el) {
    let instanceData,
      instance,
      id;
    let module = this.getModule(moduleName);

    if (!module) {
      // =======================================================
      // ATTN: Remove this once we have a proper logging utility
      // console.warn("Module:", moduleName, "no exists");
      // =======================================================
      return;
    }

    if (!el) {
      return;
    }

    id = guid();

    try {
      // Reading options
      const selector = `[${defaultModuleParamsAttribute}]`;
      const optionsElement = el.querySelector(selector);
      const options = optionsElement ? this.parseParams(optionsElement.textContent) : null;

      // Initialize the module
      instance = new module.fn(id, el, options);

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
      console.error(
        'Error on Module: ' + moduleName,
        '\n Instance Id:' + id,
        '\n Message: ' + e.message,
        (e.fileName) ? '\n File:' + e.fileName + ' (' + e.lineNumber + ',' + e.columnNumber + ')' : null,
        '\n Stack:', (e.stack) ? e.stack : e
      );
    }

    return instanceData;
  }

  // destroy a single instance of a module by ID
  destroyInstance(instanceId) {
    let runningInstances = this.modules.runningInstances;
    if (!runningInstances.hasOwnProperty(instanceId)) {
      return;
    }

    runningInstances[instanceId].instance.dispose();
    delete runningInstances[instanceId];
  }

  // destroy every single instance of every single module
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
