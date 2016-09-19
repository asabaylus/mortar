'use strict';

import {Pestle} from '@natgeo/pestle';
import MyModule from './MyModule';

Pestle.ModuleManager.register('MyModule', MyModule);

Pestle.init();
