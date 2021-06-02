import { createAction, createReducer } from '@reduxjs/toolkit';

export const setLogs = createAction('items/SET_LOGS');
export const setLog = createAction('items/SET_LOG');
export const removeLog = createAction('items/REMOVE_LOG');
export const setItems = createAction('items/SET_ITEMS');
export const setItem = createAction('items/SET_ITEM');
export const removeItem = createAction('items/REMOVE_ITEM');
export const incrementLogItemTally = createAction('items/INCREMENT_LOG_ITEM_TALLY');
export const decrementLogItemTally = createAction('items/DECREMENT_LOG_ITEM_TALLY');

const initialState = {
  logs: [],
  log: {},
  items: [],
  item: {},
};

const logsReducer = createReducer(initialState, {
  [setLogs]: (state, action) => {
    state.logs = action.payload;
  },
  [setLog]: (state, action) => {
    state.log = action.payload;
  },
  [removeLog]: (state, action) => {
    state.logs = state.logs.filter((log) => log.id !== action.payload);
  },
  [setItems]: (state, action) => {
    state.items = action.payload;
  },
  [setItem]: (state, action) => {
    state.item = action.payload;
  },
  [removeItem]: (state, action) => {
    state.items = state.items.filter((item) => item.id !== action.payload);
  },
  [incrementLogItemTally]: (state, action) => {
    state.item.tally += action.payload;
  },
  [decrementLogItemTally]: (state, action) => {
    state.item.tally -= action.payload;
  },
});

export { logsReducer };
