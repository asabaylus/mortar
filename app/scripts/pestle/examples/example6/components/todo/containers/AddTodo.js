import { connect } from 'react-redux';
import { addTodo } from '../actions';
import AddTodoForm from '../components/AddTodoForm';

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (todo) => {
      dispatch(addTodo(todo));
    }
  }
}

const AddTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoForm)

export default AddTodo
