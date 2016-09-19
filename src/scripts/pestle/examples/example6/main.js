'use strict';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import {Pestle} from '@natgeo/pestle';
import Todo from './components/todo/TodoPestle';
import TodoStatistics from './components/todoStatistics/TodoStatisticsPestle';

import todoReducers from './components/todo/reducers';
import statisticsReducers from './components/todoStatistics/reducers';

const reducers = combineReducers({
  todo: todoReducers,
  statistics: statisticsReducers
});

Pestle.store = createStore(reducers);

window.Pestle = Pestle;

Pestle.ModuleManager.register('Todo', Todo);
Pestle.ModuleManager.register('TodoStatistics', TodoStatistics);

Pestle.init();
