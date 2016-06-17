import {Pestle} from '../../main.js';
import MyModule from './MyModule';

Pestle.ModuleManager.register('MyModule', MyModule);

Pestle.init();
