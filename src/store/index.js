import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { logsReducer, userReducer } from './reducers';

export default configureStore({
  reducer: combineReducers({
    logsReducer,
    userReducer,
  }),
});
