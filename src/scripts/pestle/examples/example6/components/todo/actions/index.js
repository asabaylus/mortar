'use strict'

let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
}

export const removeTodo = (index) => {
  return {
    type: 'REMOVE_TODO',
    index
  };
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
}