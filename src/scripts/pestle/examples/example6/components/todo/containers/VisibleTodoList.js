'use strict'

import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from '../actions';
import TodoList from '../components/TodoList';
import { getVisibleTodos } from '../selectors';

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },
    onTodoRemove: (index) => {
      dispatch(removeTodo(index))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList;
