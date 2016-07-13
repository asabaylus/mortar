import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const Todo = ({title}) => (
  <div>
    <h1>{title}</h1>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default Todo
