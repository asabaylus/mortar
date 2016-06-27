/*
 *  The ModuleManager registers each initialized instance of
 *  of a module, keeping a master list. It is also responsible
 *  for creating and destroying instances of the registered modules.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _guid = require('./util/guid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultModuleNameAttribute = 'data-pestle-module';
var defaultModuleParamsAttribute = 'data-pestle-options';

var ModuleManager = function () {

  // called when a new Pestle instance of a module
  // var pestle = new Pestle();

  function ModuleManager() {
    _classCallCheck(this, ModuleManager);

    this.modules = {
      registered: {},
      runningInstances: {}
    };
  }

  // registers a new module making sure that a new registered module inherits
  // from the module class and that it does not already exist. if it satisfies
  // those conditions it is registered


  _createClass(ModuleManager, [{
    key: 'register',
    value: function register(name, module) {
      if (!(module.prototype instanceof _module2.default)) {
        throw new Error('[Module.register] module should inherit from Module');
      }

      if (this.isRegistered(name)) {
        throw new Error('[Module.register] there\'s already a module called \'' + name + '\'');
      }

      this.modules.registered[name] = {
        name: name,
        fn: module
      };
    }

    // checks whether a module is registered

  }, {
    key: 'isRegistered',
    value: function isRegistered(name) {
      return this.modules.registered.hasOwnProperty(name);
    }

    // returns the module objects that are registered and running

  }, {
    key: 'getAll',
    value: function getAll() {
      return this.modules;
    }

    // returns only registered modules

  }, {
    key: 'getAllModules',
    value: function getAllModules() {
      return this.modules.registered;
    }

    // get a specific module by name

  }, {
    key: 'getModule',
    value: function getModule(name) {
      return this.modules.registered[name];
    }

    // returns only running modules

  }, {
    key: 'getAllInstances',
    value: function getAllInstances() {
      return this.modules.runningInstances;
    }
  }, {
    key: 'getInstancesByName',
    value: function getInstancesByName(name) {
      var instanceArray = this.getAllInstances();
      return Object.keys(instanceArray).map(function (instanceId) {
        return instanceArray[instanceId];
      }).filter(function (instance) {
        return instance.name === name;
      });
    }

    // returns number of registered modules

  }, {
    key: 'getModulesCount',
    value: function getModulesCount() {
      return Object.keys(this.getAllModules()).length;
    }

    // returns number of running instances of all modules

  }, {
    key: 'getInstancesCount',
    value: function getInstancesCount() {
      return Object.keys(this.getAllInstances()).length;
    }

    // returns a single instance of a module by ID

  }, {
    key: 'getInstance',
    value: function getInstance(instanceId) {
      return this.modules.runningInstances[instanceId];
    }

    // 1. Reads the entire DOM
    // 2. finds instances of references to modules
    // 3. creates an instance of each module in the order it is found
    // 4. marks instances as 'running' after they have initialized

  }, {
    key: 'init',
    value: function init(callback) {
      var self = this;
      var totalModules = void 0,
          runningInstances = void 0,
          countModules = void 0;

      var selector = '[' + defaultModuleNameAttribute + ']';
      var modules = document.querySelectorAll(selector);

      // Initialize every module
      for (var i = 0, element; element = modules[i]; i++) {
        var moduleName = element.getAttribute(defaultModuleNameAttribute);
        var dataInstance = this.createInstance(moduleName, element);

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
        var instanceData = this;
        var modulesWorking = void 0,
            modulesFailing = void 0;

        if (err) {
          instanceData.error = err;
          console.error('Error on Module:', instanceData.name, '\n Instance Id:', instanceData.id, '\n', instanceData.error.stack ? instanceData.error.stack : instanceData.error);
        } else {
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
        Object.keys(runningInstances).forEach(function (instanceId) {
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
      Object.keys(runningInstances).forEach(function (instanceId) {
        var instanceData = runningInstances[instanceId],
            init = instanceData.instance.init,
            instance = instanceData.instance;

        // If init() has params use async call
        if (init.length > 0) {
          init(done.bind(instanceData));
        } else {
          // else sync call
          try {
            init();
            done.call(instanceData);
          } catch (e) {
            done.call(instanceData, e);
          }
        }
      });
    }

    // parses options passed as a paramater and returns JSON

  }, {
    key: 'parseParams',
    value: function parseParams(options) {
      try {
        return options ? JSON.parse(options) : null;
      } catch (e) {
        throw e;
      }
    }

    // for each reference found in the DOM this attempts to find an accompanying
    // registered module, if one is found it uses that module to initialize.
    // this also passes the data options to the module after parsing them.

  }, {
    key: 'createInstance',
    value: function createInstance(moduleName, el) {
      var optionsAttribute = void 0,
          options = void 0,
          instanceData = void 0,
          instance = void 0,
          id = void 0;
      var module = this.getModule(moduleName);

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

      id = (0, _guid.guid)();

      try {
        // Reading options
        optionsAttribute = el.getAttribute(defaultModuleParamsAttribute);
        options = this.parseParams(optionsAttribute);

        // Initialize the module
        instance = new module.fn(id, el, options);

        instanceData = {
          id: id,
          name: moduleName,
          error: null,
          instance: instance
        };
      } catch (e) {
        instanceData = {
          id: id,
          name: moduleName,
          error: e,
          instance: instance
        };
        console.error('Error on Module:', moduleName, '\n Instance Id:', id, '\n', e.stack ? e.stack : e);
      }

      return instanceData;
    }

    // destroy a single instance of a module by ID

  }, {
    key: 'destroyInstance',
    value: function destroyInstance(instanceId) {
      var runningInstances = this.modules.runningInstances;
      if (!runningInstances.hasOwnProperty(instanceId)) {
        return;
      }

      runningInstances[instanceId].instance.dispose();
      delete runningInstances[instanceId];
    }

    // destroy every single instance of every single module

  }, {
    key: 'dispose',
    value: function dispose() {
      var runningInstances = this.modules.runningInstances;
      Object.keys(runningInstances).forEach(function (instanceId) {
        if (runningInstances[instanceId].instance) {
          runningInstances[instanceId].instance.dispose();
        }
      });
      this.modules = {
        registered: {},
        runningInstances: {}
      };
    }
  }]);

  return ModuleManager;
}();

exports.default = ModuleManager;