import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slice';
import { createAPI } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

