# Pestle v2.0

Pestle is a lightweight module initializer implemented using javascript (es6).

## Getting Started

A pestle module is composed of 2 parts:
* HTML markup
* A Javascript module

### HTML markup
Add the following markup to your template or HTML file where you want the module to be loaded. This is the most basic markup for loading a module (the `data-pestle-options` attribute is optional):
```html
<div data-pestle-module="ExampleModule">
  <script type="text/json" data-pestle-options>
  {"option1":"value1"}
  </script>
</div>
```

### Javascript module
Let's define the javascript module:

```javascript
import {Module} from '@natgeo/pestle';

class ExampleModule extends Module {
  init() {
    const {value} = this.options;
    this.el.innerHTML = 
      `<span>My new module with option value: ${value}</span>`;
  }
}

export default ExampleModule
```

Now we need to register the module we've created so Pestle is aware of it. Lastly we intialize Pestle.

```javascript
import {Pestle} from '@natgeo/pestle';

// Registering modules
Pestle.ModuleManager.register('Slider', Slider);

// Initializing Pestle
Pestle.init();
```

## Documentation

### Pestle Object

This is the core of Pestle and can be exposed if required. It provides access to the Module Manager and Pub Sub.

#### Methods

**init(callback)**: initialize pestle.

*params*:
* callback(instancesFailing, instancesRunning): Optional function. If it is defined, pestle will call it when all module instances have been initialized.

  *params*:
  * instancesFailing: array of instances failing.
  * instancesRunning: array of instances currently running.


### Class Module

This is the base class for creating new modules. It must be treated as an abstract class, no instance should be created directly from it.

#### Properties

* id: a *guid* value created automatically when an instance of the module is created.
* isLoaded: indicates if the `init()` method of this instance is already executed. Note: *look at async*
* el: the DOM Element where the module definition is.
* options: the configuration values passed to a specific instance of a module.

Example:

```javascript
import {Module} from '@natgeo/pestle';
class Module1 extends Module {
  init() {
    // initilization component code goes here.
  }
}

export default Module1;
```

#### Methods

**isLoaded()**: returns true if init execution is finished. *see init()*

**init(done)**: is called by pestle internally when `Pestle.init()` is executed and a module definition in the DOM matches the name of the registered module. It must be overriden when `Module` is extended and should contain the necessary code to initilize the component.

After init has executed or after done has been called the `isLoaded` property is changed to true.

*params*:
* done: Optional. If done is defined, pestle is going to treat the init method like it was an async method, the `done` method should be called when init has been successfully executed.

Example using sync definition:

```javascript
import {Module} from '@natgeo/pestle';
class Module1 extends Module {
  // overriding init() method
  init() {
    // sync code here
    const data = getData();
    $(this.el).html(data);
  }
}

export default Module1;
```

Example using async definition:
```javascript
import {Module} from '@natgeo/pestle';
class Module1 extends Module {
  // overriding init() method
  init(done) {
    getData(data => {
      $(this.el).html(data);

      // call done when async code has finished
      done();
    });
  }
}

export default Module1;
```


### Class Module Manager

The Modeule Manager class is in charge of registering modules and searching the DOM to create and track each module instance. It has some useful methods and properties for developing and debugging.

#### Methods

**register(name, class)**: register the specified component.

*params*:
* name: Component name
* class: Module class definition

*returns*: void

**getAllModules()**: get all registered modules

*returns*: object. Example:
```javascript
{
  Module1: {
    name: 'Module1',
    fn: function() { ... }
  },
  ...
}
```

**isRegistered(name)**: returns true if the passed module name is already registered.

*params*:
* name: Component name

*returns*: boolean

**getModule(name)**: returns the module registered for the passed module name.

*params*:
* name: Component name

*returns*: object. Example:
```javascript
{
  name: 'Module1',
  fn: function() { ... }
}
```

**getModulesCount()**: returns the count of registered modules.

*returns*: number.

**getAllInstances()**: returns all running instances.

*returns*: object. Example:
```javascript
{
  00000000-0000-0000-0000-000000000000: {
    id: '00000000-0000-0000-0000-000000000000', // uniqueid for this instance
    name: 'Module1', // module name
    error: null, // execution error if occurs
    instance: // Module1 instance object
  },
  ...
}
```

**getInstancesByName(name)**: returns the instances list for the passed module name.

*params*:
* name: Component name

*returns*: object. Example:
```javascript
{
  id: '00000000-0000-0000-0000-000000000000', // uniqueid for this instance
  name: 'Module1', // module name
  error: null, // execution error if occurs
  instance: // Module1 instance object
}
```

**getInstancesCount()**: returns the count of running instances.

*returns*: number.

### PubSub

Pestle wraps a PubSub library called [PubSubJS](https://github.com/mroderick/PubSubJS). To start using it, you just need to import it from Pestle.

Example:

```javascript
import {PubSub} from '@natgeo/pestle';

const mySubscriber => (msg, data) {
    console.log(msg, data);
};

PubSub.suscribe('MY TOPIC', mySubscriber);
```


## Examples

There are a  few [examples](examples) in its source codee.

Run `gulp runExamples` to see them working.
