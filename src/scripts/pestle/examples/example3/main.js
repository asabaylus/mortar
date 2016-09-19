'use strict';

import {Pestle} from '@natgeo/pestle';
import MyModule from './MyModule';

Pestle.ModuleManager.register('MyModule', MyModule);

Pestle.init(function(failingInstances, workingInstances) {
  if(failingInstances) {
    console.err('Next instances failed when initializing', failingInstances);
  }

  console.log('Next instances are working correctly', workingInstances);

});
