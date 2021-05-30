import { createAction, createReducer } from '@reduxjs/toolkit';

export const setUser = createAction('user/SET_USER');

const initialState = {
  user: {},
};

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    state.user = action.payload;
  },
});

export { userReducer };
