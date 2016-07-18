'use strict'

import { connect } from 'react-redux';
import Todo from '../components/Todo';

const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title
  };
}

const TodoForm = connect(mapStateToProps)(Todo);

export default TodoForm;
