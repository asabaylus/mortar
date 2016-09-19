'use strict'

import { createSelector } from 'reselect';

export const getTodos = (state) => state.todo.items;
export const getVisibilityFilter = (state) => state.todo.visibilityFilter;

export const getVisibleTodos = createSelector(
  [getTodos, getVisibilityFilter],
  (todos, filter) => {
    switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.done);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.done);
    }
  }
);
