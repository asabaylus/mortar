const initialState = {
  added: 0,
  removed: 0,
  toggled: 0
};

const statistics = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_TODO':
        return Object.assign({}, state, {
          added: state.added + 1
        });
      case 'REMOVE_TODO':
        return Object.assign({}, state, {
          removed: state.removed + 1
        });
      case 'TOGGLE_TODO':
        return Object.assign({}, state, {
          toggled: state.toggled + 1
        });
      default:
        return state;
    }
}

export default statistics;
