import { createAction, createReducer } from '@reduxjs/toolkit';

export const setItems = createAction('items/SET_ITEMS');
export const setItem = createAction('items/SET_ITEM');
export const incrementLogItemTally = createAction('items/INCREMENT_LOG_ITEM_TALLY');
export const decrementLogItemTally = createAction('items/DECREMENT_LOG_ITEM_TALLY');

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
  [incrementLogItemTally]: (state, action) => {
    state.item.tally += action.payload;
  },
  [decrementLogItemTally]: (state, action) => {
    state.item.tally -= action.payload;
  },
});

export { logsReducer };
