import * as actionTypes from "./actionTypes";

const initialState = {
  items: [],
  title: "",
  completed: false,
  id: "",
  edit: false,
  error: "",
};

const taskReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_EDIT_ITEMS:
      return {
        ...state,
        edit: !state.edit,
      };
    case actionTypes.SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
        id: action.payload.id,
      };
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        items: action.payload.sort(function (a, b) {
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        }),
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default taskReducers;
