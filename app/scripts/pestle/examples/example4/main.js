'use strict';

import {Pestle} from '@natgeo/mortar-pestle';
import MyModule from './MyModule';

Pestle.ModuleManager.register('MyModule', MyModule);

console.log('initializing pestle...');
console.time('init');

Pestle.init(function() {
  console.log('This was delayed: ');
  console.timeEnd('init')
});
