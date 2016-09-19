'use strict'

import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoReducers = combineReducers({
  items: todos,
  visibilityFilter
})

export default todoReducers
