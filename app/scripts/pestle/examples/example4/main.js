'use strict';

import {Pestle} from '../../main.js';
import MyModule from './MyModule';

Pestle.ModuleManager.register('MyModule', MyModule);

console.log('initializing pestle...');
console.time('init');

Pestle.init(function() {
  console.log('This was delayed: ');
  console.timeEnd('init')
});
