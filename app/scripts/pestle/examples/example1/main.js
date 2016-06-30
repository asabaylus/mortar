'use strict';

import {Pestle} from '@natgeo/mortar-pestle';
import MyModule from './MyModule';

Pestle.ModuleManager.register('MyModule', MyModule);

Pestle.init();
