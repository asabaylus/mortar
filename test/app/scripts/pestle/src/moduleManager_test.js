'use strict';

import Module from '../../../../../app/scripts/pestle/src/module'
import ModuleManager from '../../../../../app/scripts/pestle/src/moduleManager'

describe('Module Manager', () => {
  var moduleManager,
      initializeFn1,
      initializeFn2,
      disposeFn1,
      disposeFn2,
      Module1,
      Module2,
      Module3;

  function createModules() {
    initializeFn1 = sinon.spy();
    initializeFn2 = sinon.spy();
    disposeFn1 = sinon.spy();
    disposeFn2 = sinon.spy();

    Module1 = class extends Module {
      init(done) {
        initializeFn1();
        done();
      }
      dispose() {
        super.dispose();
        disposeFn1();
      }
    }

    Module2 = class extends Module {
      init() {
        initializeFn2();
      }
      dispose() {
        super.dispose();
        disposeFn2();
      }
    }

    Module3 = class extends Module {
      init(done) {
        done(new Error('something goes wrong'));
      }
    }
  }

  function registerModules() {
    moduleManager.register("Module1", Module1);
    moduleManager.register("Module2", Module2);
    moduleManager.register("Module3", Module3);
  }


  before('test', () => {
    moduleManager = new ModuleManager();
  });

  it('should be class', () => {
    expect(ModuleManager).to.be.a('function');
  });

  describe('register()', () => {
    before(() => {
      createModules();
    });

    after(() => {
      moduleManager.dispose();
    });

    it('should have a method "register"', () => {
      expect(moduleManager.register).to.be.a('function');
    });

    it('should throw error if module to register is not a Module instance', () => {
      expect(() => moduleManager.register('Module1', Object)).to.throw(Error);
    });

    it('should add the module to the list', () => {
      moduleManager.register("Module1", Module1);
      expect(moduleManager.getModule("Module1")).to.exist;
      expect(moduleManager.getModule("Module1").fn).to.equal(Module1);
    });

    it("should throw error if a module is using same name", () => {
      expect(() => moduleManager.register('Module1', Module1)).to.throw(Error);
    });

    it('should list all registered components', () => {
      moduleManager.register("Module2", Module2);
      var modules = moduleManager.getAllModules();
      expect(modules).to.have.keys('Module1', 'Module2');
    });
  });

  describe('isRegistred()', () => {
    it('should return false if passed object is not registered', () => {
      expect(moduleManager.isRegistered('Module1', Object)).to.false;
    });
  });

  describe('dispose()', () => {
    before(() => {
      createModules();
      registerModules();

      var fixture = `
        <div data-pestle-module="Module1"></div>
        <div data-pestle-module="Module2">
          <script type="text/json" data-pestle-options>
            {"prop": "value"}
          </script>
        </div>
      `;

      insertFixture(fixture);

      moduleManager.init();
      moduleManager.dispose();
    });

    after(() => {
      moduleManager.dispose();
      removeFixture();
    });

    it('should clean the internal variables', () => {
      expect(moduleManager.modules).to.deep.equal({
        registered: {},
        runningInstances: {}
      });
    });

    it('should dispose all instances', () => {
      expect(disposeFn1.called).to.be.true;
      expect(disposeFn2.called).to.be.true;
    });
  });

  describe('createInstance()', () => {
    before(() => {

      createModules();
      registerModules();

      var fixture = `
        <div data-pestle-module="Module1"></div>
        <div data-pestle-module="Module2">
          <script type="text/json" data-pestle-options>
            {"prop value"}
          </script>
        </div>
      `;

      insertFixture(fixture);
    });

    after(() => {
      moduleManager.dispose();
      removeFixture();
    });

    it('should return a data object with properties error and instance', () => {
      var selector = "[data-pestle-module=Module1]";
      var dataInstance = moduleManager.createInstance("Module1", document.querySelector(selector));
      expect(dataInstance).to.have.a.property("error");
      expect(dataInstance).to.have.a.property("instance");
    });

    it('should have a instance of module specified', () => {
      var selector = "[data-pestle-module=Module1]";
      var dataInstance = moduleManager.createInstance("Module1", document.querySelector(selector));
      expect(dataInstance.instance).to.be.an.instanceof(Module1);
    });

    it('should initialize a module with no options', () => {
      var selector = "[data-pestle-module=Module1]";
      var dataInstance = moduleManager.createInstance("Module1", document.querySelector(selector));
      expect(dataInstance.instance.options).to.be.null;
    });

    it('should save the error when module throw an error (ex: invalid json)', () => {
      var selector = "[data-pestle-module=Module2]";
      var instance = moduleManager.createInstance("Module2", document.querySelector(selector));
      expect(instance.error).to.not.be.null;
    });
  });

  describe('init()', () => {
    var callbackFn = sinon.spy();
    before(() => {

      createModules();
      registerModules();

      var fixture = `
        <div data-pestle-module="Module1"></div>
        <div data-pestle-module="Module2">
          <script type="text/json" data-pestle-options>
            {"prop": "value"}
          </script>
        </div>
      `;

      insertFixture(fixture);

      moduleManager.init(callbackFn);
    });

    after(() => {
      moduleManager.dispose();
      removeFixture();
    });

    it('should have a list of each module loaded', () => {
      expect(moduleManager.getInstancesCount()).to.equal(2);
    });

    it('should call callback function', () => {
      expect(callbackFn.called).to.be.true;
    });

    it('should call callback function with 2 parameters', () => {
      expect(callbackFn.args[0].length).to.equal(2);
    });

    it('should have a list of instances', () => {
      callbackFn.args[0].reduce((previousValue, current) => {
        previousValue = previousValue || [];
        return previousValue.concat(current);
      }).forEach((instanceData) => {
        expect(instanceData.instance).to.be.exist;
      });
    });
  });

  describe('init() module errors', () => {
    var callbackFn = sinon.spy();
    before(() => {

      createModules();
      registerModules();

      var fixture = `
        <div data-pestle-module="Module3"></div>
        <div data-pestle-module="Module2">
          <script type="text/json" data-pestle-options>
            {"prop": "value"}
          </script>
        </div>
      `;

      insertFixture(fixture);

      moduleManager.init(callbackFn);
    });

    after(() => {
      moduleManager.dispose();
      removeFixture();
    });

    it('should have a list of each module with errors', (done) => {
      moduleManager.init((err, instances) => {
        expect(err).to.have.length.of.at.least(1);
        done();
      });
    });
  });
});
