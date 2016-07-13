// Todo Item
const todo = (state, action) => {
    switch(action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          done: false
        };
      case 'TOGGLE_TODO':
        if(state.id !== action.id) {
          return state;
        }

        return Object.assign({}, state, {
          done: !state.done
        });
      default:
        return state;
    }
}

// Array of Todo elements
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(null, action)
      ];
    case 'REMOVE_TODO':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

export default todos;
