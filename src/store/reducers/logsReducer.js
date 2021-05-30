import { createAction, createReducer } from '@reduxjs/toolkit';

export const setItems = createAction('items/SET_ITEMS');
export const setItem = createAction('items/SET_ITEM');

const initialState = {
  items: [],
  item: {},
};

const logsReducer = createReducer(initialState, {
  [setItems]: (state, action) => {
    state.items = action.payload;
    state.itemsCopy = action.payload;
  },
  [setItem]: (state, action) => {
    state.item = action.payload;
  },
});

export { logsReducer };
