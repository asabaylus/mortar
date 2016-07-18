import React, { PropTypes } from 'react'

const TodoItem = ({ onClick, onRemove, done, text }) => (
  <li
    style={{
      textDecoration: done ? 'line-through' : 'none'
    }}
  >
    <span onClick={onClick}>{text}</span>
    <button type="button" onClick={onRemove}>[x]</button>
  </li>
)

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default TodoItem
