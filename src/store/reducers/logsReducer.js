import { createAction, createReducer } from '@reduxjs/toolkit';

export const setLogs = createAction('items/SET_LOGS');
export const setLog = createAction('items/SET_LOG');
export const setLogsLoading = createAction('items/SET_LOGS_LOADING');
export const setItemsLoading = createAction('items/SET_ITEMS_LOADING');
export const removeLog = createAction('items/REMOVE_LOG');
export const setItems = createAction('items/SET_ITEMS');
export const setItem = createAction('items/SET_ITEM');
export const updateItem = createAction('items/UPDATE_ITEM');
export const removeItem = createAction('items/REMOVE_ITEM');
export const markLogAsFavorite = createAction('items/MARK_LOG_AS_FAVORITE');
export const incrementLogItemTally = createAction('items/INCREMENT_LOG_ITEM_TALLY');
export const decrementLogItemTally = createAction('items/DECREMENT_LOG_ITEM_TALLY');

const initialState = {
  logs: [],
  logsLoading: true,
  log: {},
  items: [],
  itemsLoading: true,
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
  [markLogAsFavorite]: (state, action) => {
    state.log.favorite = action.payload;
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
  [updateItem]: (state, action) => {
    state.items = state.items.map((item) => {
      if (item.id === action.payload.itemId) {
        item = { ...item, ...action.payload.updates };
      }
      return item;
    });
  },
  [incrementLogItemTally]: (state, action) => {
    state.item.tally += action.payload.by;
  },
  [decrementLogItemTally]: (state, action) => {
    state.item.tally -= action.payload.by;
  },
  [setLogsLoading]: (state, action) => {
    state.logsLoading = action.payload;
  },
  [setItemsLoading]: (state, action) => {
    state.itemsLoading = action.payload;
  },
});

export { logsReducer };
