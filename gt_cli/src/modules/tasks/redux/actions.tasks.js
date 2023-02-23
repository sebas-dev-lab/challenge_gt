import FetchTasksServices from "../services/fetch.tasks";
import * as actionTypes from "./actionTypes";

export const addItem = (data) => async (dispatch) => {
  try {
    const addItem = await FetchTasksServices.addItem(data);
    if (!addItem.isValid) {
      throw new Error(addItem.data);
    }
    dispatch(getItems());
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

export const getItems = (query) => async (dispatch) => {
  try {
    const items = await FetchTasksServices.getItems(query);
    if (!items.isValid) {
      throw new Error(items.data);
    }
    dispatch({
      type: actionTypes.GET_ITEMS,
      payload: items.data.data,
    });
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

export const deleteItem = (id, query) => async (dispatch) => {
  try {
    const addItem = await FetchTasksServices.deleteItem(id);
    if (!addItem.isValid) {
      throw new Error(addItem.data);
    }
    dispatch(getItems(query));
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

export const editItem = (id, data, query) => async (dispatch) => {
  try {
    const addItem = await FetchTasksServices.editItem(id, data);
    if (!addItem.isValid) {
      throw new Error(addItem.data);
    }
    dispatch(getItems(query));
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

export const setError = (error) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_ERROR,
    payload: error,
  });
};

export const setEdit = () => (dispatch) => {
  dispatch({
    type: actionTypes.SET_EDIT_ITEMS,
  });
};

export const setTitle = (id, title) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TITLE,
    payload: {
      title,
      id,
    },
  });
};

export const setCompleted = (id, completed) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TITLE,
    payload: {
      completed,
      id,
    },
  });
};

export const setPagination = (page, limit) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_PAG,
    payload: {
      page,
      limit,
    },
  });
};

export const setLimit = (limit) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_LIMIT,
    payload: {
      limit,
    },
  });
};
