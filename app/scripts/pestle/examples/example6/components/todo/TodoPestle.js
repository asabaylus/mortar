'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Pestle, Module } from '@natgeo/mortar-pestle';
import TodoForm from './containers/TodoForm';
import { addTodo } from './actions';


export default class Todo extends Module {
  init() {
    const {title, todos} = this.options;

    todos.forEach(todo => Pestle.store.dispatch(addTodo(todo)));

    ReactDOM.render(
      <Provider store={Pestle.store}>
        <TodoForm title={title} />
      </Provider>, this.el);
    console.log('Todo initialized.');
  }
}
