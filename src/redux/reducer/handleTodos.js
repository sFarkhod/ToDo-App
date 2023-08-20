const todos = [];

export const handleTodos = (state = todos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "CHECKED_ITEM":
      return state.map((check) => {
        if (check.id === action.payload.id) {
          return {
            ...check,
            isDone: action.payload.isDone,
          };
        } else {
          return check;
        }
      });
    case "SAVE_ALL":
      return action.payload;
    case "DELETE_ALL":
      return [];

    // for don't causing mutation we don't use ...(spread operator)
    case "EDIT_TODO":
      return state.map((edit) => {
        if (edit.id === action.payload.id) {
          // let newEdit = Object.assign({}, edit)
          // newEdit.text = action.payload.text
          // return newEdit
          return {
            ...edit,
            text: action.payload.text,
          };
        } else {
          return edit;
        }
      });
    default:
      return state;
  }
};
