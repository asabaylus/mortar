# Pestle v2.0

Pestle is a lightweight module initializer implemented using javascript (es6).

## Getting Started

A pestle module is composed of 2 parts:
* An HTML markup
* Javascript module

### HTML markup
Add the next markup on the HTML where you want the module to be loaded:
```html
<div
  data-pestle-module="ExampleModule"
  data-pestle-options='{"option1":"value1"}'>
</div>
```
This is the most basic HTML markup for loading a module. `data-pestle-options` attribute is optional.

### Javascript module
Let's define the javascript module:

```javascript
import {Module} from '../../../scripts/pestle/main.js'; // Relative path to the pestle main file.

class ExampleModule extends Module {
  init() {
    const {value} = this.options;
    this.el.innerHTML = 
      `<span>My new module with option value: ${value}</span>`;
  }
}

export default ExampleModule
```

Now we need to register the module we've created so Pestle is aware of this new module. Finally we intialize Pestle.

```javascript
import {Pestle} from '../../../scripts/pestle/main.js'; // Relative path to the pestle main file.

// Registering modules
Pestle.ModuleManager.register('Slider', Slider);

// Initializing Pestle
Pestle.init();
```

## Documentation

### Pestle Object

This is core of pestle. It provides access to Module Manager and Event Manager (currently on development it).

You can expose this object if required.

#### Methods

**init(callback)**: initialize pestle.

*params*:
* callback(instancesFailing, instancesRunning): Optional function. If it's defined, pestle call it when all modules instances have been initialized.

  *params*:
  * instancesFailing: array of instances failing.
  * instancesRunning: array of instances running fine.


### Class Module

It's the base class for creating new modules. It must be treated as an abstract class, so you mustn't create any instance directly from it.

#### Properties

* id: is a *guid* value created automatically when an instance of the module is created.
* isLoaded: indicates if the `init()` method of this instance already finish its execution. Note: *look async*
* el: is the DOM Element where the module definition is.
* options: is the configuration values passed to a specific instance of a module.

Example:

```javascript
import {Module} from 'pestle';
class Module1 extends Module {
  init() {
    // initilization component code goes here.
  }
}

export default Module1;
```

#### Methods

**isLoaded()**: returns true if init execution already finish. *see init()*

**init(done)**: is called by pestle internally when `Pestle.init()` is executed and a module definition in the DOM match the name of the registered module. It must be overrided when `Module` is extended and should contain the necessary code to initilize the component.

After init execution has finished or after done was called, `isLoaded` property is changed to true.

*params*:
* done: Optional. If done is defined, pestle is going to treat the init method like it was an async method, so you should call `done` function when execution has finished.

Example using sync definition:

```javascript
import {Module} from 'pestle';
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
import {Module} from 'pestle';
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

It's on charge of register modules and search on the DOM to create and track each module instance.

It has some useful methods and properties for developing and debugging.

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


## Examples

There're few [examples](examples) in its source doe.

Run `gulp runExamples` to see them working.
