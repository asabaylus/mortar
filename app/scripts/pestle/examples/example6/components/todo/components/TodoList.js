'use strict'

import React, { PropTypes } from 'react'
import TodoItem from './TodoItem'

const TodoList = (props) => {
  const { todos, onTodoClick, onTodoRemove } = props;
  return (
  <ul>
    {todos.map((todo, index) =>
      <TodoItem
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        onRemove={() => onTodoRemove(index)}
      />
    )}
  </ul>
)
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
